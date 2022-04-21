<template>
  <div class="add-modal">
    <PaintingForm :type="'add'" :onUpload="onClose" :onCloseClick="onClose" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PaintingForm from "@/ui/PaintingForm.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "AddPaintingModal",
  components: {
    PaintingForm,
  },
  setup() {
    const store = useStore();

    const onClose = () => {
      store.commit("setIsAddPaintingModalOpen", false);
    };

    return {
      onClose,
    };
  },
});
</script>

<style lang="scss" scoped>
.add-modal {
  width: 100%;
  height: 100%;

  @media ($tablet) {
    width: 500px;
    height: 650px;
  }
}
</style>