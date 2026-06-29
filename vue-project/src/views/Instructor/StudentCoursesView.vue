<script setup>
const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
  name:{
    type:String,
    required:true
  }
});

import StudentCoursesCard from '@/componenets/UI/studentCoursesCard.vue';
import { useStudentCourses } from '@/stores/studentCoursesStore';
import { onMounted} from 'vue';
const store = useStudentCourses();
// watch(()=> store.courses , (val)=> console.log('courses : ',val));
onMounted(() => store.fetchCourses(props.id))
</script>
<template>
    <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
            <h1 class="mb-0">Enrolled Courses</h1>
            <p class="text-muted mb-0">{{ store.courses.length }} course(s)</p>
        </div>
        <RouterLink :to="{ name: 'students' }" class="btn btn-outline-secondary">
            <i class="bi bi-arrow-left me-1"></i>Back
        </RouterLink>
    </div>

    <div class="text-center py-5" v-if="store.loading">
        <div class="spinner-border text-primary"></div>
    </div>

    <div class="alert alert-danger" v-else-if="store.error">{{ store.error }}</div>

    <div class="text-center py-5" v-else-if="store.courses.length === 0">
        <i class="bi bi-journal-x fs-1 text-muted"></i>
        <p class="text-muted mt-3">No courses enrolled yet.</p>
    </div>

    <template v-else>
        <h3 class="m-4">{{ props.name }}'s Courses</h3>
        <hr>
        <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" v-for="course in store.courses" :key="course.id">
                <StudentCoursesCard :course="course" :studentId="props.id" />
            </div>
        </div>
    </template>
</template>
<style></style>
