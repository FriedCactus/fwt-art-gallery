<template>
  <IconButton @click.stop="onClick()" class="icon-button" :isActive="isActive">
    <FullStarIcon v-if="isActive" />
    <StarIcon class="star" v-else />
  </IconButton>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import StarIcon from "../assets/icons/star_icon.svg";
import FullStarIcon from "../assets/icons/fullstar_icon.svg";
import IconButton from "./IconButton.vue";

defineProps({
  isActive: Boolean,
  onClick: {
    type: Function,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped>
.icon-button {
  &:hover {
    .star {
      :deep(path) {
        transition: fill 0.3s ease;
        fill: $StarColor;
      }
    }
  }
}
</style>
