<template>
  <div class="auth-modal">
    <template v-if="isAuthOpen">
      <div class="top">
        <button @click="onAuthClose" class="close-button">
          <CloseIcon />
        </button>
      </div>
      <form @submit.prevent="onAuthSubmit" class="form">
        <h3 class="title">AUTHORIZATION</h3>
        <div class="inputs">
          <div class="input">
            <Input
              :onInput="setLoginName"
              :value="loginName"
              :placeholder="'Login'"
              :error="loginNameError || usernameError"
            >
              <PersonIcon />
            </Input>
          </div>
          <div class="input">
            <Input
              :onInput="setLoginPassword"
              :value="loginPassword"
              :placeholder="'Password'"
              :error="loginPasswordError || passwordError"
              :typeValue="'password'"
            >
              <LockIcon />
            </Input>
          </div>
        </div>
        <div class="submit-button">
          <Button
            :disabled="isLoading"
            :style="'filled'"
            :staticTheme="'light'"
            type="submit"
            >Log in</Button
          >
        </div>
      </form>
      <span class="separating-line" />
      <div class="info">
        <p class="text">
          If you don't have An account yet,
          <Link @click="onSignLinkClick">please sign up</Link>
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Link from "@/ui/Link.vue";
import { useStore } from "@/store";
import Input from "@/ui/Input.vue";
import PersonIcon from "@/assets/icons/person-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";
import { authFormValidation } from "@/utils/formsValidation";

export default defineComponent({
  name: "AuthModal",
  components: {
    CloseIcon,
    Button,
    Link,
    Input,
    PersonIcon,
    LockIcon,
  },

  setup() {
    const store = useStore();

    const loginName = ref("");
    const loginPassword = ref("");
    const loginNameError = ref("");
    const loginPasswordError = ref("");

    const isError = computed(() => store.getters.isError);

    const clearLoginErrors = () => {
      if (isError.value) store.commit("clearError");

      if (loginNameError.value) loginNameError.value = "";
      if (loginPasswordError.value) loginPasswordError.value = "";
    };

    const setLoginName = (event: Event) => {
      clearLoginErrors();

      loginName.value = (event.target as HTMLInputElement).value;
    };

    const setLoginPassword = (event: Event) => {
      clearLoginErrors();

      loginPassword.value = (event.target as HTMLInputElement).value;
    };

    const onLogInClick = () => {
      store.commit("setAuthorizationModal", "auth");
    };

    const onAuthClose = () => {
      store.commit("setIsAuthModalOpen", false);
    };

    const onSignLinkClick = () => {
      store.commit("setIsAuthModalOpen", false);
      store.commit("setIsRegisterModalOpen", true);
    };

    const onAuthSubmit = async () => {
      clearLoginErrors();

      const error = authFormValidation(loginName.value, loginPassword.value);

      if (error) {
        const { type, message } = error;

        if (type === "login") loginNameError.value = message;
        if (type === "password") loginPasswordError.value = message;
      } else {
        await store.dispatch("tryToLogin", {
          username: loginName.value,
          password: loginPassword.value,
        });
      }
    };

    return {
      isLoading: computed(() => store.state.auth.isLoading),
      error: computed(() => store.state.auth.error),
      usernameError: computed(() => store.getters.getUsernameError),
      passwordError: computed(() => store.getters.getPasswordError),
      isAuthOpen: computed(() => store.state.settings.isAuthModalOpen),
      onLogInClick,
      loginName,
      loginPassword,
      loginNameError,
      loginPasswordError,
      setLoginName,
      setLoginPassword,
      onAuthSubmit,
      onAuthClose,
      onSignLinkClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.auth-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: $white;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.12);
  border-radius: 35px 35px 0px 0px;
  width: 100%;
  height: 100%;
  padding: 67px 15px 15px;
  overflow: hidden;

  .top {
    position: absolute;
    top: 28px;
    right: 28px;
    padding-right: 16px;
    margin-bottom: 57px;

    .close-button {
      cursor: pointer;
      background-color: transparent;
      border: none;
      outline: none;
      height: 12px;
      width: 12px;

      svg {
        :deep(path) {
          fill: $black;
        }
      }
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .title {
      text-align: center;
      margin-bottom: 35px;
      font-weight: 900;
      font-size: 20px;
      line-height: 115%;
      text-transform: uppercase;
    }

    .inputs {
      width: 100%;
      margin-bottom: 30px;

      .input {
        width: 100%;
        height: 40px;
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    .submit-button {
      width: 100%;
      height: 40px;
    }
  }

  .separating-line {
    display: inline-block;
    margin: 25px 0 15px;
    width: 100%;
    height: 0.3px;
    background-color: $SeparatingLine;
  }

  .info {
    .text {
      font-weight: 300;
      font-size: 13px;
      line-height: 115%;
      font-variant: small-caps;
      text-transform: uppercase;
    }
  }

  @media ($tablet) {
    padding: 38px 85px;
    border-radius: 8px;
    width: auto;
    height: auto;

    .top {
      top: 22px;
      right: 22px;
    }

    .form {
      .title,
      .inputs,
      .submit-button {
        width: 230px;
      }
    }
  }
}
</style>