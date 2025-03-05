<script setup>
    import { ref, nextTick } from "vue";
    import { useI18n } from "vue-i18n";
    import InputPassword from "@/components/InputPassword.vue"; 
    import InputText from "@/components/InputText.vue"; 
    import InputFile from "@/components/InputFile.vue";
    import InputDate from "@/components/InputDate.vue";
    import ButtonText from "@/components/ButtonText.vue";
    import ToastNotification from "@/components/ToastNotification.vue";
    const toastRef = ref(null);
    const { t, locale } = useI18n();
    //Init variable control
    const username = ref("");
    const password = ref("");
    const retypePassword = ref("");
    const avatar = ref("");
    const birthday = ref("");
    const name = ref("");
    //Init control
    const txt_name = ref(null);
    const txt_birthday = ref(null);
    const txt_username = ref(null);
    const txt_password = ref(null);
    const txt_retype_password = ref(null);
    const fud_avatar = ref(null)
    const btn_register = ref(null);
    const getUsername = (value) => {
        username.value = value;
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
        txt_username.value.$el.querySelector("input").focus();
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
        if(retypePassword.value == "") 
        {
            txt_retype_password.value.$el.querySelector("input").focus();
            toastRef.value.showToast(t('0x0007:EMPTY_CONFIRM_PASSWORD'));
            return;
        }
        //Xử lý post đăng nhập 
    };
</script>
<template>
    <form class="popup-form">
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
            ref="txt_username"
            :label="t('username')" 
            :isRequired="true"
            @update:modelValue="getUsername"
            v-model="username"
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
    <ToastNotification ref="toastRef" />
</template>