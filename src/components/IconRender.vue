<script setup>
import IconLogin from "./icons/iconLogin.vue";
import IconAccountPlus from "./icons/iconAccountPlus.vue";
import IconLogout from "./icons/iconLogout.vue";
import IconMessageBulleted from "./icons/iconMessageBulleted.vue";
import IconMagnify from "./icons/iconMagnify.vue";
import IconReceiptTextSend from "./icons/iconReceiptTextSend.vue";
const props = defineProps(['icon'])
</script>
<template>
    <IconLogin v-if="props.icon === 'mdi-login'" />
    <IconAccountPlus v-if="props.icon === 'mdi-account-plus'" />
    <IconLogout v-if="props.icon === 'mdi-logout'" />
    <IconMessageBulleted v-if="props.icon === 'mdi-message-bulleted'" />
    <IconMagnify v-if="props.icon === 'mdi-magnify'" />
    <IconReceiptTextSend v-if="props.icon === 'mdi-receipt-text-send'" />
</template>