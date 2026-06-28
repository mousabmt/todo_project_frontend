import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/Api/httpClient'
import router from '@/router'

export const authStore = defineStore('auth', () => {
    const user = ref(JSON.parse(sessionStorage.getItem('user')) ?? null)

    const isLogged = computed(() => !!user.value)

    async function login(credentials) {
        const { data } = await api.post('/login', credentials)
        console.log(data);

        user.value = data.user
        sessionStorage.setItem('user', JSON.stringify(data.user))

        router.push(`/${data.user.role}/dashboard`)
    }

    async function logout() {
        try {
            await api.post('/logout') // server clears the HttpOnly cookie
        } finally {
            user.value = null
            sessionStorage.removeItem('user')
            router.push('/')
        }
    }

    return { user, isLogged, login, logout }
})
