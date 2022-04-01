<template>
  <Container>
    <Wrapper>
      <Header />
      <Gallery />
      <Footer />
    </Wrapper>
  </Container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import Container from "./components/Container.vue";
import Footer from "./components/Footer.vue";
import Gallery from "./components/Gallery.vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    Container,
    Wrapper,
    Header,
    Gallery,
    Footer,
  },
  setup() {
    const cookies = useCookies();
    const store = useStore();

    watch(store.state.theme, (newValue) => {
      cookies.set("theme", newValue.theme);
    });

    onBeforeMount(() => {
      const theme = cookies.get("theme");

      if (theme) {
        store.commit("setTheme", theme);
      } else {
        cookies.set("theme", store.state.theme.theme);
      }
    });
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
