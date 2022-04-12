<template>
  <label class="input-label" :class="{ error: error }" :for="placeholder">
    <span class="icon">
      <slot />
    </span>
    <input
      :placeholder="placeholder"
      class="input"
      :id="placeholder"
      :type="typeValue"
      :value="value"
      @input="onInput($event)"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </label>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Input",
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    typeValue: {
      type: String,
      default: "text",
    },
    error: {
      type: String,
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
.input-label {
  position: relative;
  font-family: "Roboto";
  font-weight: 400;

  &.error {
    .input {
      border-color: $InputError;

      &:focus {
        outline-color: $InputError;
      }
    }
  }

  .icon {
    position: absolute;
    top: 2px;
    left: 10px;
    width: 13px;
    height: 14px;

    :deep(path) {
      fill: $InputPlaceholder;
    }
  }

  .input {
    width: 100%;
    height: 100%;
    border-radius: 6px;
    padding: 12px 0 12px 29px;
    border: 1px solid $InputBorder;

    font-size: 14px;
    line-height: 114%;

    &::placeholder {
      color: $InputPlaceholder;
    }

    &:focus {
      outline: 1px solid $InputBorderHover;
    }
  }

  .error {
    margin-top: 1px;

    font-size: 10px;
    line-height: 120%;
    color: $InputError;
  }

  @media ($laptop) {
    &:hover {
      .input {
        border: 1px solid $InputBorderHover;
      }
    }
  }
}
</style>