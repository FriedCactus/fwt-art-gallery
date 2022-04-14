<template>
  <AuthProvider>
    <Container>
      <Wrapper>
        <Header />
        <main class="main">
          <router-view />
        </main>
        <Footer />
      </Wrapper>
      <AuthorizationModals />
    </Container>
  </AuthProvider>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, watch } from "vue";
import { useCookies } from "@vueuse/integrations/useCookies";
import Container from "./components/Container.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Wrapper from "./components/Wrapper.vue";
import { useStore } from "./store";
import AuthorizationModals from "./components/AuthorizationModals.vue";
import bodyLock from "./utils/bodyLock";
import AuthProvider from "./components/AuthProvider.vue";

export default defineComponent({
  name: "App",
  components: {
    Container,
    Wrapper,
    Header,
    Footer,
    AuthorizationModals,
    AuthProvider,
  },
  setup() {
    const cookies = useCookies();
    const store = useStore();

    // Слежение за темой
    watch(
      () => store.state.settings.theme,
      (newValue) => {
        cookies.set("theme", newValue);
      },
    );

    // Слежение за модалками авторизации
    watch(
      () => store.state.settings.authorizationModal,
      (newValue) => {
        bodyLock(!!newValue);
      },
    );

    watch(
      () => store.state.auth.isAccess,
      (newValue) => {
        if (newValue) store.commit("setAuthorizationModal", "");
      },
    );

    onBeforeMount(() => {
      const theme = cookies.get("theme");

      if (theme) {
        store.commit("setTheme", theme);
      } else {
        cookies.set("theme", store.state.settings.theme);
      }
    });

    return {};
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
