<template>
  <label class="input-label" :class="{ error: error }" :for="placeholder">
    <span class="icon">
      <slot />
    </span>
    <input
      :placeholder="placeholder"
      class="input"
      :id="placeholder"
      type="text"
      v-model="message"
    />
    <p v-if="error" class="error">{{ error }}</p>
  </label>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Input",
  components: {},
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    error: {
      type: String,
    },
  },
  setup() {
    const message = ref("");

    return {
      message,
    };
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