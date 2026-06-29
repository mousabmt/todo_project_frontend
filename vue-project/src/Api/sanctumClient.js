import axios from "axios";
export const sanctumClient = axios.create({
    baseURL: import.meta.env.VITE_SANCTUM_URL,
    withCredentials: true,
});
