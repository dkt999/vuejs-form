<script setup>
    import { useAuthStore } from '@/stores/auth';
    import ButtonImageCircle from '@/components/ButtonImageCircle.vue';
    const authStore = useAuthStore();
</script>
<template>
    <div class="item">
        <div class="image">
            <ButtonImageCircle v-if="authStore.isAuthenticated" :src="authStore.user.avatar"></ButtonImageCircle>
        </div>
        <div class="item-profile">
            <div class="name">Đinh Kim Thạch</div>
            <div class="text-mute">Idle</div>
        </div>
    </div>
</template>
<style>
.image{
    width: 56px;
}
.item{
    display: flex;
    width: 250px;
    border-bottom: 1px solid var(--color-input-hover);
}
.item-profile{

}
.name{
    color:var(--color-input-lable-focus);
}
</style>
