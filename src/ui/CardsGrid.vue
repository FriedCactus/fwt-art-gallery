<template>
  <section class="cards-grid">
    <div v-for="artist in artists" :key="artist._id" class="card">
      <router-link :to="`${basePath}/${artist._id}`">
        <PictureCard
          :name="artist.name"
          :paintingName="artist.mainPainting.name"
          :created="artist.mainPainting.yearOfCreation"
          :years="artist.yearsOfLife"
          :imgUrls="artist.mainPainting.image"
        />
      </router-link>
    </div>
  </section>
</template>

<script lang="ts">
import type { TArtistStatic } from "@/types";

import { defineComponent, PropType } from "vue";
import PictureCard from "./PictureCard.vue";

export default defineComponent({
  components: {
    PictureCard,
  },
  props: {
    artists: {
      type: Array as PropType<TArtistStatic[]>,
      required: true,
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
