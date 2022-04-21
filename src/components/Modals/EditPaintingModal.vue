<template>
  <div class="edit-modal">
    <PaintingForm :type="'edit'" :onUpload="onClose" :onCloseClick="onClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PaintingForm from "@/ui/PaintingForm.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "EditPaintingModal",
  components: {
    PaintingForm,
  },
  setup() {
    const store = useStore();

    const onClose = () => {
      store.commit("setIsEditPaintingModalOpen", false);
    };

    return {
      onClose,
    };
  },
});
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