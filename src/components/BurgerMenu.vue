<template>
  <div class="burger-menu" :class="{ [theme]: theme, active: isOpen }">
    <div class="buttons-row">
      <div class="button">
        <Button :style="'outlined'">
          <ThemeIcon />
        </Button>
      </div>
      <div class="button">
        <Button :style="'outlined'">Log in</Button>
      </div>
      <div class="button">
        <Button>Sign up</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Button from "@/ui/Button.vue";
import ThemeIcon from "@/assets/icons/theme_icon.svg";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "BurgerMenu",
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
  },
  components: {
    Button,
    ThemeIcon,
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
.burger-menu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 109px 15px;
  transform: translateY(-100%);
  transition: transform 0.3s ease;
  z-index: 1;

  @media ($tablet) {
    display: none;
  }

  &.active {
    transform: translateY(0);
  }

  &.dark {
    background-color: $BackgroundDark;
  }

  &.light {
    background-color: $BackgroundLight;
  }

  .buttons-row {
    display: flex;
    flex-direction: column;

    .button {
      height: 40px;
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
