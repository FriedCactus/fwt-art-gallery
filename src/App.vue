<template>
  <Wrapper>
    <Header />
    <CardsGrid />
  </Wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";
import CardsGrid from "./ui/CardsGrid.vue";

export default defineComponent({
  name: "App",
  components: {
    Wrapper,
    Header,
    CardsGrid,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
