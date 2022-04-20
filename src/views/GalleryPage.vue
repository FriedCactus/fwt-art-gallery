<template>
  <Filters />
  <CardsGrid v-if="artists.length" :artists="artists" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import CardsGrid from "@/ui/CardsGrid.vue";
import { computed, defineComponent, onBeforeMount, onMounted } from "vue";
import paintingsPerPage from "@/utils/paintingsPerPage";
import Filters from "@/components/Filters.vue";

export default defineComponent({
  name: "GalleryPage",
  components: {
    CardsGrid,
    Filters,
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
