<template>
  <label :for="placeholder" class="textarea-label">
    <div class="label">{{ placeholder }}</div>
    <textarea
      :id="placeholder"
      class="textarea"
      :value="value"
      @input="onInput($event)"
    />
  </label>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  placeholder: string;
  value: string;
  onInput: (e: Event) => void;
}>();
</script>

<style lang="scss" scoped>
.textarea-label {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  font-weight: 400;

  .label {
    font-size: 12px;
    line-height: 116%;
    color: $TextareaPlaceholder;
    margin-bottom: 5px;
  }

  .textarea {
    flex: 1 1 auto;
    border: 1px solid $TextareaPlaceholder;
    border-radius: 6px;
    padding: 12px;
    resize: none;

    font-size: 14px;
    line-height: 114%;

    @media ($laptop) {
      &:hover {
        border: 1px solid $black;
      }
    }
  }
}
</style>