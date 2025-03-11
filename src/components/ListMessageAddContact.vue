<script setup>
import { ref, watch } from 'vue';
import { useMessageUI } from '@/stores/messageUI'
import ImageBox from '@/components/ImageBox.vue';
const serverAPI = import.meta.env.VITE_SERVER_API;
const messageUI = useMessageUI();
const avatar = ref(null);
watch(() => messageUI.selectUId, () => {
    if(messageUI.selectUInfo)
    {
        avatar.value = messageUI.selectUInfo.avatar;
        console.log(avatar.value)
    }
}, { immediate: true });

</script>
<template>
    <div>
        <div class="center">
            <ImageBox :src="avatar" mode='avatarXL'/>
            <div></div>
            <div></div>
        </div>
    </div>
</template>
<style>
    .center{
        display: flex;
        align-items: center;
        justify-items: center;
    }
</style>