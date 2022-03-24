<template>
  <div>Apps</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {},
});
</script>

<style lang="scss">
body {
  min-height: 100vh;
  font-family: $RobotoRegular;
}

*,
*::after,
*::before {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

img {
  max-width: 100%;
}
</style>
