<template>
  <div>Artist</div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ArtistPage",
  setup() {
    const route = useRoute();
    const { artistId } = route.params;

    const store = useStore();

    onMounted(() => {
      if (typeof artistId === "string") {
        store.dispatch("fetchPaintingsByArtist", artistId);
      }
    });
  },
});
</script>