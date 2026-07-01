<script setup>
import { nextTick, watch, ref } from 'vue'

const props = defineProps({
  messages: { type: Array, default: () => [] },
  currentUserId: { type: [Number, String], required: true },
  loading: { type: Boolean, default: false },
})

const container = ref(null)

watch(
  () => props.messages?.length,
  async () => {
    await nextTick()
    if (container.value) container.value.scrollTop = container.value.scrollHeight
  },
)
</script>

<template>
  <div ref="container" class="card-body bg-light-subtle" style="min-height: 420px; max-height: 420px; overflow-y: auto;">
    <div v-if="loading" class="text-muted">Loading messages…</div>

    <div
      v-for="m in messages"
      :key="m.id"
      class="d-flex mb-3"
      :class="m.user.id === currentUserId ? 'justify-content-end' : 'justify-content-start'"
    >
      <div class="card shadow-sm" :class="m.user.id === currentUserId ? 'border-success' : 'border-0'" style="max-width: 85%;">
        <div class="card-body py-2 px-3">
          <div class="d-flex align-items-center gap-2 mb-2">
            <strong>{{ m.user.first_name }} {{ m.user.last_name }}</strong>
            <span v-if="m.user.role === 'instructor'" class="badge bg-primary">Instructor</span>
          </div>
          <p class="mb-1">{{ m.body }}</p>
          <small class="text-muted">{{ new Date(m.created_at).toLocaleString() }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
