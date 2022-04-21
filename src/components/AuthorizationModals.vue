<template>
  <template v-if="isModalOpen">
    <div class="authorization-modals">
      <AuthModal />
    </div>
  </template>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";
import AuthModal from "./AuthModal.vue";

export default defineComponent({
  name: "AuthorizationModals",
  components: {
    AuthModal,
  },
  setup() {
    const store = useStore();

    return {
      isModalOpen: computed(
        () =>
          store.state.settings.isAuthModalOpen ||
          store.state.settings.isRegisterModalOpen,
      ),
    };
  },
});
</script>

<style lang="scss" scoped>
.authorization-modals {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: $ModalBackground;
  padding-top: 91px;
  z-index: 10;

  @media ($tablet) {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }
}
</style>