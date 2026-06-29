import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { sanctumClient } from "@/Api/sanctumClient";
import apiClient from "@/Api/httpClient";
import router from "@/router";

export const authStore = defineStore("auth", () => {
  const user = ref(JSON.parse(sessionStorage.getItem("user")) ?? null);

  const isLogged = computed(() => !!user.value);

  async function login(credentials) {
    await sanctumClient.get('/sanctum/csrf-cookie')

    const { data } = await apiClient.post("/login", credentials);

    user.value = data.user;
    sessionStorage.setItem("user", JSON.stringify(data.user));

    router.push(`/${data.user.role}/dashboard`);
  }

  async function logout() {
    try {
      await apiClient.post("/logout"); // server clears the HttpOnly cookie
    } finally {
      user.value = null;
      sessionStorage.removeItem("user");
      router.push("/");
    }
  }

  return { user, isLogged, login, logout };
});
