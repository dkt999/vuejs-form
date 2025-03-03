<script setup>
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";
    import InputPassword from "@/components/InputPassword.vue";
    import InputText from "@/components/InputText.vue";
import ButtonText from "@/components/ButtonText.vue";
    const { t, locale } = useI18n();
    const error = ref("");
    const password1 = ref("");
    const password2 = ref("");
    const validatePassword = (value) => {
    error.value = value.length < 6 ? "Mật khẩu phải có ít nhất 6 ký tự!" : "";
    };
</script>
<template>
    <InputText 
        :label="t('username')" 
        :type="'password'" 
        :isRequest="true"
        @update:modelValue="validatePassword"
        v-model="password1"
    />
    <InputPassword 
        :label="t('password')" 
        :type="'password'" 
        @update:modelValue="validatePassword"
        v-model="password2"
        :compareWith="password1"
    />
    <ButtonText 
        :label="t('login')" 
    />
</template>