<script setup>
    import { useMessageUI } from '@/stores/messageUI';
    import ButtonImageCircle from './ButtonImageCircle.vue';
import ListMessageHolder from './ListMessageHolder.vue';
import ListMessageForm from './ListMessageForm.vue';
    const messageUI = useMessageUI();
</script>
<template>
    <div class="header">
        <ButtonImageCircle :src="messageUI.selectUInfo.avatar"/>
        <div class="header-info">
            <div class="header-name">{{messageUI.selectUInfo.name}}</div>
            <div class="header-status">test</div>
        </div>
    </div>
    <ListMessageHolder />
    <ListMessageForm />
</template>
<style scoped>
.header{
    border-bottom: 1px solid var(--color-input);
    margin-top: 14px;
    padding-bottom: 0.4rem;
    display: flex;
    gap: 0.4rem;
}
.header-name{
    font-weight: bold;
    color:var(--color-input-lable-focus);
}
</style>