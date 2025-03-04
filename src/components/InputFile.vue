<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const MAX_FILE_SIZE = 0.5 * 1024 * 1024; // 2MB
const BLOCKED_EXTENSIONS = ["php", "exe", "com"];
const { t } = useI18n();
const props = defineProps({
  label: String,
  isRequired: {
    type: Boolean,
    default: false,
  },
  IsImage: {
    type: Boolean,
    default: false, // Nếu true, chỉ cho phép chọn ảnh
  },
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const fileInput = ref(null);
const selectedFile = ref(null);
const previewUrl = ref(null);
const isTouched = ref(false);

const errorMessage = computed(() => {
  if (props.isRequired && !selectedFile.value && isTouched.value) {
    return t("field_required");
  }
  if (selectedFile.value) {
    if (selectedFile.value.size > MAX_FILE_SIZE) {
      return t("0x0003:FILE_TOO_LARGE"); // " (>2MB)"
    }

    const fileExt = selectedFile.value.name.split(".").pop().toLowerCase();
    if (BLOCKED_EXTENSIONS.includes(fileExt)) {
      return t("0x0004:FILE_RETRICT"); // "File không được phép"
    }
  }
  return "";
});

// Khi nhấn vào, mở hộp chọn file
const triggerFileInput = () => {
  fileInput.value.click();
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedFile.value = file;
    emit("update:modelValue", file.name); // Cập nhật tên file

    // Nếu là ảnh, tạo URL preview
    if (props.IsImage) {
      previewUrl.value = URL.createObjectURL(file);
    }
  }
};

const onBlur = () => {
  isTouched.value = true;
};
</script>

<template>
  <div class="input-wrap">
    <div class="input-container" @click="triggerFileInput">
      <input
        ref="fileInput"
        type="file"
        class="hidden-input"
        :accept="IsImage ? 'image/*' : '*'"
        @change="handleFileChange"
        @blur="onBlur"
      />
      <label :class="{ active: selectedFile }">{{ label }}</label>
      <div class="file-info">
        <span v-if="selectedFile">{{ selectedFile.name }}</span>
      </div>
      <img v-if="IsImage && previewUrl" :src="previewUrl" alt="Preview" class="file-preview" />
    </div>
    <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<style scoped>
.input-wrap {
    height: 86px;
}
.input-container {
  position: relative;
  width: 100%;
  background-color: var(--color-input);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
  height: 56px;
}

.hidden-input {
  display: none;
}

.file-info {
  flex-grow: 1;
  padding-left: 10px;
  padding-top: 5px;
  font-size: 14px;
  color: var(--color-input-lable);
}

.placeholder {
  color: #aaa;
  font-size: 14px;
}

.file-preview {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-left: 10px;
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