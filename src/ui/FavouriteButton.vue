<template>
  <IconButton class="icon-button" :isActive="isActive">
    <FullStarIcon v-if="isActive" />
    <StarIcon class="star" v-else />
  </IconButton>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import StarIcon from "@/assets/icons/star_icon.svg";
import FullStarIcon from "@/assets/icons/fullstar_icon.svg";
import IconButton from "./IconButton.vue";

export default defineComponent({
  name: "FavouriteButton",
  components: {
    IconButton,
    FullStarIcon,
    StarIcon,
  },
  props: {
    isActive: {
      type: Boolean,
    },
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
