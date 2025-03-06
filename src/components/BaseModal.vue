<script setup>
  import { ref } from 'vue';
  import { useModalStore } from '@/stores/modal'
  import ButtonIcon from '@/components/ButtonIcon.vue';
  const modalStore = useModalStore();
  const overlayClicked = ref(false);
  const handleOverlayClick = () => {
    overlayClicked.value = true;
    setTimeout(() => {
      overlayClicked.value = false;
    }, 300); // Duration of animation
  };
</script>
<template>
  <div :class="['overlay', { show: modalStore.mainPopupState, clicked: overlayClicked }]" @click="handleOverlayClick">
    <div class="overlay-wrapper">
      <div class="modal" @click.stop>
        <div class="title">
          <div class="text">{{ modalStore.mainPopupTitle }}</div>
          <div class="close"  @click="modalStore.toggleState"><ButtonIcon :icon="'mdi-close'" /></div>
        </div>
        <component :is="modalStore.mainPopupComponent" v-if="modalStore.mainPopupComponent" />
      </div>
    </div>
  </div>
</template>
<style scoped>
  .show{
    display: flex !important;
  }
  .overlay{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    background-color: var(--color-background-overlay);
    display: none;
  }
  .overlay-wrapper{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal{
    border-radius: 8px;
    background-color: var(--color-background-soft);
    max-height: 80vh;
    width: 400px;
    overflow: hidden;
    overflow-y: auto;
    margin-left: 56px;
  }
  .title{
    background-color: var(--color-background);
    width: 100%;
    padding: 0.8rem;
    display: flex;
    justify-content: space-between; 
    align-items: center;
  }
  .text{
    flex-grow: 1;
    font-size: 19px;
  }
  .close{
    cursor: pointer;
  }
  @keyframes focusModal {
    0% {
      transform: scale(1);
      /*box-shadow: 0 0 0px rgba(255, 255, 255, 0);*/
    }
    50% {
      transform: scale(1.05);
      /*box-shadow: 0 0 2px rgba(204, 204, 204, 1);*/
    }
    100% {
      transform: scale(1);
      /*box-shadow: 0 0 0px rgba(255, 255, 255, 0);*/
    }
  }
  .overlay.clicked .modal {
    animation: focusModal 0.3s ease-in-out;
  }
</style>