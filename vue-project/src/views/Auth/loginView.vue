<script setup>
import { ref } from 'vue'
import { authStore } from '@/stores/authStore'



const email = ref('')
const password = ref('')
const errors = ref([])
const loading = ref(false)
const useAuthStore = authStore();


async function login() {
  if (loading.value) return
  errors.value = []
  loading.value = true

  try {

    await useAuthStore.login({
      email: email.value,
      password: password.value,
    })


  } catch (error) {
    console.log(error);



  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-body-secondary">
    <div class="card shadow-sm border p-4" style="width: 100%; max-width: 400px; border-radius: 12px;">

      <div class="mb-3 d-flex align-items-center justify-content-center rounded-3 bg-primary"
        style="width: 40px; height: 40px;">
        <i class="bi bi-lock-fill text-white"></i>
      </div>

      <h5 class="fw-medium mb-1">Welcome back</h5>
      <p class="text-secondary small mb-4">Sign in to your account to continue.</p>

      <!-- Errors -->
      <div v-if="errors.length" class="alert alert-danger py-2 mb-3">
        <p v-for="err in errors" :key="err" class="mb-0 small">{{ err }}</p>
      </div>


      <div class="mb-3">
        <label class="form-label small fw-medium">Email</label>
        <input v-model="email" type="email" class="form-control" placeholder="you@example.com" />
      </div>

      <div class="mb-2">
        <label class="form-label small fw-medium">Password</label>
        <input v-model="password" type="password" class="form-control" placeholder="••••••••" @keydown.enter="login" />
      </div>

      <div class="text-end mb-4">
        <a href="#" class="small text-primary text-decoration-none">Forgot password?</a>
      </div>

      <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" :disabled="loading"
        @click="login">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
        <span>{{ loading ? 'Signing in…' : 'Sign in' }}</span>
      </button>

      <hr class="my-3" />
      <p class="text-center small text-secondary mb-0">
        Don't have an account? <RouterLink to="/register" class="text-primary text-decoration-none">Create one
        </RouterLink>
      </p>

    </div>
  </div>
</template>
