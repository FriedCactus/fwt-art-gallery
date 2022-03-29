<template>
  <Wrapper>
    <Header />
  </Wrapper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";

export default defineComponent({
  name: "App",
  components: {
    Wrapper,
    Header,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
