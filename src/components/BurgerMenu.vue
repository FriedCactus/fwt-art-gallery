<template>
  <div class="burger-menu" :class="{ [theme]: theme, active: isOpen }">
    <div class="buttons-row">
      <div class="button">
        <Button :onClick="onThemeChangeClick" :style="'outlined'">
          <ThemeIcon />
        </Button>
      </div>

      <template v-if="!isAuth">
        <div class="button">
          <Button :onClick="onLogInClick" :style="'outlined'">Log in</Button>
        </div>
        <div class="button">
          <Button :onClick="onSignUpClick">Sign up</Button>
        </div>
      </template>
      <div v-else class="button">
        <Button :onClick="onLogOutClick" :style="'outlined'">Log out</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import useAuth from "@/hooks/useAuth";
import Button from "@/ui/Button.vue";
import ThemeIcon from "@/assets/icons/theme_icon.svg";
import { computed, defineComponent } from "vue";
import { TSettingsState } from "@/types";

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
    const { clearLoginCookies } = useAuth();

    const onThemeChangeClick = () => {
      store.commit("changeTheme");
    };

    const authorizationModal = (
      modal: TSettingsState["authorizationModal"],
    ) => {
      store.commit("setAuthorizationModal", modal);
    };

    const onLogInClick = () => {
      authorizationModal("auth");
    };

    const onSignUpClick = () => {
      authorizationModal("register");
    };

    const onLogOutClick = () => {
      store.commit("setIsAuth", false);
      clearLoginCookies();
    };

    return {
      isAuth: computed(() => store.state.auth.isAuth),
      theme: computed(() => store.state.settings.theme),
      onThemeChangeClick,
      onLogInClick,
      onSignUpClick,
      onLogOutClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.burger-menu {
  position: fixed;
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
