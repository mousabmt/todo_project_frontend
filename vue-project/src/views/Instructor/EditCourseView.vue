<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useInstructorCoursesStore } from '@/stores/InstructorCoursesStore';

const props = defineProps({
    id: { type: String, required: true }
});

const router = useRouter();
const store  = useInstructorCoursesStore();
const errors = ref({});
const success = ref(false);

const form = ref({
    title:       '',
    description: '',
    mark:        '',
    image:       null,
});

onMounted(async () => {
    await store.fetchOne(props.id);
    form.value.title       = store.current.title;
    form.value.description = store.current.description;
    form.value.mark        = store.current.mark;
});

function handleImage(e) {
    form.value.image = e.target.files[0];
}

async function save() {
    errors.value  = {};
    success.value = false;

    const formData = new FormData();
    formData.append('title',       form.value.title);
    formData.append('description', form.value.description);
    formData.append('mark',        form.value.mark);
    formData.append('_method',     'PUT');
    if (form.value.image) {
        formData.append('image', form.value.image);
    }

    try {
        await store.updateCourse(props.id, formData);
        success.value = true;
        setTimeout(() => router.push({ name: 'instructorCourses' }), 1000);
    } catch (e) {
        errors.value = e.response?.data?.errors ?? {};
    }
}
</script>

<template>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <h1 class="mb-0">Edit Course</h1>
        <RouterLink :to="{ name: 'instructorCourses' }" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Cancel
        </RouterLink>
    </div>

    <div class="text-center py-5" v-if="store.loading">
        <div class="spinner-border text-primary"></div>
    </div>

    <template v-else>
        <div class="alert alert-success" v-if="success">
            <i class="bi bi-check-circle me-1"></i> Course updated successfully!
        </div>

        <div class="card shadow-sm mb-5">
            <div class="card-body p-4">
                <div class="row mb-3">
                    <div class="col-md-6">
                        <label class="form-label">Course Name</label>
                        <input type="text" v-model="form.title" class="form-control"
                            :class="{ 'is-invalid': errors.title }" />
                        <div class="invalid-feedback" v-if="errors.title">{{ errors.title[0] }}</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label">Base Mark</label>
                        <input type="number" step="0.01" v-model="form.mark" class="form-control"
                            :class="{ 'is-invalid': errors.mark }" />
                        <div class="invalid-feedback" v-if="errors.mark">{{ errors.mark[0] }}</div>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea v-model="form.description" rows="3" class="form-control"
                        :class="{ 'is-invalid': errors.description }"></textarea>
                    <div class="invalid-feedback" v-if="errors.description">{{ errors.description[0] }}</div>
                </div>

                <div class="mb-4">
                    <label class="form-label">Course Image</label>
                    <div class="mb-2" v-if="store.current?.image">
                        <img :src="`http://localhost:8000/storage/${store.current.image}`"
                            alt="Current Image" width="120" class="rounded">
                    </div>
                    <input type="file" class="form-control" accept="image/*"
                        :class="{ 'is-invalid': errors.image }" @change="handleImage" />
                    <small class="text-muted">Leave empty to keep the current image.</small>
                    <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
                </div>

                <div class="d-flex gap-2">
                    <button class="btn btn-primary" @click="save" :disabled="store.loading">
                        <span v-if="store.loading" class="spinner-border spinner-border-sm me-1"></span>
                        <i class="bi bi-save me-1" v-else></i>
                        Save Changes
                    </button>
                    <RouterLink :to="{ name: 'instructorCourses' }" class="btn btn-outline-secondary">
                        Cancel
                    </RouterLink>
                </div>
            </div>
        </div>
    </template>
</template>
