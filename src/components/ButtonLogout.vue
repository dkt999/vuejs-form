<script setup>
  import { inject } from "vue";
  import { useRouter } from "vue-router";
  import { useAuthStore } from "@/stores/auth";
  import ButtonCircleRipple from "./ButtonCircleRipple.vue";
  const authStore = useAuthStore();
  const router = useRouter();
  const token = inject("token");
  const logout = () => {
    if (token) {
      token.value = ''; // Xóa token trong reactive state
    }
    authStore.logout();
    localStorage.removeItem("token"); // Xóa token khỏi localStorage
    router.push("/login"); // Điều hướng về trang đăng nhập
  };
</script>
<template>
    <ButtonCircleRipple :icon="'mdi-logout'"  @click="logout"/>
</template>