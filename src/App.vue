<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { provide, ref } from "vue";
const token = ref(localStorage.getItem("token") || "");
provide("token", token);
</script>

<template>
  <RouterView />
</template>

<style scoped>

</style>
