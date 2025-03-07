import { ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const mainPopupState = ref(false);
  const mainPopupTitle = ref('');
  const mainPopupComponent = shallowRef(null);
  const toggleState = (title, component) => { 
    mainPopupState.value = !mainPopupState.value;
    mainPopupTitle.value = title;
    mainPopupComponent.value = component;
  }
  const closeModal = () => {
    mainPopupState.value = false;
  }
  return { mainPopupState, mainPopupTitle, mainPopupComponent, toggleState, closeModal }
})