<template>
  <div class="confirmation-modal">
    <div class="modal">
      <h3 class="title">Do you want to delete this artist profile?</h3>
      <div class="buttons">
        <div class="button-container">
          <Button :onClick="onCancelClick" :staticTheme="'dark'">CANCEL</Button>
        </div>
        <div class="button-container">
          <Button :onClick="onDeleteClick" :staticTheme="'dark'">DELETE</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import Button from "@/ui/Button.vue";
import bodyLock from "@/utils/bodyLock";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ConfirmationModal",
  components: {
    Button,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const { artistId } = route.params;

    const onCancelClick = () => {
      store.commit("setIsConfirmRemoveModalOpen", false);
      bodyLock(false);
    };

    const onDeleteClick = async () => {
      await store.dispatch("tryToDeletePainting", {
        artistId,
        paintingId: store.state.artist.activePaintingId,
      });

      store.commit("setIsConfirmRemoveModalOpen", false);
    };

    return {
      onCancelClick,
      onDeleteClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.confirmation-modal {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: $RemoveModalBackground;
  text-align: center;

  @media ($tablet) {
    justify-content: center;
  }

  .modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 15px;
    background-color: $ModalBackground;
    border-radius: 6px;

    .title {
      margin-bottom: 30px;
      width: 60%;

      font-weight: 700;
      font-size: 22px;
      line-height: 118%;
      color: $white;
    }

    .buttons {
      display: flex;
      width: 100%;

      .button-container {
        flex: 1 1 auto;
        margin-right: 14px;
        height: 40px;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
</style>