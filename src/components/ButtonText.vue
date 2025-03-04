<script setup>
    const props = defineProps({
        label: String,
        class: {
            type: String,
            default: "md-primary",
        }
    });
</script>
<template>
    <div class="container">
        <button :class="['md-button', props.class]">{{ props.label }}</button>
    </div>
</template>
  
<style scoped>
.container{
  display:flex;
  width: fit-content;
}
  /* Button Styles */
.md-button {
  font-size: 16px;
  font-weight: 500;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  overflow: hidden; /* Quan trọng để giữ ripple trong nút */
  transition: background 0.3s, box-shadow 0.2s;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Button Variants */
.md-primary {
  background-color: #087FFF;
  color: white;
}
.md-secondary {
  background-color: #717981;
  color: white;
}
.md-danger {
  background-color: #DC3545;
  color: white;
}
.md-success {
  background-color: #28A745;
  color: white;
}
.md-warning {
  background-color: #FFC107;
  color: white;
}
.md-info {
  background-color: #17A2B8;
  color: white;
}
.md-outlined {
  border: 2px solid #6200ea;
  color: #6200ea;
  background: transparent;
}

.md-text {
  background: transparent;
  color: #6200ea;
}
  </style>