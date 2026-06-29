<script setup>
import { ref, onMounted } from 'vue';
import { useInstructorCoursesStore } from '@/stores/InstructorCoursesStore';
import CourseCard from '@/componenets/UI/instructorCoursesCards.vue';

const store = useInstructorCoursesStore();
const showForm = ref(false);

const form = ref({
  title: '',
  description: '',
  mark: '',
  image: null,
});
const errors = ref({});
const success = ref(false);

onMounted(() => store.fetchCourses());

function handleImage(e) {
  form.value.image = e.target.files[0];
}

async function createCourse() {
  errors.value = {};
  success.value = false;

  const formData = new FormData();
  formData.append('title', form.value.title);
  formData.append('description', form.value.description);
  formData.append('mark', form.value.mark);
  if (form.value.image) {
    formData.append('image', form.value.image);
  }

  try {
    await store.addCourse(formData);
    success.value = true;
    showForm.value = false;
    form.value = { title: '', description: '', mark: '', image: null };
  } catch (e) {
    errors.value = e.response?.data?.errors ?? {};
  }
}
</script>

<template>
  <div class="d-flex justify-content-between align-items-center mb-4">
    <div>
      <h1 class="mb-0">My Courses</h1>
      <p class="text-muted mb-0"> {{ store.courses.length }} course(s)</p>
    </div>
    <button class="btn btn-primary" @click="showForm = !showForm">
      <i class="bi bi-plus-circle me-2"></i>Create New Course
    </button>
  </div>

  <!-- success -->
  <div class="alert alert-success" v-if="success">
    <i class="bi bi-check-circle me-1"></i> Course created successfully!
  </div>

  <!-- form -->
  <div class="card shadow-sm mb-5" v-if="showForm">
    <div class="card-body p-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Course Name</label>
          <input type="text" v-model="form.title" class="form-control" :class="{ 'is-invalid': errors.title }"
            placeholder="Enter course name" />
          <div class="invalid-feedback" v-if="errors.title">{{ errors.title[0] }}</div>
        </div>
        <div class="col-md-6">
          <label class="form-label">Base Mark</label>
          <input type="number" step="0.01" v-model="form.mark" class="form-control"
            :class="{ 'is-invalid': errors.mark }" placeholder="e.g. 100" />
          <div class="invalid-feedback" v-if="errors.mark">{{ errors.mark[0] }}</div>
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Description</label>
        <textarea v-model="form.description" rows="3" class="form-control" :class="{ 'is-invalid': errors.description }"
          placeholder="Enter course description"></textarea>
        <div class="invalid-feedback" v-if="errors.description">{{ errors.description[0] }}</div>
      </div>

      <div class="mb-4">
        <label class="form-label">Course Image</label>
        <input type="file" class="form-control" accept="image/*" :class="{ 'is-invalid': errors.image }"
          @change="handleImage" />
        <div class="invalid-feedback" v-if="errors.image">{{ errors.image[0] }}</div>
      </div>

      <button class="btn btn-primary" @click="createCourse" :disabled="store.loading">
        <span v-if="store.loading" class="spinner-border spinner-border-sm me-1"></span>
        <i class="bi bi-plus-circle me-1" v-else></i>
        Create Course
      </button>
    </div>
  </div>

  <!-- loading -->
  <div class="text-center py-5" v-if="store.loading">
    <div class="spinner-border text-primary"></div>
  </div>

  <!-- error -->
  <div class="alert alert-danger" v-else-if="store.error">{{ store.error }}</div>

  <!-- empty -->
  <div class="text-center py-5" v-else-if="store.courses.length === 0">
    <i class="bi bi-journal-x fs-1 text-muted"></i>
    <p class="text-muted mt-3">No Courses Published Yet.</p>
  </div>

  <!-- list -->
  <div class="row" v-else>
    <div class="col-md-4 mb-4" v-for="course in store.courses" :key="course.id">
      <CourseCard :course="course" />
    </div>
  </div>
</template>
