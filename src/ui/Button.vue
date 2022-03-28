<template>
  <button class="button" :class="[theme, style]" @click="onClick">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  props: {
    theme: {
      type: String,
      default: "dark",
    },
    style: {
      type: String,
      default: "filled",
    },
    onClick: {
      type: Function,
      default: () => {},
    },
  },
});
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  border: none;
  outline: none;

  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  line-height: 114%;

  transition: all 0.3s ease;

  &.dark {
    &.filled {
      color: $ButtonTextDark;
      background-color: $ButtonBackgroundDark;
    }

    &.outlined {
      border: 1px solid $ButtonBorderDark;
      background-color: $ButtonOutlinedBackgroundDark;
      color: $ButtonOutlinedTextDark;
    }
  }

  &.light {
    &.filled {
      color: $ButtonTextLight;
      background-color: $ButtonBackgroundLight;
    }

    &.outlined {
      border: 1px solid $ButtonBorderLight;
      background-color: $ButtonOutlinedBackgroundLight;
      color: $ButtonOutlinedTextLight;
    }
  }

  @media ($laptop) {
    &:hover {
      &.dark {
        &.filled {
          background-color: $ButonFilledBackgroundDark;
        }

        &.outlined {
          color: $ButtonOutlinedHoveredColorDark;
          border-color: $ButtonOutlinedHoveredColorDark;
        }
      }

      &.light {
        &.filled {
          background-color: $ButonFilledBackgroundLight;
        }

        &.outlined {
          color: $ButtonOutlinedHoveredColorLight;
          border-color: $ButtonOutlinedHoveredColorLight;
        }
      }
    }
  }

  &:active {
    &.dark {
      &.filled {
        background-color: $ButonFilledBackgroundDark;
      }

      &.outlined {
        color: $ButtonOutlinedHoveredColorDark;
        border-color: $ButtonOutlinedHoveredColorDark;
      }
    }

    &.light {
      &.filled {
        background-color: $ButonFilledBackgroundLight;
      }

      &.outlined {
        color: $ButtonOutlinedHoveredColorLight;
        border-color: $ButtonOutlinedHoveredColorLight;
      }
    }
  }
}
</style>
