<template>
  <div class="artist-modal">
    <ArtistForm />
  </div>
</template>

<script lang="ts" setup>
import ArtistForm from "../ArtistForm.vue";
</script>

<style lang="scss" scoped>
.artist-modal {
  width: 100%;
  height: 100%;

  @media ($tablet) {
    width: 70%;
    max-width: 500px;
    height: 768px;
    border-radius: 8px;
    overflow: hidden;
  }

  @media ($laptop) {
    height: 100%;
    border-radius: 0 8px 8px 0;
  }
}
</style>