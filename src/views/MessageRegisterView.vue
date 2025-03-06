<script setup>
    import { ref, nextTick, inject } from "vue";
    import { useI18n } from "vue-i18n";
    import axios from "axios";
    import { useRouter, useRoute } from "vue-router";
    import { useAuthStore } from "@/stores/auth";
    import InputPassword from "@/components/InputPassword.vue"; 
    import InputText from "@/components/InputText.vue"; 
    import InputFile from "@/components/InputFile.vue";
    import InputDate from "@/components/InputDate.vue";
    import ButtonText from "@/components/ButtonText.vue";
    import ToastNotification from "@/components/ToastNotification.vue";
    import { strongPasswordRegex } from "@/config"; // Import config
    import { minimumPasswordLength } from "@/config"; // Import config
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const toastRef = ref(null);
    const router = useRouter();
    const authStore = useAuthStore();
    const route = useRoute();
    const { t, locale } = useI18n();
    const token = inject("token");
    //Init variable control
    const email = ref("");
    const password = ref("");
    const retypePassword = ref("");
    const avatar = ref("");
    const birthday = ref("");
    const name = ref("");
    //Init control
    const txt_name = ref(null);
    const txt_birthday = ref(null);
    const txt_email = ref(null);
    const txt_password = ref(null);
    const txt_retype_password = ref(null);
    const fud_avatar = ref(null)
    const btn_register = ref(null);
    const props = defineProps({
        viewMode: {
            type: String,
            default: "modal",
        }
    })
    const getEmail = (value) => {
        email.value = value;
    };
    const getPassword = (value) => {
        password.value = value;
    };
    const getName = (value) => {
        name.value = value;
    };
    const getBirthday = (value) => {
        birthday.value = value;
    };
    const handleRegister = async () => {
        await nextTick();  
        //Focus hết các component có yêu cầu xác thực
        txt_name.value.$el.querySelector("input").focus();
        txt_birthday.value.$el.querySelector("input").focus();
        txt_email.value.$el.querySelector("input").focus();
        txt_password.value.$el.querySelector("input").focus();
        txt_retype_password.value.$el.querySelector("input").focus();
        fud_avatar.value.$el.querySelector("input").focus();
        if(name.value == "")
        {
            txt_name.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0005:EMPTY_NAME'));
            return;
        }
        if(birthday.value == "")
        {
            txt_birthday.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0006:EMPTY_BIRTHDAY'));
            return;
        }
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
        if(retypePassword.value == "") 
        {
            txt_retype_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0007:EMPTY_CONFIRM_PASSWORD'));
            return;
        }
        if(password.value.length > 0 && password.value.length < minimumPasswordLength) {
            txt_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0012:PASSWORD_TOO_SHORT'));
            return;
        }
        if(!strongPasswordRegex.test(password.value) && password.value.length > 0)
        {
            txt_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0013:PASSWORD_NOT_MEET_REQUIREMENTS'));
            return;
        }
        if(password.value !== retypePassword.value){
            toastRef.value.showToast(t('0x0014:PASSWORD_NOT_MATCHED'));
            return;
        }
        //Xử lý post đăng nhập 
        try {
            let formData = new FormData();
            formData.append("name", name.value);
            formData.append("email", email.value);
            formData.append("password", password.value);
            formData.append("birthday", birthday.value);
            if (avatar.value) {
                formData.append("avatar", avatar.value);
            }

            // Gửi request API
            const response = await axios.post(`${serverAPI}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept':'application/json'
                },
            });
            token.value = response.data.token;
            localStorage.setItem('token', response.data.token); // Lưu token vào localStorage
            authStore.login(response.data.user, response.data.token);
            authStore.isAuthenticated = true;
            token.value = response.data.token;
            router.push('/message');
            
        } catch (error) {
            console.error(error);
        }
    };
</script>
<template>
    <div :class="[props.viewMode]">
        <form class="popup-form">
            <h1 class="mb-2" v-if="props.viewMode === 'full'">{{ t('register') }}</h1>
            <InputText 
                ref="txt_name"
                :label="t('name')" 
                :isRequired="true"
                @update:modelValue="getName"
                v-model="name"
            />
            <InputDate 
                ref="txt_birthday"
                :label="t('birthday')" 
                :isRequired="true"
                @update:modelValue="getBirthday"
                v-model="birthday"
            />
            <InputText 
                ref="txt_email"
                :label="t('email')" 
                :isRequired="true"
                @update:modelValue="getEmail"
                v-model="email"
            />
            <InputPassword 
                ref="txt_password"
                :label="t('password')" 
                v-model="password"
                :isRequired = "true"
                @update:modelValue="getPassword"
            />
            <InputPassword 
                ref="txt_retype_password"
                :label="t('retype_password')" 
                v-model="retypePassword"
                :compareWith="password"
                :isRequired = "true"
            />
            <InputFile 
                ref="fud_avatar"
                v-model="avatar"
                :label="t('avatar')" 
                :IsImage = true
            />
            <ButtonText 
                ref="btn_register"
                :label="t('register')" 
                @click.prevent="handleRegister"
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