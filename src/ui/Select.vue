<template>
  <div
    class="select-container"
    :class="{ [theme]: theme, [style]: style, open: isOpen }"
    @click="toggleIsOpen"
    @keyup.enter="toggleIsOpen"
  >
    <div class="placeholder" v-if="style === 'label'">
      {{ placeholder }}{{ required ? "*" : "" }}
    </div>
    <div class="select">
      <div class="selected-options" v-if="values.length">
        <div class="option" v-for="value in values" :key="value">
          <span class="text">{{ value }}</span>
          <button @click.stop="onRemoveCLick(value)" class="remove-button">
            <CloseIcon />
          </button>
        </div>
      </div>
      <div class="text" else>{{ style !== "label" ? placeholder : "" }}</div>

      <span class="icon">
        <TriangleIcon />
      </span>

      <ul class="menu" v-if="isOpen">
        <li
          class="menu-item"
          :class="{ active: values.includes(option.name) }"
          v-for="option in options"
          :key="option._id"
        >
          <button class="button-check">
            <CheckIcon />
          </button>
          <span class="text">{{ option.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, PropType, ref } from "vue";
import TriangleIcon from "@/assets/icons/triangle.svg";
import CloseIcon from "@/assets/icons/close-icon.svg";
import CheckIcon from "@/assets/icons/check-icon.svg";

type TOption = {
  _id: string;
  name: string;
};

export default defineComponent({
  name: "Select",
  components: { TriangleIcon, CloseIcon, CheckIcon },
  props: {
    placeholder: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    style: {
      type: String as PropType<"default" | "label">,
      default: "defalut",
    },
    staticTheme: {
      type: String as PropType<"light" | "dark">,
    },
    options: {
      type: Array as PropType<TOption[]>,
      required: true,
    },
    values: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const onRemoveCLick = (value: string) => {};

    const isOpen = ref<boolean>(false);

    const toggleIsOpen = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      theme: computed(() => props.staticTheme || store.state.settings.theme),
      isOpen,
      toggleIsOpen,
      onRemoveCLick,
    };
  },
});
</script>

<style lang="scss" scoped>
.select-container {
  width: 100%;
  height: 100%;

  .placeholder {
    margin-bottom: 5px;

    font-weight: 400;
    font-size: 12px;
    line-height: 112%;
    color: $InputPlaceholder;
  }

  .select {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 15px 12px;

    border-radius: 8px;

    .selected-options {
      display: flex;
      flex-wrap: wrap;
      flex: 1 1 auto;

      font-weight: 400;
      font-size: 14px;
      line-height: 114%;

      .option {
        display: flex;
        align-items: center;
        margin-right: 12px;
        margin-bottom: 5px;

        &:last-child {
          margin-right: 0;
        }

        .text {
          margin-right: 6px;
        }

        .remove-button {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          outline: none;

          border-radius: 50%;
          width: 18px;
          height: 18px;
          background-color: $darkGrey;

          svg {
            width: 6px;
          }
        }
      }
    }

    .text {
      flex: 1 1 auto;
    }

    .icon {
      flex: 0 0 auto;
      width: 10px;
      margin-left: 5px;

      svg {
        transition: 0.3s ease;
      }
    }

    .menu {
      position: absolute;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 200px;

      overflow-y: auto;

      padding: 20px 15px;

      border-radius: 0 0 8px 8px;

      .menu-item {
        display: flex;
        align-items: center;
        list-style: none;
        margin-bottom: 20px;

        font-weight: 500;
        font-size: 16px;
        line-height: 118%;

        &:last-child {
          margin-bottom: 0;
        }

        .button-check {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 14px;
          height: 14px;
          border-radius: 3px;
          border: 1px solid transparent;

          background: transparent;
          outline: none;
          margin-right: 11px;
        }

        .text {
        }
      }
    }
  }

  &.open {
    .select {
      border-radius: 8px 8px 0 0;

      .icon {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  &.dark {
    .select {
      box-shadow: -1px 0px 0px 0px $SelectBorderDark,
        1px 0px 0px 0px $SelectBorderDark, 0px -1px 0px 0px $SelectBorderDark,
        0px 1px 0px 0px $SelectBorderDark;
      background-color: $black;

      &:hover {
        box-shadow: -1px 0px 0px 0px $SelectBorderHoverDark,
          1px 0px 0px 0px $SelectBorderHoverDark,
          0px -1px 0px 0px $SelectBorderHoverDark,
          0px 1px 0px 0px $SelectBorderHoverDark;

        .menu {
          box-shadow: -1px 0px 0px 0px $SelectBorderHoverDark,
            1px 0px 0px 0px $SelectBorderHoverDark,
            0px -1px 0px 0px $SelectBorderDark,
            0px 1px 0px 0px $SelectBorderHoverDark;
        }
      }

      .selected-options {
        .option {
          color: $white;
        }
      }

      .icon {
        svg {
          :deep(path) {
            fill: $SelectBorderDark;
          }
        }
      }

      .menu {
        background-color: $black;

        box-shadow: -1px 0px 0px 0px $SelectBorderDark,
          1px 0px 0px 0px $SelectBorderDark, 0px -1px 0px 0px $SelectBorderDark,
          0px 1px 0px 0px $SelectBorderDark;

        .menu-item {
          &.active {
            .button-check {
              background-color: $white;
            }
          }

          .button-check {
            border: 1px solid $white;

            :deep(path) {
              fill: $black;
            }
          }

          .text {
            color: $white;
          }
        }
      }
    }
  }

  &.light {
    .select {
      box-shadow: -1px 0px 0px 0px $SelectBorderLight,
        1px 0px 0px 0px $SelectBorderLight, 0px -1px 0px 0px $SelectBorderLight,
        0px 1px 0px 0px $SelectBorderLight;
      background-color: $white;

      &:hover {
        box-shadow: -1px 0px 0px 0px $SelectBorderHoverLight,
          1px 0px 0px 0px $SelectBorderHoverLight,
          0px -1px 0px 0px $SelectBorderHoverLight,
          0px 1px 0px 0px $SelectBorderHoverLight;

        .menu {
          box-shadow: -1px 0px 0px 0px $SelectBorderHoverLight,
            1px 0px 0px 0px $SelectBorderHoverLight,
            0px -1px 0px 0px $SelectBorderLight,
            0px 1px 0px 0px $SelectBorderHoverLight;
        }
      }

      .selected-options {
        .option {
          color: $black;
        }
      }

      .icon {
        svg {
          :deep(path) {
            fill: $SelectBorderLight;
          }
        }
      }

      .menu {
        background-color: $white;

        box-shadow: -1px 0px 0px 0px $SelectBorderLight,
          1px 0px 0px 0px $SelectBorderLight,
          0px -1px 0px 0px $SelectBorderLight,
          0px 1px 0px 0px $SelectBorderLight;

        .menu-item {
          &.active {
            .button-check {
              background-color: $black;
            }
          }

          .button-check {
            border: 1px solid $black;

            svg {
              :deep(path) {
                fill: $white;
              }
            }
          }

          .text {
            color: $black;
          }
        }
      }
    }
  }
}
</style>