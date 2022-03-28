<template>
  <div>App</div>
  <Button />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "./ui/Button.vue";

export default defineComponent({
  name: "App",
  components: {
    Button,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
