<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
import { strongPasswordRegex } from "@/config"; // Import config
import { minimumPasswordLength } from "@/config"; // Import config
const props = defineProps({
  label: String,
  compareWith: String,
  isRequired:
  {
    type: Boolean,
    default: false,
  },
  isChecked:
  {
    type: Boolean,
    default: true,
  },
  modelValue: String,
});
const errorMessage = computed(() => {
  if(props.isRequired && props.modelValue.length === 0  && isTouched.value)
  {
    return t('field_required');
  }
  if(props.isChecked && props.modelValue.length > 0 && props.modelValue.length < minimumPasswordLength) {
    return t('password_is_not_requirement');
  }
  if(props.isChecked && !strongPasswordRegex.test(props.modelValue) && props.modelValue.length > 0)
  {
    return t('password_is_not_complexity');
  }
  if(props.compareWith !== undefined && props.compareWith !== props.modelValue && props.modelValue.length > 0){
    return t('password_is_not_matched');
  }
  return "";
});
const emit = defineEmits(["update:modelValue"]);
const isTouched = ref(false);
const inputValue = ref(""); // Tạo state local
const isFilled = computed(() => inputValue.value.length > 0);
const showPassword = ref(false);
const onInput = (event) => {
  inputValue.value = event.target.value;
  emit("update:modelValue", inputValue.value, errorMessage); //
};
const onBlur = () => {
  isTouched.value = true; // Đánh dấu input đã được focus
};
</script>

<template>
  <div class="input-wrap">
    <div class="input-container">
      <input
        :type="showPassword ? 'text' : 'password'"
        :value="inputValue"
        @input="onInput"
        @blur="onBlur"
        placeholder=" "
      />
      <label :class="{ active: isFilled }">{{ label }}</label>
      <i :class="['mdi',  showPassword ? 'mdi-eye-off' : 'mdi-eye']" @click="showPassword = !showPassword"></i>
    </div>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
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
