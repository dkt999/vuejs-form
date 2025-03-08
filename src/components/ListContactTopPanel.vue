<script setup>
    import ButtonImageCircle from '@/components/ButtonImageCircle.vue';
    import { useAuthStore } from '@/stores/auth';
    import InputTextSmall from './InputTextSmall.vue';
    import { useI18n } from "vue-i18n";
    const { t, locale } = useI18n();
    const authStore = useAuthStore();
</script>
<template>
    <div class="wrapper">
        <div v-if="authStore.user" class="item-inner">
            <div class="image">
                <ButtonImageCircle :src="authStore.user.avatar"></ButtonImageCircle>
            </div>
            <div class="item-profile">
                <div class="name">{{authStore.user.name}}</div>
                <div class="text-mute">Idle</div>
            </div>
        </div>
        <div>
            <InputTextSmall :placeholder="t('enter_to_search')" :icon="'mdi-magnify'"/>
        </div>
    </div>
</template>
<style>
.wrapper{
    margin-top: 14px;
}
</style>