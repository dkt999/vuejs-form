<script setup>
  import { useAuthStore } from "@/stores/auth";
  import { ref, watchEffect  } from 'vue';
  const props = defineProps(['src']);
  const serverAPI = import.meta.env.VITE_SERVER_API;
  const authStore = useAuthStore();
  const imageUrl = ref(null)
  const fetchImage = async () => {
    if(!localStorage.getItem('token') || props.src === undefined) return;
    if(!authStore.user || !authStore.user.avatar) return;
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
    <div class="icon">
      <img v-if="imageUrl" :src="imageUrl" alt="Avatar">
    </div>
</template>
<style>
  .icon{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: #333;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s ease;
    font-size: 1.0rem;
    width: 48px;
    height: 48px;
  }
  .icon img{
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
</style>