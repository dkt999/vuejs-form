<template>
    <div class="message-form">
      <div
        ref="editor"
        class="editor"
        contenteditable="true"
        @input="updateMessage"
        @keydown.enter.prevent="send"
      ></div>
      <button @click="insertEmoji(':D')">😀</button>
      <button @click="insertEmoji(':)')">😊</button>
      <button @click="insertEmoji('<3')">❤️</button>
      <button @click="send">Gửi</button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits, nextTick } from "vue";
  
  const editor = ref(null);
  const emit = defineEmits(["send"]);
  let message = ""; // Dùng để lưu trữ tin nhắn
  
  const send = () => {
    if (message.trim()) {
      emit("send", message);
      editor.value.innerHTML = ""; // Xóa nội dung sau khi gửi
      message = "";
    }
  };
  
  // Thay đổi nội dung khi nhập
  const updateMessage = () => {
    message = editor.value.innerHTML;
  };
  
  // Thêm emoji dưới dạng hình ảnh
  const insertEmoji = (shortcode) => {
    const emojiMap = {
      ":D": "/emoji/dog.GIF",
      ":)": "/emoji/dragon.GIF",
      "<3": "/emoji/heart-exclamation.png",
    };
    
    if (!emojiMap[shortcode]) return;
  
    const imgTag = `<img src="${emojiMap[shortcode]}" class="emoji">`;
    editor.value.innerHTML += imgTag;
    message += shortcode;
  
    nextTick(() => {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(editor.value);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    });
  };
  </script>
  
  <style scoped>
  .message-form {
    display: flex;
    align-items: center;
    padding: 10px;
    border-top: 1px solid #ddd;
    background: white;
  }
  
  .editor {
    flex: 1;
    min-height: 40px;
    max-height: 150px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 8px;
    border-radius: 5px;
    resize: none;
    outline: none;
    white-space: pre-wrap;
  }
  
  .emoji {
    width: 20px;
    height: 20px;
    vertical-align: middle;
  }
  
  button {
    margin-left: 5px;
    background: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>