<template>
  <div>App</div>
  <EditButtonVue />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditButtonVue from "./ui/EditButton.vue";

export default defineComponent({
  name: "App",
  components: {
    EditButtonVue,
  },
});
</script>

<style lang="scss">
@import "./styles/global.scss";
</style>
