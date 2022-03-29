<template>
  <IconButton class="icon-button" :isActive="isActive">
    <TrashIcon />
  </IconButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TrashIcon from "../assets/icons/trash_icon.svg";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "FavouriteButton",
  components: {
    IconButton,
    TrashIcon,
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
