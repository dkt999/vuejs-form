<script setup>
import { ref, nextTick } from "vue";

const notifications = ref([]);
const maxNotifications = 5;

// Hàm hiển thị toast
const showToast = async (message) => {
  const id = Date.now();
  notifications.value.push({ id, message, show: false, fadeOut: false });

    // Đợi Vue cập nhật DOM xong rồi thêm class slide-in
    await nextTick();
    const toast = notifications.value.find((t) => t.id === id);
    if (toast) {
        const toastEl = document.querySelectorAll('.toast')[notifications.value.findIndex((t) => t.id === id)];
        if (toastEl) {
            toastEl.offsetHeight; // Ép trình duyệt cập nhật layout
        }
        toast.show = true;
    }
    // Tự động ẩn sau 3 giây
    setTimeout(() => removeToast(id), 3000);
    // Giữ tối đa 5 thông báo, xóa cái đầu tiên nếu quá giới hạn
    if (notifications.value.length > maxNotifications) {
        removeToast(notifications.value[0].id);
    }
};

// Hàm xóa thông báo
const removeToast = (id) => {
  const index = notifications.value.findIndex((toast) => toast.id === id);
  if (index !== -1) {
    notifications.value[index].fadeOut = true;
    setTimeout(() => {
      notifications.value.splice(index, 1);
    }, 500); // Chờ animation fade-out hoàn tất
  }
};

// Expose showToast để gọi từ bên ngoài
defineExpose({ showToast });
</script>

<template>
  <div class="toast-container">
    <div
      v-for="toast in notifications"
      :key="toast.id"
      class="toast"
      :class="{ 'slide-in': toast.show, 'fade-out': toast.fadeOut }"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<style scoped>
/* Container của toast */
.toast-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

/* Toast Notification */
.toast {
  min-width: 250px;
  padding: 12px 20px;
  background: #333;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateX(200px); /* Toast bắt đầu ở ngoài màn hình */
  transition: transform 0.2s ease-out, opacity 0.5s ease-out;
}

.slide-in {
  opacity: 1;
  transform: translateX(0); /* Khi thêm class này, toast sẽ trượt vào */
}
/* Ẩn toast với fade-up */
.fade-out {
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}
</style>