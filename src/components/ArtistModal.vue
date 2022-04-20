<template>
  <div class="artist-modal">
    <div class="container">
      <ArtistForm :isEdit="isEdit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ArtistForm from "./ArtistForm.vue";

export default defineComponent({
  name: "ArtistModal",
  props: {
    isEdit: {
      type: Boolean,
    },
  },
  components: {
    ArtistForm,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.artist-modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: $ModalBackground;

  .container {
    width: 100%;
    height: 100%;
  }

  @media ($tablet) {
    .container {
      width: 70%;
      max-width: 500px;
      height: 768px;
      border-radius: 8px;
      overflow: hidden;
    }
  }

  @media ($laptop) {
    justify-content: flex-start;
    .container {
      height: 100%;
      border-radius: 0 8px 8px 0;
    }
  }
}
</style>