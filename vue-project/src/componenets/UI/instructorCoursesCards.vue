<script setup>
import { useInstructorCoursesStore } from '@/stores/InstructorCoursesStore';

const props = defineProps({
  course: { type: Object, required: true }
});
console.log(props.course.title);

const store = useInstructorCoursesStore();
</script>

<template>
  <div class="card h-100 shadow-sm">
    <img v-if="course.image" :src="`http://localhost:8000/storage/${course.image}`" class="card-img-top"
      :alt="course.title" style="height: 180px; object-fit: cover;">
    <div class="card-body">
      <h5 class="card-title">{{ course.title }}</h5>
      <p class="card-text text-muted">{{ course.description }}</p>
      <RouterLink v-if="course.room" :to="{ name: 'chatRoom', params: { room: course.room.id } }"
        class="btn btn-outline-success btn-sm">
        <i class="bi bi-chat-dots me-1"></i>Course Chat
      </RouterLink>
    </div>
    <div class="d-flex gap-2 p-3 pt-0">
      <button class="btn btn-sm btn-outline-danger" @click="store.deleteCourse(course.id)">
        <i class="bi bi-trash me-1"></i>Delete
      </button>
      <RouterLink :to="{ name: 'editCourse', params: { id: course.id } }" class="btn btn-sm btn-outline-primary">
        <i class="bi bi-pencil-square"></i> Edit
      </RouterLink>
    </div>
  </div>
</template>
