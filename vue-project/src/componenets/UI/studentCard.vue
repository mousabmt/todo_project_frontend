<script setup>
defineProps({
    student: {
        type: Object,
        required: true,
    }
});

</script>

<template>
    <div class="card h-100 shadow-sm">
        <div class="card-body d-flex align-items-center gap-3">
            <div class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                style="width: 48px; height: 48px; font-size: 1.2rem; flex-shrink: 0;">
                {{ student.first_name.charAt(0).toUpperCase() }}
            </div>
            <div>
                <h6 class="card-title mb-0">
                    {{ student.first_name }} {{ student.last_name }}
                </h6>
                <small class="text-muted">{{ student.email }}</small>
            </div>
        </div>
        <div class="card-footer text-muted d-flex justify-content-between align-items-center">
            <small>ID: {{ student.id }}</small>
            <span class="badge bg-primary-subtle text-primary">
                {{ student.courses?.length ?? 0 }} course(s)
            </span>
            <RouterLink :to="{ name: 'studentCourses', params: { id: student.id,name:student.first_name }}"
                class="btn btn-sm btn-outline-primary">

                View Courses
            </RouterLink>
        </div>
    </div>
</template>
