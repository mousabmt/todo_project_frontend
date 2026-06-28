<script setup>
import { authStore } from '@/stores/authStore';

const user = authStore().user;
</script>

<template>
        <h1>Welcome {{ user.first_name }}</h1>
        <p>This is your student home page.</p>
        <p>Hobbies: {{ user.hobbies?.join(', ') }}</p>

        <div class="d-flex gap-2">
            <RouterLink to="/student/courses" class="btn btn-outline-primary">
                Your Courses
            </RouterLink>
            <RouterLink to="/student/instructors" class="btn btn-outline-primary">
                Your Instructors
            </RouterLink>
        </div>
</template>
