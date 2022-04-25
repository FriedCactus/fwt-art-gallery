<template>
  <label
    class="input-label"
    :class="{ error: error, [style]: style, [theme]: theme }"
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
  </label>
  <p v-if="error" class="error">{{ error }}</p>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, PropType } from "vue";

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
    const store = useStore();

    const theme = computed(() => store.state.settings.theme);

    return {
      theme,
    };
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
  }

  .icon {
    position: absolute;
    top: calc(50% - 7px);
    left: 10px;
    width: 13px;
    height: 14px;

    :deep(path) {
    }
  }

  .input {
    width: 100%;
    height: 100%;
    border-radius: 6px;

    font-size: 14px;
    line-height: 114%;

    &::placeholder {
    }

    &:focus {
    }
  }

  &.dark {
    .title {
      color: $InputPlaceholderDark;
    }

    .icon {
      :deep(path) {
        fill: $InputPlaceholderDark;
      }
    }

    .input {
      border: 1px solid $InputBorderDark;
      background-color: $black;
      color: $InputPlaceholderDark;

      &::placeholder {
        color: $InputPlaceholderDark;
      }

      &:focus {
        outline: 1px solid $InputBorderHoverDark;
      }
    }
  }

  &.light {
    .title {
      color: $InputPlaceholderLight;
    }

    .icon {
      :deep(path) {
        fill: $InputPlaceholderLight;
      }
    }

    .input {
      border: 1px solid $InputBorderLight;
      background-color: $white;
      color: $InputPlaceholderLight;

      &::placeholder {
        color: $InputPlaceholderLight;
      }

      &:focus {
        outline: 1px solid $InputBorderHoverLight;
      }
    }
  }

  @media ($laptop) {
    &.light {
      &:hover {
        .input {
          border: 1px solid $InputBorderHoverLight;
        }
      }
    }

    &.dark {
      &:hover {
        .input {
          border: 1px solid $InputBorderHoverDark;
        }
      }
    }
  }
}

.error {
  margin-top: 1px;

  font-size: 10px;
  line-height: 120%;
  color: $InputError;
}
</style>