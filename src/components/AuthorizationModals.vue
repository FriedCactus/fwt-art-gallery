<template>
  <template v-if="authorizationModal">
    <div class="authorization-modals">
      <AuthModal :type="authorizationModal" :onClose="onClose" />
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

    const onClose = () => {
      store.commit("setAuthorizationModal", "");
    };

    return {
      authorizationModal: computed(
        () => store.state.settings.authorizationModal,
      ),
      onClose,
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