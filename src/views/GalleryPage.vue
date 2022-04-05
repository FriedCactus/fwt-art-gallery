<template>
  <Gallery />
</template>

<script lang="ts">
import Gallery from "@/components/Gallery.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "GalleryPage",
  components: {
    Gallery,
  },
});
</script>