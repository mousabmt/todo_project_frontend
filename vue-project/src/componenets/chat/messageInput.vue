<script setup>
import { ref } from 'vue'

defineProps({ sending: { type: Boolean, default: false } })
const emit = defineEmits(['send'])

const body = ref('')

function submit() {
  const trim = body.value.trim()
  if (!trim) return
  emit('send', trim)
  body.value = ''
}
</script>

<template>
  <form class="d-flex gap-2" @submit.prevent="submit">
    <input v-model="body" type="text" class="form-control" maxlength="300" placeholder="Type your message..." required />
    <button type="submit" class="btn btn-success" :disabled="sending">
      <i class="bi bi-send me-1"></i>Send
    </button>
  </form>
</template>
