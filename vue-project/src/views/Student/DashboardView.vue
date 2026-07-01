<script setup>
import { authStore } from '@/stores/authStore';
import { useStudentInstructors } from '@/composables/useStudentInstructors';

const user = authStore().user;
const { data, isLoading, error } = useStudentInstructors();

</script>

<template>
  <h1>Welcome {{ user.first_name }}</h1>
  <p>This is your student home page.</p>
  <p>Hobbies: {{ user.hobbies?.join(', ') }}</p>

  <div class="d-flex gap-2 mb-4">
    <RouterLink to="/student/courses" class="btn btn-outline-primary">
      Your Courses
    </RouterLink>
    <RouterLink to="/student/instructors" class="btn btn-outline-primary">
      Your Instructors
    </RouterLink>
  </div>

  <div v-if="isLoading" class="text-center py-5">
    <div class="spinner-border text-primary"></div>
  </div>

  <div v-else-if="error" class="alert alert-danger">{{ error.message }}</div>

  <div v-for="instructor in data?.instructors ?? []" :key="instructor.id">
    <div class="d-flex align-items-center gap-2 mb-2">
      <a href="/" class="btn btn-outline-primary">
        {{ instructor.user.first_name }} {{ instructor.user.last_name }}
      </a>
      <RouterLink :to="{ name: 'studentInstructorChats', params: { instructor: instructor.id } }"
        class="btn btn-outline-success"
        :aria-label="`Open chat with ${instructor.user.first_name} ${instructor.user.last_name}`">
        <i class="bi bi-chat-dots"></i>
      </RouterLink>>
    </div>
  </div>
</template>
