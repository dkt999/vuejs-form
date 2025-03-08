import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMessageUI = defineStore('messageUI', () => {
  const messageUISlide = ref(sessionStorage.getItem('useMessageUI.messageUISlide'));
  const toggleSlide = () => { 
    messageUISlide.value = !messageUISlide.value;
    sessionStorage.setItem('useMessageUI.messageUISlide', messageUISlide.value);
  }
  return { messageUISlide, toggleSlide}
})