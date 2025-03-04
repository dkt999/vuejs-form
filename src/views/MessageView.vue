<script setup>
import { useModalStore } from '@/stores/modal'
import ToastNotification from "@/components/ToastNotification.vue";
import { ref, computed } from 'vue';
import { useI18n } from "vue-i18n";
//Init component
import RippleButtonCircle from '@/components/ButtonCircleRipple.vue';
import BaseModal from '@/components/BaseModal.vue';
//Init view
import MessageSettings from '@/views/MessageRegisterView.vue';
import MessageLogin from '@/views/MessageLoginView.vue';
//Cấu hình modal
const modalStore = useModalStore()
const { t, locale } = useI18n();
//Test noti 
const toastRef = ref(null);
const count = ref(1);
// Hàm gọi toast từ component con
const notify = () => {
    count.value ++;
    toastRef.value.showToast("Thông báo mới tji" + count.value);
};
</script>

<template>
    <div class="message-app">
        <div class="quick-bar">
            <RippleButtonCircle :icon="'mdi-google-ads'"/>
            <div class="spacer"></div>
            <RippleButtonCircle :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState(t('login_to_system'), MessageLogin)"/>
            <RippleButtonCircle :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState(t('register_to_system'), MessageSettings)"/>
            <RippleButtonCircle :icon="'mdi-logout'"/>
        </div>
        <div>
            <div>
                <button @click="notify">Hiển thị Toast</button>
                <ToastNotification ref="toastRef" />
            </div>
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