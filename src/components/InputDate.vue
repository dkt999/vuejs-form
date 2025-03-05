<script setup>
import { useI18n } from "vue-i18n";
import { ref, computed } from "vue";
const { t, locale } = useI18n();
const props = defineProps({
  label: String,
  compareWith: String,
  isRequired:Boolean,
  modelValue: String,
});
const errorMessage = computed(() => {
  if(props.isRequired && props.modelValue.length === 0  && isTouched.value)
  {
    return t('field_required');
  }
  return "";
});
const emit = defineEmits(["update:modelValue", "update:vaildationError"]);
const inputValue = ref(""); // Tạo state local
const isTouched = ref(false); // Biến để xác định input đã được focus chưa
const isFilled = computed(() => inputValue.value.length > 0);
const onInput = (event) => {
  inputValue.value = event.target.value;
  emit("update:modelValue", inputValue.value);
};
const onBlur = () => {
  isTouched.value = true; // Đánh dấu input đã được focus
};
const openDatePicker = () => {
  const dateInput = document.getElementById("date-picker");
  if (dateInput) {
    dateInput.showPicker();
  }
};
</script>

<template>
  <div class="input-wrap" @click="openDatePicker">
    <div class="input-container">
      <input
        id="date-picker"
        :value="inputValue"
        type="date"
        @input="onInput"
        @blur="onBlur"
        placeholder=""
        :class="[{dateshow: inputValue}]"
      />
      <label :class="{ active: isFilled }">{{ label }}</label>
      <i :class="['mdi', 'mdi-calendar']"></i>
    </div>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
/* Ẩn icon lịch mặc định */
input::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
input::-webkit-datetime-edit {
    display: none;
}
.dateshow::-webkit-datetime-edit {
    display: inline-block;
    font-family: sans-serif;
}
/* Ẩn placeholder mặc định */
.input-wrap{
  height: 86px;
}
.input-container {
  position: relative;
  width: 100%;
  background-color: var(--color-input);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
}
.mdi{
  line-height: 56px;
  margin-right: 17px;
  margin-top: 0px;
}
.input-container input {
  width: 100%;
  padding: 18px 14px 4px;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: var(--color-input);
  color: var(--color-input-lable-focus);
  border:none;
  height: 56px;
}
.input-container:focus-within {
    background-color: var(--color-input-focus); /* Màu nền khi input bên trong được focus */
}
.input-container input:focus {
  background-color: var(--color-input-focus);
}
.input-container label {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: var(--color-input-lable);
  padding: 0 5px;
  transition: all 0.1s ease-in-out;
  pointer-events: none;
}

.input-container input:focus + label,
.input-container label.active {
  top: 10px;
  font-size: 10px;
  color: var(--color-input-lable-focus);
}

.error-message {
  color: #D84040;
  font-size: 12px;
  margin-top: 5px;
  margin-left: 14px;
}
</style>
