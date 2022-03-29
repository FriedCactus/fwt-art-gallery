<template>
  <a href="" class="link" :class="{ [theme]: theme, bold: bold }"><slot /></a>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Link",
  props: {
    bold: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.getters.getTheme),
    };
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
