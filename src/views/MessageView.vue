<script setup>
    import ListContact from '@/components/ListContact.vue';
    import ListMessage from '@/components/ListMessage.vue';
    import { useMessageUI } from '@/stores/messageUI'
    const messageUI = useMessageUI();
</script>
<template>
    <div class="message-wrapper">
        <ListContact />
        <ListMessage :uid="messageUI.selectUId" />
    </div>
</template>
<style scoped>
.message-wrapper{
    display: flex;
}
</style>