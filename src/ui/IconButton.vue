<template>
  <button class="icon-button" :class="{ active: isActive }">
    <slot />
  </button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  isActive?: boolean;
}>();
</script>

<style lang="scss" scoped>
.icon-button {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: $IconButtonBackground;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: border 0.3s ease;

  &:active,
  &.active {
    border: 1px solid $IconButtonBackground;
  }
}
</style>
