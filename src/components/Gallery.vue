<template>
  <main class="gallery">
    <CardsGrid />
  </main>
</template>

<script lang="ts">
import CardsGrid from "@/ui/CardsGrid.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Gallery",
  components: {
    CardsGrid,
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  margin-bottom: 30px;

  @media ($tablet) {
    margin-bottom: 40px;
  }
}
</style>