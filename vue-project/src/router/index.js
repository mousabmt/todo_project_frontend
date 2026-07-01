import { createRouter, createWebHistory } from "vue-router";
import { authStore } from "@/stores/authStore";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/Auth/loginView.vue"),
      meta: { authRequired: false },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Auth/registerView.vue"),
      meta: { authRequired: false },
    },
    {
      path: "/unauthorized",
      name: "unauthorized",
      component: () => import("@/views/Auth/UnauthorizedView.vue"),
    },
    {
      path: "/student/dashboard",
      name: "studentDashboard",
      component: () => import("@/views/Student/DashboardView.vue"),
      meta: { authRequired: true, role: "student", layout: "AppLayout" },
    },
    {
      path: "/instructor/dashboard",
      name: "instructorDashboard",
      component: () => import("@/views/Instructor/DashboardView.vue"),
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/students",
      name: "students",
      component: () => import("@/views/Instructor/studentsListView.vue"),
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/instructor/courses",
      name: "instructorCourses",
      component: () => import("@/views/Instructor/InstructorCoursesView.vue"),
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/instructor/courses/:id/edit",
      name: "editCourse",
      component: () => import("@/views/Instructor/EditCourseView.vue"),
      props: true,
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/chat/rooms/:room",
      name: "chatRoom",
      component: () => import("@/views/chatRoomView.vue"),
      props: true,
      meta: { authRequired: true, layout: "AppLayout" },
    },
    {
      path: "/instructor/students/:id/:name/courses",
      name: "studentCourses",
      component: () => import("@/views/Instructor/StudentCoursesView.vue"),
      props: true,
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/instructor/students/:student/courses/:course/mark",
      name: "studentMark",
      component: () => import("@/views/Instructor/StudentMarkView.vue"),
      props: true,
      meta: { authRequired: true, role: "instructor", layout: "AppLayout" },
    },
    {
      path: "/student/instructor/:id/courses",
      name: "studentInstructorCourses",
      component: () => import("@/views/Student/InstructorCoursesView.vue"),
      props: true,
      meta: { authRequired: true, role: "student", layout: "AppLayout" },
    },
    // ↓ new
    {
      path: "/student/instructor/:instructor/chats",
      name: "studentInstructorChats",
      component: () => import("@/views/chatRoomView.vue"),
      props: true,
      meta: { authRequired: true, role: "student", layout: "AppLayout" },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: () => import("@/views/NotFoundView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const auth = authStore();
  if (to.name != "unauthorized") {
    if (to.meta.authRequired && !auth.isLogged) {
      return { name: "login" };
    }

    if (!to.meta.authRequired && auth.isLogged) {
      return { name: `${auth.user.role}Dashboard` };
    }

    if (to.meta.role && to.meta.role !== auth.user?.role) {
      return { name: "unauthorized" };
    }
  } else {
    console.log("Unauthorized");
  }
});

export default router;
