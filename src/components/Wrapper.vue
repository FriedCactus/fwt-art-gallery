<template>
  <div class="wrapper" :class="theme">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Wrapper",
  setup() {
    const theme = ref("light");

    return {
      theme,
    };
  },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
  min-height: 100vh;

  &.dark {
    background-color: $BackgroundDark;
  }

  &.light {
    background-color: $BackgroundLight;
  }

  @media ($tablet) {
    padding: 20px;
  }
}
</style>
