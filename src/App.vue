<template>
  <Wrapper>
    <Header />
    <Gallery />
  </Wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Gallery from "./components/Gallery.vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";

export default defineComponent({
  name: "App",
  components: {
    Wrapper,
    Header,
    Gallery,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
