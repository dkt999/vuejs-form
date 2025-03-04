<script setup>
  import { useModalStore } from '@/stores/modal'
  import ButtonIcon from '@/components/ButtonIcon.vue';
  const modalStore = useModalStore();
</script>
<template>
  <div :class="['overlay', { show: modalStore.mainPopupState }]">
    <div class="overlay-wrapper">
      <div class="modal">
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
  }
  .close{
    cursor: pointer;
  }
</style>