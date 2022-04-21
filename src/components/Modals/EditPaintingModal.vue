<template>
  <div class="edit-modal">
    <PaintingForm :type="'edit'" :onUpload="onClose" :onCloseClick="onClose" />
  </div>
</template>

<script lang="ts" setup>
import PaintingForm from "@/ui/PaintingForm.vue";
import { useStore } from "@/store";

const store = useStore();

const onClose = () => {
  store.commit("setIsEditPaintingModalOpen", false);
};
</script>

<style lang="scss" scoped>
.edit-modal {
  width: 100%;
  height: 100%;

  @media ($tablet) {
    width: 500px;
    height: 650px;
  }
}
</style>