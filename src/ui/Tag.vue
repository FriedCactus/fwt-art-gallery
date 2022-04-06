<template>
  <span class="tag">
    <slot />
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Tag",
});
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  text-align: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 50px;
  background-color: $TagBackground;

  font-family: Roboto;
  font-weight: 700;
  font-size: 14px;
  color: $TagTextColor;
  font-variant: small-caps;
  text-transform: uppercase;
}
</style>