<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useMessageUI } from '@/stores/messageUI';
import { useAuthStore } from '@/stores/auth';
import { useContactStore } from '@/stores/contactStore';
import ImageBox from '@/components/ImageBox.vue';
import ButtonText from './ButtonText.vue';
import { useI18n } from "vue-i18n";
import socket from "@/plugins/socket";
const emit = defineEmits(['update-room']);
const serverAPI = import.meta.env.VITE_SERVER_API;
const messageUI = useMessageUI();
const authStore = useAuthStore();
const contactStore = useContactStore();
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
const handleSendAcceptFriendRequest = () => {
    socket.auth = { token: authStore.token };
    socket.connect();
    socket.emit("handleSendAcceptFriendRequest", {
        chat_room_id: messageUI.selectRoom,
        status:'accept'
    });
};
const handleSendBlockFriendRequest = () => {
    socket.auth = { token: authStore.token };
    socket.connect();
    socket.emit("handleSendBlockFriendRequest", {
        chat_room_id: messageUI.selectRoom,
        status:'block'
    });
};
onMounted(() => {
    socket.on("new-contact-accept", (data) => {
        emit("update-room");
        contactStore.addNewContact(data);  
        contactStore.initContactList();
    });
});
onUnmounted(() => {
    socket.off("new-contact-accept");
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
                <div class="text-center mt-2 text-center-flex">
                    <div>
                        <ButtonText :label="t('accept_friend')" @click="handleSendAcceptFriendRequest"/>
                    </div>
                    <div>
                        <ButtonText :label="t('block_friend')" @click="handleSendBlockFriendRequest" :class="'md-secondary'"/>
                    </div>
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
    .text-center-flex{
        display: flex;
        justify-content: center;
        gap: 0.8rem;
    }
</style>