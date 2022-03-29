<template>
  <IconButton class="icon-button" :isActive="isActive">
    <EditIcon />
  </IconButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditIcon from "../assets/icons/edit_icon.svg";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "FavouriteButton",
  components: {
    IconButton,
    EditIcon,
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
