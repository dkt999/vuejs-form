import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageUI = defineStore('messageUI', () => {
  const messageUISlide = ref(sessionStorage.getItem('useMessageUI.messageUISlide'));
  const selectUId = ref(null);
  const selectUInfo = ref(null);
  const toggleSlide = () => { 
    messageUISlide.value = !messageUISlide.value;
    console.log(messageUISlide.value);
    sessionStorage.setItem('useMessageUI.messageUISlide', messageUISlide.value);
  }
  const selectUser = (userInfo) => {
    selectUId.value = userInfo.id;
    selectUInfo.value = userInfo;
  } 
  return { messageUISlide, toggleSlide, selectUser, selectUId, selectUInfo}
})