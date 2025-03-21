<script setup>
import { ref, reactive, onMounted, nextTick, watch } from "vue";
import ListContactItem from '@/components/ListContactItem.vue';
import ListContactTopPanel from "./ListContactTopPanel.vue";
import { useMessageUI } from '@/stores/messageUI';
import { useContactStore } from '@/stores/contactStore';
import socket from "@/plugins/socket";
const emit = defineEmits(['update-room']);
const messageUI = useMessageUI();
const isScrollbarVisible = ref(false);
const scrollContainer = ref(null);
const hideTimeout = ref(null);
const hasOverflow = ref(false);
const serverAPI = import.meta.env.VITE_SERVER_API;
const contactStore = useContactStore();
const contacts = ref([]);
const updateContactList = (newContacts) => {
    console.log('update')
    contacts.value = newContacts;
};
const state = reactive({
    u_id: null
});
const selectItem = (index, contact) => {
  state.u_id = index;
  messageUI.selectUser(contact);
};
//Xử lý ẩn hiện thanh scroll
const showScrollbar = () => {
    checkOverflow();
    if (!hasOverflow.value) return; 
    isScrollbarVisible.value = true;
    clearTimeout(hideTimeout.value);
    hideTimeout.value = setTimeout(() => {
        isScrollbarVisible.value = false;
    }, 500);
};
const checkOverflow = () => {
  if (scrollContainer.value) {
    hasOverflow.value = scrollContainer.value.scrollHeight > scrollContainer.value.clientHeight;
  }
};
onMounted(async () => {
  nextTick(checkOverflow);
  await contactStore.initContactList(); // Chờ request hoàn thành
  updateContactList(contactStore.contacts);
  //Socket manager
  socket.on("new-contact-request", (data) => {
    contactStore.addNewContact(data);  
    contactStore.initContactList();
    emit("update-room");
  });
});
watch(() => [contactStore.contacts], () => {
    updateContactList(contactStore.contacts);
}, { immediate: true });
</script>

<template>
    <div class="list-contact">
        <ListContactTopPanel @update-list="updateContactList" @reset-selected="state.u_id = null" />
        <div class="seperator"></div>
        <div class="scroll-wrapper">
            <div class="scroll-container"
                ref="scrollContainer" 
                @scroll="showScrollbar" 
                @mouseenter="showScrollbar"
                @mousemove="showScrollbar">
                <ListContactItem 
                    v-for="(contact, index) in contacts"
                    :key="index"
                    :class="{ 'item-select': state.u_id === contact.id }"
                    @click="selectItem(contact.id, contact);"
                    :contact="contact"
                />
            </div>
            <div class="scroll-cover" :class="{ visible: isScrollbarVisible }"></div>
        </div> 
    </div>
</template>
<style scoped>
.seperator{
    height: 0.8rem;
}
.list-contact{
    width: 350px;
}
.scroll-wrapper{
    width: 100%;
    position: relative;
}
.scroll-container{
    width: 100%;
    padding-top: 8px;
    height: calc(100vh - 132px);
    overflow-y: auto;
}
::-webkit-scrollbar {
    width: 0.6rem; 
}
::-webkit-scrollbar-track {
    background: var(--vt-c-black);
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    border: 8px solid transparent; /* Border 8px ở 2 đầu */
    background-clip: padding-box;
    background: var(--vt-c-black-soft);
}
.scroll-container:hover {
    overflow-y: auto;
}
/* Lớp cover che scrollbar */
.scroll-cover {
  position: absolute;
  right: 0;
  top: 0;
  width: 0.6rem;
  height: 100%;
  background: var(--vt-c-black); /* Màu nền che scrollbar */
  transition: opacity 0.2s ease-in-out;
  pointer-events: none; /* Cho phép thao tác xuyên qua */
  opacity: 1;
}

/* Khi isScrollbarVisible = true, scrollbar hiện lên */
.scroll-cover.visible {
  opacity: 0;
}
</style>