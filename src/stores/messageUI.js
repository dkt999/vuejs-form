import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageUI = defineStore('messageUI', () => {
  const messageUISlide = ref(sessionStorage.getItem('useMessageUI.messageUISlide'));
  const selectUId = ref(null);
  const toggleSlide = () => { 
    messageUISlide.value = !messageUISlide.value;
    sessionStorage.setItem('useMessageUI.messageUISlide', messageUISlide.value);
  }
  const selectUser = (selectUIdInput) => {
    selectUId.value = selectUIdInput;
  } 
  return { messageUISlide, toggleSlide, selectUser, selectUId}
})