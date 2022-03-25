<template>
  <div>
    App

    <PictureCardVue />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PictureCardVue from "./ui/PictureCard.vue";

export default defineComponent({
  name: "App",
  components: {
    PictureCardVue,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
