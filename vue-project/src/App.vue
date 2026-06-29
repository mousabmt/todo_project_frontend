<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppLayout from '@/componenets/shared/AppLayout.vue';
import loginView from './views/Auth/loginView.vue';
const route = useRoute();

const layout = computed(() => {
  return route.meta.layout === 'AppLayout' ? AppLayout : loginView;
});
</script>
<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style scoped></style>
