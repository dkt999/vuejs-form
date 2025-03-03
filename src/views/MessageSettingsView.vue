<script setup>
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";
    import InputPassword from "@/components/InputPassword.vue"; 
    const password1 = ref("");
    const password2 = ref("");
    const { t, locale } = useI18n();
</script>
<template>
    <InputPassword 
        :label="t('password')" 
        :type="'password'" 
        v-model="password1"
    />
    <InputPassword 
        :label="t('retype_password')" 
        :type="'password'" 
        v-model="password2"
        :compareWith="password1"
    />
</template>