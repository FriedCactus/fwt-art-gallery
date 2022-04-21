<template>
  <div class="confirmation-modal">
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
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import Button from "@/ui/Button.vue";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();

const { artistId } = route.params;

const onCancelClick = () => {
  store.commit("setIsConfirmRemoveModalOpen", false);
};

const onDeleteClick = async () => {
  await store.dispatch("tryToDeletePainting", {
    artistId,
    paintingId: store.state.artist.activePaintingId,
  });

  store.commit("setIsConfirmRemoveModalOpen", false);
};
</script>

<style lang="scss" scoped>
.confirmation-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 15px;
  background-color: $ModalBackground;
  border-radius: 6px;

  .title {
    margin-bottom: 30px;
    width: 70%;
    text-align: center;

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
</style>