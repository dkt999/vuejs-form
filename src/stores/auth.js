import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
    const isAuthenticated = ref(false);
    const user = ref(null);
    const token = ref(null);
    // Hàm lưu thông tin đăng nhập
    const login = (userData, tokenData) => {
        isAuthenticated.value = true;
        user.value = userData;
        token.value = tokenData;
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", tokenData);
    }
    const init = () => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          user.value = JSON.parse(savedUser);
          isAuthenticated.value = true;
          token.value = localStorage.getItem("token");
        }
    }
    const logout = () => {
        localStorage.removeItem("token");
        isAuthenticated.value = false;
        token.value = null;
    };

    return { isAuthenticated, logout, login, init, user, token};
});