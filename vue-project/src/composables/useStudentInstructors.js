import { useQuery } from "@tanstack/vue-query";
import api from "@/Api/httpClient";

export function useStudentInstructors() {
  return useQuery({
    queryKey: ["student-instructors"],
    queryFn: () => api.get("/student/home").then((r) => r.data),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 30,
  });
}
