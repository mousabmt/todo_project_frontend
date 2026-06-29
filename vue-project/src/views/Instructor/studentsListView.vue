<script setup>
import { useInstructorStudentsStore } from '@/stores/instructorStudentsStore';
import StudentCard from '@/componenets/UI/studentCard.vue';
import { onMounted } from 'vue';

const store = useInstructorStudentsStore();
onMounted(() => store.fetchStudents());
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="mb-0">My Students</h1>
      <p class="text-muted mb-0">{{ store.students.length }} student(s) enrolled</p>
    </div>
    <RouterLink to="/instructor/dashboard" class="btn btn-outline-secondary">
      <i class="bi bi-arrow-left me-1"></i>Back
    </RouterLink>
  </div>

  <div class="text-center py-5" v-if="store.loading">
    <div class="spinner-border text-primary"></div>
  </div>

  <div class="alert alert-danger" v-else-if="store.error">{{ store.error }}</div>

  <div class="text-center py-5" v-else-if="store.students.length === 0">
    <i class="bi bi-people fs-1 text-muted"></i>
    <p class="text-muted mt-3">No students enrolled yet.</p>
  </div>

  <div class="row row-cols-1 row-cols-md-3 g-4" v-else>
    <div class="col" v-for="student in store.students" :key="student.id">
      <StudentCard :student="student" />
    </div>
  </div>
</template>
