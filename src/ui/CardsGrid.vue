<template>
  <section class="cards-grid">
    <template v-if="artists">
      <div v-for="artist in artists" :key="artist._id" class="card">
        <router-link :to="`${basePath}/${artist._id}`">
          <PictureCard :artist="artist" />
        </router-link>
      </div>
    </template>

    <template v-if="paintings">
      <div v-for="painting in paintings" :key="painting._id" class="card">
        <PictureCard :painting="painting" />
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import type { TArtistStatic, TPainting } from "@/types";

import { defineComponent, PropType } from "vue";
import PictureCard from "./PictureCard.vue";

export default defineComponent({
  components: {
    PictureCard,
  },
  props: {
    artists: {
      type: Array as PropType<TArtistStatic[]>,
    },
    paintings: {
      type: Array as PropType<TPainting[]>,
    },
  },
  setup() {
    return {
      basePath: process.env.VUE_APP_BASE_PATH,
    };
  },
});
</script>

<style lang="scss" scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;

  @media ($tablet) {
    grid-template-columns: repeat(6, auto);
    gap: 20px;
  }

  .card {
    @media ($tablet) {
      grid-column: span 2;
    }
  }
}
</style>
