<script setup>
    import IconRender from "./IconRender.vue";
    const props = defineProps({
        modelValue: String,
        placeholder: String,
        icon:String
    });
    defineEmits(['update:modelValue']);
</script>
<template>
    <div class="wrapper">
        <input 
        type="text" 
        :placeholder="props.placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
        <div class="mdi-right">
            <IconRender :icon="props.icon" v-if="props.icon"/>
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
    margin-top: 6px;
    margin-right: .6rem;
}
</style>