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

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Textarea",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    onInput: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
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
    color: $InputPlaceholder;
    margin-bottom: 5px;
  }

  .textarea {
    flex: 1 1 auto;
    border: 1px solid $InputPlaceholder;
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