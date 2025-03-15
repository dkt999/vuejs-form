<script setup>
    import { ref } from "vue";
    const isScrollbarVisible = ref(false);
    const scrollContainer = ref(null);
    const hideTimeout = ref(null);
    const hasOverflow = ref(false);
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
</script>
<template>
    <div class="scroll-wrapper">
        <div class="scroll-container"
            ref="scrollContainer" 
            @scroll="showScrollbar" 
            @mouseenter="showScrollbar"
            @mousemove="showScrollbar">
            <div v-for="n in 30">d</div>
        </div>
        <div class="scroll-cover" :class="{ visible: isScrollbarVisible }"></div>
    </div> 
</template>
<style scoped>
.scroll-wrapper{
    width: 100%;
    position: relative;
}
.scroll-container{
    width: 100%;
    padding-top: 8px;
    height: calc(500px);
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