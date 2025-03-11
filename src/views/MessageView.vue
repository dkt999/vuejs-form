<script setup>
    import ListContact from '@/components/ListContact.vue';
    import ListMessage from '@/components/ListMessage.vue';
    import { useMessageUI } from '@/stores/messageUI'
    const messageUI = useMessageUI();
</script>
<template>
    <div class="message-wrapper">
        <div class="list-contact-animation" :class="{ open: messageUI.messageUISlide }">
            <ListContact/>
        </div>
        <div class="list-message-animation" :class="{ expanded: messageUI.messageUISlide }">
            <ListMessage :isExpanded="messageUI.messageUISlide" class="list-message"/>
        </div>
    </div>
</template>
<style scoped>
.message-wrapper {
    display: flex;
    width: calc(100vw - 64px);
    overflow: hidden;
}
/* ListContact Animation */
.list-contact-animation {
    width: 0;
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden; /* Tránh hiển thị nội dung khi thu nhỏ */
}

.list-contact-animation.open {
    width: 375px; /* Chiều rộng khi mở */
}

/* ListMessage Animation */
.list-message-animation {
    width: 100vw; /* Khi ListContact đóng */
    transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Khi ListContact mở, ListMessage thu nhỏ lại */
.list-message-animation.expanded {
    width: calc(100vw - 375px);
}
</style>