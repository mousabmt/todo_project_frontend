<script setup>
defineProps({
  participants: { type: Array, default: () => [] },
  onlineCount: { type: Number, default: 0 },
})
</script>

<template>
  <div class="card shadow-sm">
    <div class="card-header bg-white">
      <h5 class="mb-0">Participants</h5>
    </div>
    <div class="list-group list-group-flush">
      <div
        v-for="p in participants"
        :key="p.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ p.first_name }} {{ p.last_name }}</span>
        <span v-if="p.pivot?.role === 'instructor'" class="badge bg-primary">Instructor</span>
        <span v-else class="badge bg-light text-dark">Student</span>
      </div>
    </div>
  </div>
</template>
