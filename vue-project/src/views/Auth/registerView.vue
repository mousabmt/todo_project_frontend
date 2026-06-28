<script>
export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
      },
      errors: {},
      loading: false,
      registered: false,
    }
  },
  computed: {
    passwordScore() {
      const p = this.form.password
      if (p.length < 8) return 0
      let s = 1
      if (p.length >= 12) s++
      if (/[A-Z]/.test(p)) s++
      if (/[0-9]/.test(p)) s++
      if (/[^A-Za-z0-9]/.test(p)) s++
      return Math.min(s, 4)
    },
    strengthLabel() {
      return ['Too short', 'Weak', 'Fair', 'Good', 'Strong'][this.passwordScore]
    },
    strengthColor() {
      return ['danger', 'danger', 'warning', 'primary', 'success'][this.passwordScore]
    },
    strengthWidth() {
      return [20, 35, 60, 80, 100][this.passwordScore] + '%'
    },
  },
  methods: {
    validate() {
      const e = {}
      if (!this.form.firstName.trim()) e.firstName = 'First name is required.'
      if (!this.form.lastName.trim()) e.lastName = 'Last name is required.'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email)) e.email = 'Enter a valid email address.'
      if (this.form.password.length < 8) e.password = 'Password must be at least 8 characters.'
      if (this.form.password !== this.form.confirm) e.confirm = "Passwords don't match."
      this.errors = e
      return Object.keys(e).length === 0
    },
    async register() {
      if (!this.validate() || this.loading) return
      this.loading = true
      // Replace with your actual API call
      await new Promise(r => setTimeout(r, 1200))
      this.loading = false
      this.registered = true
    },
  },
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center min-vh-100 bg-body-secondary">
    <div class="card border p-4 shadow-sm" style="width: 100%; max-width: 420px; border-radius: 12px;">

      <div class="mb-3 d-flex align-items-center justify-content-center rounded-3 bg-primary"
        style="width: 40px; height: 40px;">
        <i class="bi bi-person-plus-fill text-white"></i>
      </div>

      <h5 class="fw-medium mb-1">Create an account</h5>
      <p class="text-secondary small mb-4">Fill in the details below to get started.</p>

      <div v-if="registered" class="alert alert-success d-flex align-items-center gap-2 py-2 mb-3">
        <i class="bi bi-check-circle-fill"></i>
        <span>Account created! Redirecting you…</span>
      </div>

      <div class="row g-3 mb-1">
        <div class="col-6">
          <label class="form-label small fw-medium">First name</label>
          <input v-model="form.firstName" type="text" :class="['form-control', errors.firstName && 'is-invalid']"
            placeholder="Jane" />
          <div class="invalid-feedback">{{ errors.firstName }}</div>
        </div>
        <div class="col-6">
          <label class="form-label small fw-medium">Last name</label>
          <input v-model="form.lastName" type="text" :class="['form-control', errors.lastName && 'is-invalid']"
            placeholder="Doe" />
          <div class="invalid-feedback">{{ errors.lastName }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label small fw-medium">Email</label>
        <input v-model="form.email" type="email" :class="['form-control', errors.email && 'is-invalid']"
          placeholder="you@example.com" />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>

      <div class="mb-3">
        <label class="form-label small fw-medium">Password</label>
        <input v-model="form.password" type="password" :class="['form-control', errors.password && 'is-invalid']"
          placeholder="Min. 8 characters" />
        <div v-if="form.password" class="progress mt-2" style="height: 4px;">
          <div class="progress-bar" :class="`bg-${strengthColor}`" :style="{ width: strengthWidth }" role="progressbar">
          </div>
        </div>
        <div class="form-text">{{ form.password ? strengthLabel : '' }}</div>
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>

      <div class="mb-4">
        <label class="form-label small fw-medium">Confirm password</label>
        <input v-model="form.confirm" type="password" :class="['form-control', errors.confirm && 'is-invalid']"
          placeholder="Repeat your password" @keydown.enter="register" />
        <div class="invalid-feedback">{{ errors.confirm }}</div>
        <div v-if="form.confirm && !errors.confirm" class="form-text text-success">
          Passwords match.
        </div>
      </div>

      <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" :disabled="loading"
        @click="register">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"></span>
        <span>{{ loading ? 'Creating account…' : 'Create account' }}</span>
      </button>

      <p class="text-center small text-secondary mt-3 mb-0">
        By signing up you agree to our
        <a href="#" class="text-primary text-decoration-none">Terms of Service</a> and
        <a href="#" class="text-primary text-decoration-none">Privacy Policy</a>.
      </p>

      <hr class="my-3" />
      <p class="text-center small text-secondary mb-0">
        Already have an account?
        <RouterLink to="/" class="text-primary text-decoration-none">Sign in</RouterLink>
      </p>

    </div>
  </div>
</template>
