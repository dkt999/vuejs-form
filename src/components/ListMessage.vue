<script setup>
    import { onMounted, ref, watch } from 'vue';
    import ListMessageAddContact from './ListMessageAddContact.vue';
    import ListMessageAcceptContact from './ListMessageAcceptContact.vue';
    import { useMessageUI } from '@/stores/messageUI'
    const messageUI = useMessageUI();
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const roomId = ref(null);
    const resultType = ref('contact');
    const loadMessage = ref(true);
    const showListMessage = ref(false);
    const checkPrivateChatRoom = async () => {
        if (!messageUI.selectUId) return;
        try { 
            showListMessage.value = false; // Ẩn div trước khi kiểm tra
            const response = await fetch(`${serverAPI}/chat-room/private/${messageUI.selectUId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có token
                }
            });
            const data = await response.json();
            roomId.value = data.room_id; // Nếu có phòng chat thì nhận room_id, nếu không thì null
            loadMessage.value = false;
            // Đợi một chút trước khi hiển thị lại để có hiệu ứng mượt
            setTimeout(() => {
                showListMessage.value = true;
            }, 10); // Đợi 10ms để Vue kích hoạt lại transition
        } catch (error) {
            console.error('Lỗi kiểm tra phòng chat:', error);
        }
    };
    watch(() => [messageUI.selectUId, roomId.value], () => {
        loadMessage.value = true;
        checkPrivateChatRoom();
    }, { immediate: true });
    onMounted(() => {
        checkPrivateChatRoom();
    });
</script>
<template>
    <Transition name="fade">
        <div v-if="showListMessage" :class="['list-message', { expanded: messageUI.messageUISlide }]">
            <ListMessageAddContact v-if="!roomId && resultType === 'contact' && !loadMessage"/>
            <ListMessageAcceptContact v-if="roomId && resultType === 'contact' && !loadMessage"/>
        </div>
    </Transition>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>