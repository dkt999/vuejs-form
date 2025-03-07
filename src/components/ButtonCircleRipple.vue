<script setup>
import { ref } from "vue";
import IconLogin from "./icons/iconLogin.vue";
import IconAccountPlus from "./icons/iconAccountPlus.vue";
import IconLogout from "./icons/iconLogout.vue";
import IconMessageBulleted from "./icons/iconMessageBulleted.vue";

// Nhận props từ cha
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
});

// State reactive
const rippleActive = ref(false);
const rippleStyle = ref({});
const isClicked = ref(false);

// Xử lý hiệu ứng ripple
const addRipple = (event) => {
  const target = event.currentTarget;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  rippleStyle.value = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${x}px`,
    top: `${y}px`,
  };

  rippleActive.value = true;

  setTimeout(() => {
    rippleActive.value = false;
  }, 600);
};
</script>
<template>
  <div class="icon" :class="{ clicked: isClicked }" @click="addRipple">
    <IconLogin v-if="icon === 'mdi-login'" />
    <IconAccountPlus v-if="icon === 'mdi-account-plus'" />
    <IconLogout v-if="icon === 'mdi-logout'" />
    <IconMessageBulleted v-if="icon === 'mdi-message-bulleted'" />
    <span class="ripple" v-if="rippleActive" :style="rippleStyle"></span>
  </div>
</template>
<style scoped>
.icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #333;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.0rem;
}

/* Khi click đổi màu */
.icon.clicked {
  background-color: #ff5722;
}

/* Tạo hiệu ứng ripple */
.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.6);
  transform: scale(0);
  animation: ripple-effect 0.6s linear;
}

/* Keyframe cho hiệu ứng */
@keyframes ripple-effect {
  to {
    transform: scale(4);
    opacity: 0;
  }
}
</style>