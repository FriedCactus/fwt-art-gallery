<template>
  <header class="header" :class="theme">
    <div class="logo-row">
      <Logo class="logo" />
    </div>
    <div class="buttons-row">
      <div class="button">
        <Button :onClick="onThemeChangeClick" :style="'outlined'">
          <ThemeIcon />
        </Button>
      </div>
      <div class="button">
        <Button :style="'outlined'">Log in</Button>
      </div>
      <div class="button">
        <Button>Sign up</Button>
      </div>
      <button
        @click="onBurgerClick"
        class="burger"
        :class="{ active: isMenuOpen }"
      >
        <span class="line" />
        <span class="half-line" />
        <span class="line" />
      </button>
    </div>
  </header>
  <BurgerMenu :isOpen="isMenuOpen" />
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import ThemeIcon from "@/assets/icons/theme_icon.svg";
import Logo from "@/assets/images/Logo.svg";
import Button from "@/ui/Button.vue";
import BurgerMenu from "./BurgerMenu.vue";

export default defineComponent({
  name: "Header",
  components: {
    Logo,
    Button,
    ThemeIcon,
    BurgerMenu,
  },
  setup() {
    const store = useStore();
    const isMenuOpen = ref(false);

    const onBurgerClick = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const onThemeChangeClick = () => {
      store.commit("changeTheme");
    };

    return {
      isMenuOpen,
      onBurgerClick,
      onThemeChangeClick,
      theme: computed(() => store.getters.getTheme),
    };
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;

  @media ($tablet) {
    margin-bottom: 40px;
  }

  .logo-row {
    .logo {
      :deep(path) {
        transition: stroke 0.3s ease;
      }
    }
  }

  .buttons-row {
    display: flex;
    align-items: center;
    height: 40px;

    .button {
      display: none;

      @media ($tablet) {
        display: block;
        width: auto;
        height: 100%;
        margin-right: 12px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .burger {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      width: 24px;
      height: 18px;
      background: none;
      border: none;
      z-index: 2;

      @media ($tablet) {
        display: none;
      }

      .line,
      .half-line {
        transition: all 0.1s;
        height: 2px;
        border-radius: 2px;
      }

      .line {
        width: 100%;
      }

      .half-line {
        width: 60%;
      }

      &.active {
        .half-line {
          opacity: 0;
        }

        .line {
          &:first-child {
            transform: translateY(8px) rotate(-45deg);
          }

          &:last-child {
            transform: translateY(-8px) rotate(45deg);
          }
        }
      }
    }
  }

  &.dark {
    .logo-row {
      .logo {
        :deep(path) {
          stroke: $HeaderDark;
        }
      }
    }

    .buttons-row {
      .burger {
        .line,
        .half-line {
          background-color: $HeaderDark;
        }
      }
    }
  }

  &.light {
    .logo-row {
      .logo {
        :deep(path) {
          stroke: $HeaderLight;
        }
      }
    }

    .buttons-row {
      .burger {
        .line,
        .half-line {
          background-color: $HeaderLight;
        }
      }
    }
  }
}
</style>
