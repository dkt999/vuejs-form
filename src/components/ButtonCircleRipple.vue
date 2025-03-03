<template>
  <div class="icon" :class="{ clicked: isClicked }" @click="addRipple">
    <i :class="['mdi', icon]"></i>
    <span class="ripple" v-if="rippleActive" :style="rippleStyle"></span>
  </div>
</template>
  
  <script>
  export default {
    props: {
        icon: {
        type: String,
        required: true,
        },
    },
    data() {
      return {
        rippleActive: false,
        rippleStyle: {},
        isClicked: false, // Biến để đổi màu nền sau khi click
      };
    },
    methods: {
      addRipple(event) {
        // Xác định phần tử icon
        const target = event.currentTarget;
        if (!target) return; // Kiểm tra nếu target null để tránh lỗi
  
        // Lấy vị trí click và kích thước của icon
        const rect = target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
  
        // Thiết lập style cho hiệu ứng ripple
        this.rippleStyle = {
          width: `${size}px`,
          height: `${size}px`,
          left: `${x}px`,
          top: `${y}px`,
        };
  
        // Hiển thị hiệu ứng ripple
        this.rippleActive = true;
  
        // Xóa ripple sau 600ms và đổi màu nền
        setTimeout(() => {
          this.rippleActive = false;
          //this.isClicked = true; // Dùng biến để thay đổi class thay vì dùng `classList.add`
        }, 600);
      },
    },
  };
  </script>
  
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