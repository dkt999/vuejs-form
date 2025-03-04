<script setup>
    import { ref, nextTick } from "vue";
    import { useI18n } from "vue-i18n";
    import ToastNotification from "@/components/ToastNotification.vue";
    import InputPassword from "@/components/InputPassword.vue";
    import InputText from "@/components/InputText.vue";
    import ButtonText from "@/components/ButtonText.vue";
    const toastRef = ref(null);
    const { t, locale } = useI18n();
    const username = ref("");
    const password = ref("");
    const getUsername = (value) => {
        username.value = value;
    };
    const getPassword = (value) => {
        password.value = value;
    };
    const txt_username = ref(null);
    const txt_password = ref(null);
    const btn_login = ref(null);
    const handleLogin = async () => {
        await nextTick();  
        //Focus hết các component có yêu cầu xác thực
        txt_username.value.$el.querySelector("input").focus();
        txt_password.value.$el.querySelector("input").focus();
        if(username.value == "")
        {
            txt_username.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0001:EMPTY_USERNAME'));
            return;
        }
        if(password.value == "") 
        {
            txt_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0002:EMPTY_PASSWORD'));
            return;
        }
        //Xử lý post đăng nhập
    };
</script>
<template>
    <form class="popup-form">
        <InputText 
            ref="txt_username"
            :label="t('username')" 
            :isRequired="true"
            @update:modelValue="getUsername"
            v-model="username"
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
    <ToastNotification ref="toastRef" />
</template>