import { ref } from 'vue';
import { defineStore } from 'pinia';
import { courseService } from '@/Api/courseApi';

export const useInstructorCoursesStore = defineStore('instructor_courses', () => {
    const courses     = ref([]);
    const current     = ref(null);
    const loading     = ref(false);
    const error       = ref(null);

    async function fetchCourses() {
        loading.value = true;
        error.value   = null;
        try {
            const { data } = await courseService.getAll();
courses.value = data.data;
        } catch (e) {
            error.value = e.response?.data?.message ?? 'Failed to fetch courses.';
        } finally {
            loading.value = false;
        }
    }

    async function fetchOne(id) {
        loading.value = true;
        error.value   = null;
        try {
            const { data } = await courseService.getOne(id);
            current.value  = data.data;
        } catch (e) {
            error.value = e.response?.data?.message ?? 'Failed to fetch course.';
        } finally {
            loading.value = false;
        }
    }

    async function addCourse(formData) {
        loading.value = true;
        error.value   = null;
        try {
            const { data } = await courseService.create(formData);
            courses.value.push(data.course);
        } catch (e) {
            error.value = e.response?.data?.message ?? 'Failed to create course.';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function updateCourse(id, formData) {
        loading.value = true;
        error.value   = null;
        try {
            await courseService.update(id, formData);
        } catch (e) {
            error.value = e.response?.data?.message ?? 'Failed to update course.';
            throw e;
        } finally {
            loading.value = false;
        }
    }

    async function deleteCourse(id) {
        try {
            await courseService.delete(id);
            courses.value = courses.value.filter(c => c.id !== id);
        } catch (e) {
            error.value = e.response?.data?.message ?? 'Failed to delete course.';
        }
    }

    return { courses, current, loading, error, fetchCourses, fetchOne, addCourse, updateCourse, deleteCourse };
});
