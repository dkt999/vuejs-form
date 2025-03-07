<script setup>
import { useModalStore } from '@/stores/modal';
import { useAuthStore } from '@/stores/auth';
import ToastNotification from "@/components/ToastNotification.vue";
import { ref, onMounted } from 'vue';
import { useI18n } from "vue-i18n";
//Init component
import ButtonCircleRipple from '@/components/ButtonCircleRipple.vue';
import BaseModal from '@/components/BaseModal.vue';
import ButtonImageCircle from '@/components/ButtonImageCircle.vue';
//Init view
import MessageSettings from '@/views/MessageRegisterView.vue';
import MessageLogin from '@/views/MessageLoginView.vue';
import ButtonLogout from '@/components/ButtonLogout.vue';
//Lấy settings
const serverAPI = import.meta.env.VITE_SERVER_API;
//Cấu hình modal
const authStore = useAuthStore();
const modalStore = useModalStore()
const { t, locale } = useI18n();
const toastRef = ref(null);
const token = localStorage.getItem("token");
const loginByTokent = async () => {
    if(token !== null)
    {
        try {
            const response = await fetch(`${serverAPI}/verify`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
            })

            if (!response.ok) {
                authStore.logout();
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            authStore.init();
        } catch (error) {
            console.error('Error fetching image:', error);
            authStore.logout();
        }
    }
    else 
    {
        authStore.logout();
    }
}
onMounted(loginByTokent)
</script>
<template>
    <div class="message-app">
        <div class="quick-bar">
            <ButtonCircleRipple v-if="!authStore.isAuthenticated" :icon="'mdi-google-ads'"/>
            <ButtonImageCircle v-if="authStore.isAuthenticated"></ButtonImageCircle>
            <div class="spacer"></div>
            <ButtonCircleRipple :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState(t('login_to_system'), MessageLogin)"/>
            <ButtonCircleRipple :icon="'mdi-tune-vertical-variant'" @click="modalStore.toggleState(t('register_to_system'), MessageSettings)"/>
            <ButtonLogout v-if="authStore.isAuthenticated"/>
        </div>
        <div>
            <div class="main-view">
                <router-view name="MainViewWraper" />
            </div>
        </div>
    </div>
    <ToastNotification ref="toastRef" />
    <BaseModal />
</template>
<style scoped>
.main-view{
    width: calc(100vw - 56px);
}
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