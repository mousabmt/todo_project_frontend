<script setup>
const props = defineProps({
    course: { type: Object, required: true },
    studentId: { type: String, required: true }, // ← String not Number (route params are strings)
});
console.log("props :",props.course);


</script>

<template>
    <div class="card h-100 shadow-sm">
        <img :src="`http://localhost:8000/storage/${course.image}`"
            class="card-img-top" :alt="course.title"
            style="height: 180px; object-fit: cover;">
        <div class="card-body">
            <h5 class="card-title">{{ course.title }}</h5>
            <p class="card-text text-muted">{{ course.description }}</p>
        </div>
        <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted">Max Mark: {{ course.mark }}</small>
            <span class="badge bg-success-subtle text-success">
                Base: {{ course.pivot.baseMark }}
            </span>
        </div>
        <div class="p-2">
            <RouterLink :to="{ name: 'studentMark', params: { student: studentId, course: course.id } }"
                class="btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil-square"></i> Edit
            </RouterLink>
        </div>
    </div>
</template>
