<template>
  <div
    class="drop-zone"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInActive"
    @drop.stop.prevent="onDrop"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { defineProps, onMounted, onUnmounted } from "vue";

const props = defineProps({
  onDragEnter: {
    type: Function,
    default: () => {},
  },
  onDragLeave: {
    type: Function,
    default: () => {},
  },
});

const conditions = ["jpeg", "jpg", "png"];
const store = useStore();

let inActiveTimeout: ReturnType<typeof setTimeout>;

const setActive = () => {
  props.onDragEnter();
  clearTimeout(inActiveTimeout);
};

const setInActive = () => {
  inActiveTimeout = setTimeout(() => {
    props.onDragLeave();
  }, 50);
};

const events = ["dragenter", "dragover", "dragleave", "drop"];

const preventDefaults = (e: Event) => {
  e.preventDefault();
};

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});

const onDrop = (e: DragEvent) => {
  const droppedFiles = e.dataTransfer?.files;

  if (droppedFiles) {
    const filteredFiles = [...droppedFiles].filter((item) =>
      conditions.some((condition) => item.type.includes(condition)),
    );

    if (filteredFiles.length === 1) {
      store.commit("setUploadedFiles", filteredFiles[0]);
    }
  }

  setInActive();
};
</script>

<style lang="scss" scoped>
.drop-zone {
  width: 100%;
  height: 100%;
}
</style>