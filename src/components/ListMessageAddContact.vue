<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useMessageUI } from '@/stores/messageUI'
import { useAuthStore } from '@/stores/auth'
import ImageBox from '@/components/ImageBox.vue';
import ButtonText from './ButtonText.vue';
import { useI18n } from "vue-i18n";
import InputTextSmall from './InputTextSmall.vue';
import socket from "@/plugins/socket";
const serverAPI = import.meta.env.VITE_SERVER_API;
const messageUI = useMessageUI();
const authStore = useAuthStore();
const avatar = ref(null);
const name = ref(null);
const { t, locale } = useI18n();
watch(() => messageUI.selectUId, () => {
    if(messageUI.selectUInfo)
    {
        avatar.value = messageUI.selectUInfo.avatar;
        name.value = messageUI.selectUInfo.name;
    }
}, { immediate: true });
const handleSendAddFriendRequest = () => {
    const receiver = messageUI.selectUInfo;
    const sender = authStore.user;
    socket.auth = { token: authStore.token }; // Truyền token cho socket
    socket.connect();
    socket.emit("handleSendAddFriendRequest", {
        sender: sender,
        receiver:receiver
    });
};
// Lắng nghe socket khi có yêu cầu kết bạn mới
onMounted(() => {
    socket.on("new-contact-request", (data) => {
        console.log("📩 Nhận yêu cầu kết bạn:", data);
        //friendRequests.value.push(data); // Thêm vào danh sách yêu cầu kết bạn
    });
});

// Ngắt lắng nghe khi component bị unmount
onUnmounted(() => {
    socket.off("new-contact-request");
});
</script>
<template>
    <div v-if="name">
        <div class="center">
            <div class="text-center">
                <div style="height: 9rem;">
                    <ImageBox :src="avatar" mode='avatarXL'/>
                </div>
                <h3>{{ name }}</h3>
                <InputTextSmall icon="mdi-receipt-text-send" :placeholder="t('say_hello')"/>
                <div class="text-center mt-2">
                    <ButtonText :label="t('add_friend')" @click="handleSendAddFriendRequest"/>
                </div>
            </div>
            
        </div>
    </div>
</template>
<style>
    .center{
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
    .text-center{
        text-align: center;
        width: 100%;
        max-width: 350px;
    }
</style>