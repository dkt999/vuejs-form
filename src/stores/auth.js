import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref(null);
    // Hàm lưu thông tin đăng nhập
    const login = (userData, token) => {
        isAuthenticated.value = true;
        user.value = userData;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    }
    const init = () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          user.value = JSON.parse(savedUser);
          isAuthenticated.value = true;
        }
    }
    const logout = () => {
        localStorage.removeItem("token");
        isAuthenticated.value = false;
    };

    return { isAuthenticated, logout, login, init, user };
});