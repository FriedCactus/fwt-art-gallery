<template>
  <label
    class="input-label"
    :class="{ error: error, [style]: style }"
    :for="placeholder"
  >
    <span class="icon" v-if="style === ('icon' || 'icon-alt')">
      <slot />
    </span>
    <p class="title" v-if="style === 'label'">
      {{ placeholder }}<span class="required" v-if="required">*</span>
    </p>

    <input
      :placeholder="style === ('icon' || 'icon-alt') ? placeholder : ''"
      class="input"
      :id="placeholder"
      :type="typeValue"
      :value="value"
      @input="onInput($event)"
      :required="required"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </label>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

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
    required: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String as PropType<"icon" | "icon-alt" | "label">,
      default: "icon",
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.input-label {
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: "Roboto";
  font-weight: 400;

  &.icon {
    .input {
      padding: 12px 0 12px 29px;
    }
  }

  &.icon-alt {
    .input {
      padding: 12px 32px 12px 12px;
    }
  }

  &.label {
    .input {
      padding: 12px;
    }
  }

  &.error {
    .input {
      border-color: $InputError;

      &:focus {
        outline-color: $InputError;
      }
    }

    .title {
      .required {
        color: $InputError;
      }
    }
  }

  .title {
    margin-bottom: 5px;

    font-weight: 400;
    font-size: 12px;
    line-height: 116%;
    color: $InputPlaceholder;
  }

  .icon {
    position: absolute;
    top: calc(50% - 7px);
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