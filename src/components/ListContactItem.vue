<script setup>
    import { useAuthStore } from '@/stores/auth';
    import ButtonImageCircle from '@/components/ButtonImageCircle.vue';
    const authStore = useAuthStore();
    const emit = defineEmits(['click']);
    const handleClick = () => {
        emit('click'); // Phát sự kiện click lên component cha
    };
</script>
<template>
    <div @click="handleClick" :class="['item', $attrs.class]">
        <div class="item-inner">
            <div class="image">
                <ButtonImageCircle v-if="authStore.isAuthenticated" :src="authStore.user.avatar"></ButtonImageCircle>
            </div>
            <div class="item-profile">
                <div class="name">Đinh Kim Thạch</div>
                <div class="text-mute">Idle</div>
            </div>
        </div>
        
    </div>
</template>
<style>
.image{
    width: 56px;
    margin-left: 0.4rem;
}
.item{
    margin-bottom: 8px;
    display: flex;
    cursor: pointer;
    
}
.item:hover{
    background-color: var(--item-list-select); 
}
.item-select {
    background-color: var(--item-list-select); /* Ví dụ CSS */
}
.item-select .name{
    font-weight: bold;
    color:var(--color-input-lable-focus);
}
.item-inner{
    display: flex;
    margin-top: 0.4rem;
    margin-bottom: 0.4rem;
}
.name{
    color: var(--vt-c-text-dark-2);
    
    font-size: 1rem;
}
.text-mute{
    font-size: 0.8rem;
}
</style>
