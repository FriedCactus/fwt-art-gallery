<template>
  <div class="artist-edit">
    <div class="container">
      <ArtistForm />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtistForm from "./ArtistForm.vue";

export default defineComponent({
  name: "ArtistEditModal",
  components: {
    ArtistForm,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.artist-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  .container {
    width: 100%;
    height: 100%;
  }
}
</style>