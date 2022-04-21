<template>
  <div class="gallery-page">
    <Filters v-if="isAccess" />
    <CardsGrid v-if="artists.length" :artists="artists" />
  </div>
  <ArtistModal v-if="isArtistModalOpen" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import CardsGrid from "@/ui/CardsGrid.vue";
import { computed, defineComponent, onBeforeMount, onMounted } from "vue";
import paintingsPerPage from "@/utils/paintingsPerPage";
import Filters from "@/components/Filters.vue";
import ArtistModal from "@/components/ArtistModal.vue";

export default defineComponent({
  name: "GalleryPage",
  components: {
    CardsGrid,
    Filters,
    ArtistModal,
  },
  setup() {
    const store = useStore();
    const isAccess = computed(() => store.state.auth.isAccess);

    onBeforeMount(() => {
      const perPage = paintingsPerPage();

      if (perPage !== store.state.gallery.perPage) {
        store.commit("setPerPage", perPage);
      }
    });

    onMounted(() => {
      store.dispatch("fetchArtistsStatic");
      if (isAccess.value) store.dispatch("fetchArtists");
    });

    return {
      artists: computed(() => store.getters.getArtistsStatic),
      isArtistModalOpen: computed(() => store.state.settings.isArtistModalOpen),
      isAccess,
    };
  },
});
</script>

<style lang="scss" scoped>
.gallery-page {
}
</style>
