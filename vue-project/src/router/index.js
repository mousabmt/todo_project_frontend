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
      meta: { authRequired: true, role: "student",layout:"AppLayout" },
    },
    {
      path: "/instructor/dashboard",
      name: "instructorDashboard",
      component: () => import("@/views/Instructor/DashboardView.vue"),
      meta: { authRequired: true, role: "instructor",layout:"AppLayout" },
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
  }
});

export default router;
