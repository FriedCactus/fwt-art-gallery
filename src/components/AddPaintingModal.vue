<template>
  <div class="add-modal">
    <div class="container">
      <PaintingForm :type="type" :onUpload="onClose" :onCloseClick="onClose" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import PaintingForm from "@/ui/PaintingForm.vue";

export default defineComponent({
  name: "AddPaintingModal",
  components: {
    PaintingForm,
  },
  props: {
    onClose: {
      type: Function,
      default: () => {},
    },
    type: {
      type: String as PropType<"add" | "edit">,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.add-modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $ModalBackground;
  z-index: 3;

  .container {
    width: 100%;
    height: 100%;

    @media ($tablet) {
      width: 500px;
      height: 650px;
    }
  }
}
</style>