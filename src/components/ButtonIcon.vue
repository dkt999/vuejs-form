<script setup>
    const props = defineProps(['icon'])
</script>
<template>
    <i :class="['mdi', icon]"></i>
</template>
<style>
    .mdi{
        font-size:1.3rem;
    }
</style>