<template>
  <IconButton @click.stop="onClick()" class="icon-button">
    <EditIcon />
  </IconButton>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import EditIcon from "../assets/icons/edit_icon.svg";
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
        fill: $EditColor;
      }
    }
  }
}
</style>
