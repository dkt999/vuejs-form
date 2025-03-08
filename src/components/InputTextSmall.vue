<script setup>
    import { useI18n } from "vue-i18n";
import IconMagnify from "./icons/iconMagnify.vue";
import IconRender from "./IconRender.vue";
    const { t, locale } = useI18n();
    const props = defineProps(['placeholder'])
</script>
<template>
    <div class="wrapper">
        <div></div>
        <input type="text" :placeholder="props.placeholder">
        <div class="mdi-right">
            <IconRender icon="mdi-magnify" />
        </div>
    </div>
</template>
<style scoped>
input {
  width: 100%;
  padding: 0.8rem;
  font-size: 16px;
  border-radius: 4px;
  outline: none;
  transition: border-color 0.3s;
  background-color: var(--color-input);
  color: var(--color-input-lable-focus);
  border:none;
}
.wrapper{
    display: flex;
    align-items: center;
    background-color: var(--color-input);
    border-radius: 4px;
    overflow: hidden;
    margin-left: 8px;
    margin-right: 0.6rem;
}
.mdi-right{
    margin-right: .6rem;
}
</style>