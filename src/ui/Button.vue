<template>
  <button
    type="button"
    class="button"
    :class="[theme, style]"
    @click="onClick()"
  >
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed, defineProps, PropType } from "vue";

const props = defineProps({
  style: {
    type: String,
    default: "filled",
  },
  staticTheme: {
    type: String as PropType<"dark" | "light">,
  },
  onClick: {
    type: Function,
    default: () => {},
  },
});

const store = useStore();

const theme = computed(() => props.staticTheme || store.state.settings.theme);
</script>

<style lang="scss" scoped>
.button {
  cursor: pointer;
  width: 100%;
  height: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  outline: none;

  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  text-transform: uppercase;

  transition: all 0.3s ease;

  :slotted(svg) {
    path {
      transition: fill 0.3s ease;
    }
  }

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

    &.text {
      border: none;
      background-color: transparent;
      color: $ButtonOutlinedTextDark;
    }

    :slotted(svg) {
      path {
        fill: $ButtonOutlinedTextDark;
      }
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

    &.text {
      border: none;
      background-color: transparent;
      color: $ButtonOutlinedTextLight;
    }

    :slotted(svg) {
      path {
        fill: $ButtonOutlinedTextLight;
      }
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

        &.text {
          color: $ButtonOutlinedHoveredColorDark;
        }

        :slotted(svg) {
          path {
            fill: $ButtonOutlinedHoveredColorDark;
          }
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

        &.text {
          color: $ButtonOutlinedHoveredColorLight;
        }

        :slotted(svg) {
          path {
            fill: $ButtonOutlinedHoveredColorLight;
          }
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

      &.text {
        color: $ButtonOutlinedHoveredColorDark;
      }

      :slotted(svg) {
        path {
          fill: $ButtonOutlinedHoveredColorDark;
        }
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

      &.text {
        color: $ButtonOutlinedHoveredColorLight;
      }

      :slotted(svg) {
        path {
          fill: $ButtonOutlinedHoveredColorLight;
        }
      }
    }
  }

  &:disabled {
    cursor: default;

    &.dark {
      background-color: $ButonFilledBackgroundDark;
    }

    &.light {
      background-color: $ButonFilledBackgroundLight;
    }
  }
}
</style>
