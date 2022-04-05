<template>
  <main class="gallery">
    <CardsGrid v-if="artists.length" :artists="artists" />
  </main>
</template>

<script lang="ts">
import { useStore } from "@/store";
import CardsGrid from "@/ui/CardsGrid.vue";
import { computed, defineComponent, onBeforeMount, onMounted } from "vue";
import { paintingsPerPage } from "@/utils/gallery";

export default defineComponent({
  name: "Gallery",
  components: {
    CardsGrid,
  },
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      const perPage = paintingsPerPage();

      if (perPage !== store.state.gallery.perPage) {
        store.commit("setPerPage", perPage);
      }
    });

    onMounted(() => {
      store.dispatch("fetchArtistsStatic");
    });

    return {
      artists: computed(() => store.getters.getArtistsStatic),
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery {
  flex: 1 1 auto;
  margin-bottom: 30px;

  @media ($tablet) {
    margin-bottom: 40px;
  }
}
</style>