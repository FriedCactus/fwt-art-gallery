<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Wrapper",
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 0 auto;

  @media ($tablet) {
    max-width: 728px;
  }

  @media ($laptop) {
    max-width: 984px;
  }

  @media ($desktop) {
    max-width: 1120px;
  }

  @media ($tablet) {
    padding: 20px;
  }
}
</style>
