<template>
  <Container>
    <Wrapper>
      <Header />
      <main class="main">
        <router-view />
      </main>
      <Footer />
    </Wrapper>
  </Container>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import Container from "./components/Container.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";
import { useStore } from "./store";

export default defineComponent({
  name: "App",
  components: {
    Container,
    Wrapper,
    Header,

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

.main {
  flex: 1 1 auto;
  margin-bottom: 30px;

  @media ($tablet) {
    margin-bottom: 40px;
  }
}
</style>
