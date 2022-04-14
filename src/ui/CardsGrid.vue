<template>
  <section class="cards-grid" :class="{ paintings, [theme]: theme }">
    <template v-if="artists">
      <div v-for="artist in artists" :key="artist._id" class="card">
        <router-link v-if="isAccess" :to="`${basePath}/${artist._id}`">
          <PictureCard :artist="artist" />
        </router-link>
        <PictureCard v-else :artist="artist" />
      </div>
    </template>

    <template v-if="paintings">
      <div class="card">
        <div class="add-card">
          <AddImage />
        </div>
      </div>
      <div v-for="painting in paintings" :key="painting._id" class="card">
        <PictureCard :painting="painting" />
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import type { TArtistStatic, TPainting } from "@/types";

import { useStore } from "@/store";
import AddImage from "@/assets/images/Add.svg";
import { computed, defineComponent, PropType } from "vue";
import PictureCard from "./PictureCard.vue";

export default defineComponent({
  components: {
    PictureCard,
    AddImage,
  },
  props: {
    artists: Array as PropType<TArtistStatic[]>,
    paintings: Array as PropType<TPainting[]>,
  },
  setup() {
    const store = useStore();

    return {
      basePath: process.env.VUE_APP_BASE_PATH,
      theme: computed(() => store.state.settings.theme),
      isAccess: computed(() => store.state.auth.isAccess),
    };
  },
});
</script>

<style lang="scss" scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  &.paintings {
    @media ($desktop) {
      gap: 20px;
    }
  }

  @media ($tablet) {
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
  }

  .card {
    .add-card {
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;

      border-radius: 4px;
    }

    @media ($tablet) {
      grid-column: span 2;
    }
  }

  &.dark {
    .card {
      .add-card {
        border: 3px solid $GridAddCardDark;
      }

      svg {
        :deep(path) {
          stroke: $GridAddCardDark;
        }
      }
    }
  }

  &.light {
    .card {
      .add-card {
        border: 3px solid $GridAddCardLight;
      }

      svg {
        :deep(path) {
          stroke: $GridAddCardLight;
        }
      }
    }
  }
}
</style>
