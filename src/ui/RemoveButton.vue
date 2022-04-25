<template>
  <IconButton @click.stop="onClick()" class="icon-button">
    <TrashIcon />
  </IconButton>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import TrashIcon from "../assets/icons/trash_icon.svg";
import IconButton from "./IconButton.vue";

defineProps({
  onClick: {
    type: Function,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.icon-button {
  &:hover {
    svg {
      :deep(path) {
        transition: fill 0.3s ease;
        fill: $TrashColor;
      }
    }
  }
}
</style>
