<template>
  <a href="#" class="link" :class="{ [theme]: theme, bold: bold }"><slot /></a>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import { computed, defineProps } from "vue";

defineProps({
  bold: {
    type: Boolean,
    default: false,
  },
});

const store = useStore();

const theme = computed(() => store.state.settings.theme);
</script>

<style lang="scss" scoped>
.link {
  font-weight: 400;
  font-size: 13px;
  line-height: 115%;
  text-transform: uppercase;
  font-variant: small-caps;
  transition: color 0.3s ease;

  &.bold {
    font-weight: bold;
  }

  &.dark {
    color: $LinkDark;
  }

  &.light {
    color: $LinkLight;
  }

  &:active,
  &:visited {
    &.dark {
      color: $LinkActiveDark;
    }

    &.light {
      color: $LinkActiveLight;
    }
  }

  @media ($laptop) {
    &:hover {
      &.dark {
        color: $LinkActiveDark;
      }
      &.light {
        color: $LinkActiveLight;
      }
    }
  }
}
</style>
