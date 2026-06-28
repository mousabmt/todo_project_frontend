<script setup>
import { authStore } from '@/stores/authStore';

const auth = authStore();
const user = auth.user;


</script>

<template>
    <div class="min-vh-100 bg-body-secondary">
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand fw-bold" :href="`/${user.role}/dashboard`">
                    <i class="bi bi-mortarboard-fill me-2"></i>
                    Educational Platform
                </a>
                <div class="d-flex align-items-center gap-3">
                    <span class="text-white">
                        <i class="bi bi-person-circle me-1"></i>
                        {{ user.first_name }}
                        <span class="badge bg-light text-primary ms-1">{{ user.role }}</span>
                    </span>
                    <button class="btn btn-outline-light btn-sm" @click="auth.logout">
                        <i class="bi bi-box-arrow-right me-1"></i>
                        Logout
                    </button>
                </div>
            </div>
        </nav>

        <main class="container my-4">
            <slot />
        </main>
    </div>
</template>
