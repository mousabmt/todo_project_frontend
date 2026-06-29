import apiClient from "@/Api/httpClient";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useStudentCourses = defineStore("student_courses", () => {
  const courses = ref([]);
  const student = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchCourses(_object) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.get(`/instructor/students/${_object}/courses`);
      courses.value = data.courses;
      student.value = data.student;
    } catch (e) {
      error.value = e.response?.data?.message ?? "Failed to fetch students.";
    } finally {
      loading.value = false;
    }
  }
  async function getStudentMark(studentId, courseId) {
    loading.value = true;
    error.value = null;
    try {
      const { data } = await apiClient.get(`/instructor/students/${studentId}/courses/${courseId}`);
      student.value = data;
    } catch (e) {
      error.value = e.response?.data?.message ?? "Failed to fetch students.";
    } finally {
      loading.value = false;
    }
  }
  return { student, courses, error, loading, fetchCourses,getStudentMark };
});
