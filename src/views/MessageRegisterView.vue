<script setup>
    import { ref } from "vue";
    import { useI18n } from "vue-i18n";
    import InputPassword from "@/components/InputPassword.vue"; 
    import InputText from "@/components/InputText.vue"; 
    import InputFile from "@/components/InputFile.vue";
import InputDate from "@/components/InputDate.vue";
    const retypePassword = ref("");
    const { t, locale } = useI18n();
    const username = ref("");
    const password = ref("");
    const avatar = ref("");
    const birthday = ref("");
    const name = ref("");
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
            :label="t('password')" 
            v-model="password"
            :isRequired = "true"
            @update:modelValue="getPassword"
        />
        <InputPassword 
            :label="t('retype_password')" 
            v-model="retypePassword"
            :compareWith="password"
            :isRequired = "true"
        />
        <InputFile 
            v-model="avatar"
            :label="t('avatar')" 
            :IsImage = true
        />
    </form>
</template>