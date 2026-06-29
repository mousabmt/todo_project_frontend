import { ref } from "vue";
import { defineStore } from "pinia";
import api from "@/Api/httpClient";

export const useInstructorStudentsStore = defineStore("instructor_students", () => {
  const students = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchStudents() {
    loading.value = true;
    error.value = null;

    try {
      const { data } = await api.get("/instructor/students");
      students.value = data;
      students.value = data.map((s) => ({
        id: s.id,
        first_name: s.user.first_name,
        last_name: s.user.last_name,
        email: s.user.email,
        courses: s.courses,
      }));
    } catch (e) {
      error.value = e.response?.data?.message ?? "Failed to fetch students.";
    } finally {
      loading.value = false;
    }
  }

  return { students, loading, error, fetchStudents };
});
