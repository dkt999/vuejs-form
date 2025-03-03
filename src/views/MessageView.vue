<script setup>
import { useModalStore } from '@/stores/modal'
import { ref, computed } from 'vue';
//Init component
import RippleButtonCircle from '@/components/ButtonCircleRipple.vue';
import BaseModal from '@/components/BaseModal.vue';
//Init view
import MessageSettings from '@/views/MessageSettingsView.vue';
import MessageLogin from '@/views/MessageLoginView.vue';
//Cấu hình modal
const modalStore = useModalStore()
</script>

<template>
    <div class="message-app">
        <div class="quick-bar">
            <RippleButtonCircle :icon="'mdi-google-ads'"/>
            <div class="spacer"></div>
            <RippleButtonCircle :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState('Đăng nhập', MessageLogin)"/>
            <RippleButtonCircle :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState('Cài đặt', MessageSettings)"/>
            <RippleButtonCircle :icon="'mdi-logout'"/>
        </div>
        <div>

        </div>
    </div>
    <BaseModal />
</template>
<style scoped>
.message-app{
    width: 100vw;
    display: flex;
}
.quick-bar{
    width: 64px;
    background-color: var(--color-background-soft);
    height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 8px;
    justify-content: space-between
}
.spacer {
    flex-grow: 1; /* Đẩy các icon dưới xuống đáy */
    background-color: aqua;
}
.quick-bar > .icon:last-child {
    margin-bottom: 8px;
}
.quick-bar > .icon:first-child {
    margin-top: 8px;
}
</style>