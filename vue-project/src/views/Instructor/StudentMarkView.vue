<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStudentCourses } from '@/stores/studentCoursesStore';
import apiClient from '@/Api/httpClient';

const props = defineProps({
    student: { type: String, required: true },
    course:  { type: String, required: true },
});

const router = useRouter();
const store  = useStudentCourses();
const baseMark = ref(0);
const success  = ref(false);

onMounted(async () => {
    await store.getStudentMark(props.student, props.course);
    baseMark.value = store.student?.course?.pivot?.baseMark ?? 0;
});

async function save() {
    try {
        await apiClient.put(`/instructor/students/${props.student}/courses/${props.course}`, {
            baseMark: baseMark.value,
        });
        success.value = true;
        setTimeout(() => router.push({ name: 'students' }), 1000);
    } catch (e) {
        store.error = e.response?.data?.message ?? 'Failed to save mark.';
    }
}
</script>

<template>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="mb-0">Mark Student</h1>
            <p class="text-muted mb-0" v-if="store.student">
                {{ store.student.user?.first_name }} {{ store.student.user?.last_name }}
            </p>
        </div>
        <RouterLink :to="{ name: 'students' }" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </RouterLink>
    </div>

    <div class="text-center py-5" v-if="store.loading">
        <div class="spinner-border text-primary"></div>
    </div>

    <div class="card shadow-sm mb-5" v-else>
        <div class="card-body p-4">
            <div class="alert alert-success" v-if="success">
                <i class="bi bi-check-circle me-1"></i> Mark saved!
            </div>
            <div class="alert alert-danger" v-if="store.error">{{ store.error }}</div>

            <div class="mb-4">
                <label class="form-label">
                    Course: {{ store.student?.course?.title }}
                </label>
                <div class="mb-2 text-muted">
                    Current Mark: <strong>{{ store.student?.course?.pivot?.baseMark }}</strong>
                    / {{ store.student?.course?.mark }}
                </div>
                <input type="number" step="0.01" v-model="baseMark"
                    :min="0" :max="store.student?.course?.mark"
                    class="form-control" />
            </div>

            <div class="d-flex gap-2">
                <button class="btn btn-primary" @click="save" :disabled="store.loading">
                    <i class="bi bi-save me-1"></i>Save Mark
                </button>
                <RouterLink :to="{ name: 'students' }" class="btn btn-outline-secondary">
                    Cancel
                </RouterLink>
            </div>
        </div>
    </div>
</template>
