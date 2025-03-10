<script setup>
    import { ref, watch } from 'vue';
import ListMessageAddContact from './ListMessageAddContact.vue';
    const props = defineProps(['uid']);
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const roomId = ref(null);
    const resultType = ref('contact');
    const checkPrivateChatRoom = async () => {
        if (!props.uid) return;

        try {
            const response = await fetch(`${serverAPI}/chat-room/private/${props.uid}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Nếu có token
                }
            });
            const data = await response.json();
            roomId.value = data.room_id; // Nếu có phòng chat thì nhận room_id, nếu không thì null
        } catch (error) {
            console.error('Lỗi kiểm tra phòng chat:', error);
        }
    };
    watch(() => props.uid, () => {
        checkPrivateChatRoom();
    }, { immediate: true });
</script>
<template>
    <ListMessageAddContact v-if="!roomId && resultType === 'contact'" />
</template>