<script setup>
import { authStore } from '@/stores/authStore';

const user = authStore().user;
</script>

<template>
        <h1>Welcome {{ user.first_name }}</h1>
        <p>This is your instructor home page.</p>
        <p>Hobbies: {{ user.hobbies?.join(', ') }}</p>

        <div class="d-flex gap-2">
            <RouterLink to="/instructor/courses" class="btn btn-outline-primary">
                Your Courses
            </RouterLink>
            <RouterLink to="/students" class="btn btn-outline-primary">
                Your Students
            </RouterLink>
        </div>
</template>
