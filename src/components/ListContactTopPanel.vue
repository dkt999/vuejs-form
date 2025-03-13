<script setup>
    import ButtonImageCircle from '@/components/ButtonImageCircle.vue';
    import { useAuthStore } from '@/stores/auth';
    import InputTextSmall from './InputTextSmall.vue';
    import { useI18n } from "vue-i18n";
    import { ref, watch } from 'vue';
    const { t, locale } = useI18n();
    //Lấy settings
    const serverAPI = import.meta.env.VITE_SERVER_API;
    const authStore = useAuthStore();
    //Xử lí gọi api
    const searchText = ref('');
    const emit = defineEmits(['update-list']);
    // Gọi API mỗi khi giá trị searchText thay đổi
    watch(searchText, async (newValue) => {
        if (!newValue.trim()) {
            try {
                const response = await fetch(`${serverAPI}/contacts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Thêm Bearer Token
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                emit('update-list', data);
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
            return;
        }
        try {
            const response = await fetch(`${serverAPI}/contacts/search?query=${newValue}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Thêm Bearer Token
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            emit('update-list', data);
           
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
        }
    });
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
            <InputTextSmall  
            v-model="searchText"  
            :placeholder="t('enter_to_search')" 
            :icon="'mdi-magnify'"/>
        </div>
    </div>
</template>
<style>
.wrapper{
    margin-top: 14px;
}
</style>