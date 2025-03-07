<script setup>
    import { ref, nextTick, inject } from "vue";
    import { useI18n } from "vue-i18n";
    import { useAuthStore } from "@/stores/auth";
    import ToastNotification from "@/components/ToastNotification.vue";
    import InputPassword from "@/components/InputPassword.vue";
    import InputText from "@/components/InputText.vue";
    import ButtonText from "@/components/ButtonText.vue";
    import { useRouter, useRoute } from "vue-router";
    import { emailRegex } from "@/config";
    import { useModalStore } from '@/stores/modal'
    const modalStore = useModalStore();
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const authStore = useAuthStore();
    const { t, locale } = useI18n();
    const router = useRouter();
    const route = useRoute();
    const toastRef = ref(null);
    const token = inject("token");
    const email = ref("");
    const password = ref("");
    const getEmail = (value) => {
        email.value = value;
    };
    const getPassword = (value) => {
        password.value = value;
    };
    const props = defineProps({
        viewMode: {
            type: String,
            default: "modal",
        }
    })
    const txt_email = ref(null);
    const txt_password = ref(null);
    const btn_login = ref(null);
    const handleLogin = async () => {
        await nextTick();  
        //Focus hết các component có yêu cầu xác thực
        txt_email.value.$el.querySelector("input").focus();
        txt_password.value.$el.querySelector("input").focus();
        if(email.value == "")
        {
            txt_email.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0011:EMPTY_EMAIL'));
            return;
        }
        if(password.value == "") 
        {
            txt_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0002:EMPTY_PASSWORD'));
            return;
        }
        if(!emailRegex.test(email.value))
        {
            txt_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0015:INVAILID_EMAIL'));
            return;
        }
        try {
            console.log(JSON.stringify({ email: email.value, password: password.value }));
            const response = await fetch(`${serverAPI}/login`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept':'application/json'
            },
            body: JSON.stringify({ email: email.value, password: password.value })
            });

            if (!response.ok) {
                if (response.status === 401) {
                    toastRef.value.showToast(t('0x0008:LOGIN_INCORRECT'));
                }
                else 
                {
                    toastRef.value.showToast(t('0x0009:INTERNAL_SERVER_ERR'));
                }
                return;
            }
            const data = await response.json();
            localStorage.setItem('token', data.token); // Lưu token vào localStorage
            authStore.login(data.user, data.token);
            authStore.isAuthenticated = true;
            token.value = data.token;
            if(props.viewMode === 'modal')
            {
                modalStore.closeModal();
            }
            router.push(route.query.redirect || "/");
        } catch (error) {
            toastRef.value.showToast(t('0x0010:INTERNAL_SERVER_ERR'));
            return Promise.reject(error);
        }
    };
</script>
<template>
    <div :class="[props.viewMode]">
        <form class="popup-form">
            <h1 class="mb-2" v-if="props.viewMode === 'full'">{{ t('login') }}</h1>
            <InputText 
                :inputType="'email'"
                ref="txt_email"
                :label="t('email')" 
                :isRequired="true"
                @update:modelValue="getEmail"
                v-model="email"
            />
            <InputPassword 
                ref="txt_password"
                :label="t('password')" 
                :isRequired = "true"
                :isChecked = "false"
                @update:modelValue="getPassword"
                v-model="password"
            />
            <ButtonText 
                ref="btn_login"
                :label="t('login')" 
                @click.prevent="handleLogin"
                v-ripple
            />
        </form>
    </div>
    <ToastNotification ref="toastRef" />
</template>
<style scoped>
    .full{
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .full form{
        border-radius: 8px;
        background-color: var(--color-background-soft);
        max-height: 80vh;
        width: 400px;
        overflow: hidden;
        overflow-y: auto;
    }
</style>