<template>
  <div class="container" :class="theme">
    <slot />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Container",
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.state.settings.theme),
    };
  },
});
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