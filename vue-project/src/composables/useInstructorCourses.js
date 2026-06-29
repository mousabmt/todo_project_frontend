import { useQuery } from "@tanstack/vue-query";
import api from "@/Api/httpClient";

export function useInstructorCourses(instructor) {
  return useQuery({
    queryKey: ["coursesForInstructor"],
    queryFn: () => api.get(`/instructors/${instructor}/courses`).then((r) => r.data),
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 30,
  });
}
