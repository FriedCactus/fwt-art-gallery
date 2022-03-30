<template>
  <div class="container" :class="theme">
    <slot />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Container",
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.getters.getTheme),
    };
  },
});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  transition: background-color 0.3s ease;

  &.dark {
    background-color: $BackgroundDark;
  }

  &.light {
    background-color: $BackgroundLight;
  }
}
</style>