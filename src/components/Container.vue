<template>
  <div class="container" :class="theme">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";

const store = useStore();

const theme = computed(() => store.state.settings.theme);
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  transition: background-color 0.3s ease;
  overflow: hidden;

  &.dark {
    background-color: $BackgroundDark;
  }

  &.light {
    background-color: $BackgroundLight;
  }
}
</style>