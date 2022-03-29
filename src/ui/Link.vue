<template>
  <a href="" class="link" :class="{ [theme]: theme, bold: bold }"><slot /></a>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Link",
  props: {
    theme: {
      type: String,
      default: "dark",
    },
    bold: {
      type: Boolean,
      default: false,
    },
  },
});
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

  &:active {
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
