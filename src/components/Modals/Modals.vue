<template>
  <div class="modal auth" v-if="isAuthModalOpen">
    <AuthModal />
  </div>
  <div class="modal auth" v-if="isRegisterModalOpen">
    <RegisterModal />
  </div>
  <div class="modal confirm" v-if="isConfirmRemoveModalOpen">
    <ConfirmModal />
  </div>
  <div class="modal" v-if="isAddPaintingModalOpen">
    <AddPaintingModal />
  </div>
  <div class="modal" v-if="isEditPaintingModalOpen">
    <EditPaintingModal />
  </div>
  <div class="modal artist" v-if="isAddArtistModalOpen">
    <AddArtistModal />
  </div>
  <div class="modal artist" v-if="isEditArtistModalOpen">
    <EditArtistModal />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from "vue";
import bodyLock from "@/utils/bodyLock";
import { useStore } from "@/store";

import AuthModal from "./AuthModal.vue";
import RegisterModal from "./RegisterModal.vue";
import ConfirmModal from "./ConfirmModal.vue";
import AddPaintingModal from "./AddPaintingModal.vue";
import EditPaintingModal from "./EditPaintingModal.vue";
import AddArtistModal from "./AddArtistModal.vue";
import EditArtistModal from "./EditArtistModal.vue";

export default defineComponent({
  name: "Modals",
  components: {
    AuthModal,
    RegisterModal,
    ConfirmModal,
    AddPaintingModal,
    EditPaintingModal,
    AddArtistModal,
    EditArtistModal,
  },
  setup() {
    const store = useStore();

    const isAuthModalOpen = computed(
      () => store.state.settings.isAuthModalOpen,
    );
    const isRegisterModalOpen = computed(
      () => store.state.settings.isRegisterModalOpen,
    );
    const isConfirmRemoveModalOpen = computed(
      () => store.state.settings.isConfirmRemoveModalOpen,
    );
    const isAddPaintingModalOpen = computed(
      () => store.state.settings.isAddPaintingModalOpen,
    );
    const isEditPaintingModalOpen = computed(
      () => store.state.settings.isEditPaintingModalOpen,
    );
    const isAddArtistModalOpen = computed(
      () => store.state.settings.isAddArtistModalOpen,
    );
    const isEditArtistModalOpen = computed(
      () => store.state.settings.isEditArtistModalOpen,
    );

    watch(
      () =>
        isAuthModalOpen.value ||
        isRegisterModalOpen.value ||
        isConfirmRemoveModalOpen.value ||
        isAddPaintingModalOpen.value ||
        isEditPaintingModalOpen.value ||
        isAddArtistModalOpen.value ||
        isEditArtistModalOpen.value,
      (newValue) => {
        bodyLock(newValue);
      },
    );

    return {
      isAuthModalOpen,
      isRegisterModalOpen,
      isConfirmRemoveModalOpen,
      isAddPaintingModalOpen,
      isEditPaintingModalOpen,
      isAddArtistModalOpen,
      isEditArtistModalOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $ModalBackground;

  &.auth {
    padding-top: 91px;

    @media ($tablet) {
      padding-top: 0;
    }
  }

  &.confirm {
    align-items: flex-end;
    z-index: 6;

    @media ($tablet) {
      align-items: center;
    }
  }

  &.artist {
    @media ($laptop) {
      justify-content: flex-start;
    }
  }
}
</style>