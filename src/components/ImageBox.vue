<script setup>
    import { useAuthStore } from "@/stores/auth";
    import { ref, watchEffect } from "vue";
    const props = defineProps(['src', 'mode']);
    console.log(props.mode);
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const authStore = useAuthStore();
    const imageUrl = ref(null);
    const fetchImage = async () => {
    if(!localStorage.getItem('token')) return;
    if(!authStore.user || !authStore.user.avatar || !props.src) return;
    const token = authStore.token;
    try {
      const response = await fetch(`${serverAPI}/${props.src}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await response.blob()
      imageUrl.value = URL.createObjectURL(blob); // Chuyển Blob thành Object URL
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }
  watchEffect(() => {
    fetchImage();
  });
</script>
<template>
    <img v-if="imageUrl" :src="imageUrl" alt="Avatar" :class="[props.mode]">
</template>
<style scoped>
    img{
        object-fit: cover;
    }
    .avatarXL{
        border-radius: 50%;
        width: 8rem;
    }
    .round{
        border-radius: 8px;
    }
</style>