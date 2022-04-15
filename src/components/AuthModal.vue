<template>
  <div class="auth-modal">
    <div class="top">
      <button @click="onClose" class="close-button">
        <CloseIcon />
      </button>
    </div>

    <template v-if="type === 'auth'">
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
          <Link @click="onSignUpClick">please sign up</Link>
        </p>
      </div>
    </template>

    <template v-if="type === 'register'">
      <form @submit.prevent="onRegisterSubmit" class="form">
        <h3 class="title">СREATE YOUR PROFILE</h3>
        <div class="inputs">
          <div class="input">
            <Input
              :value="registerName"
              :onInput="setRegisterName"
              :placeholder="'Login'"
              :error="registerNameError || usernameError"
            >
              <PersonIcon />
            </Input>
          </div>
          <div class="input">
            <Input
              :value="registerPassword"
              :onInput="setRegisterPassword"
              :placeholder="'Password'"
              :typeValue="'password'"
              :error="registerPasswordError"
            >
              <LockIcon />
            </Input>
          </div>
          <div class="input">
            <Input
              :value="registerConfirmPassword"
              :onInput="setRegisterConfirmPassword"
              :placeholder="'Confirm password'"
              :typeValue="'password'"
              :error="registerConfirmPasswordError"
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
            >Registration</Button
          >
        </div>
      </form>
      <span class="separating-line" />
      <div class="info">
        <p class="text">
          If you already have an account,
          <Link @click="onLogInClick">please log in</Link>
        </p>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Link from "@/ui/Link.vue";
import { useStore } from "@/store";
import Input from "@/ui/Input.vue";
import PersonIcon from "@/assets/icons/person-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";
import {
  authFormValidation,
  registerFormValidation,
} from "@/utils/formsValidation";

type Props = {
  type: "auth" | "register";
};

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
  props: {
    type: String as PropType<Props["type"]>,
    onClose: {
      type: Function as PropType<() => void>,
      default: () => {},
    },
  },
  setup() {
    const store = useStore();

    const loginName = ref("");
    const loginPassword = ref("");
    const loginNameError = ref("");
    const loginPasswordError = ref("");

    const registerName = ref("");
    const registerPassword = ref("");
    const registerConfirmPassword = ref("");
    const registerNameError = ref("");
    const registerPasswordError = ref("");
    const registerConfirmPasswordError = ref("");

    const isError = computed(() => store.getters.isError);

    const clearLoginErrors = () => {
      if (isError.value) store.commit("clearError");

      if (loginNameError.value) loginNameError.value = "";
      if (loginPasswordError.value) loginPasswordError.value = "";
    };

    const clearRegisterErrors = () => {
      if (isError.value) store.commit("clearError");

      if (registerNameError.value) registerNameError.value = "";
      if (registerPasswordError.value) registerPasswordError.value = "";
      if (registerConfirmPasswordError.value) {
        registerConfirmPasswordError.value = "";
      }
    };

    const setLoginName = (event: Event) => {
      clearLoginErrors();

      loginName.value = (event.target as HTMLInputElement).value;
    };

    const setLoginPassword = (event: Event) => {
      clearLoginErrors();

      loginPassword.value = (event.target as HTMLInputElement).value;
    };

    const setRegisterName = (event: Event) => {
      clearRegisterErrors();

      registerName.value = (event.target as HTMLInputElement).value;
    };

    const setRegisterPassword = (event: Event) => {
      clearRegisterErrors();

      registerPassword.value = (event.target as HTMLInputElement).value;
    };

    const setRegisterConfirmPassword = (event: Event) => {
      clearRegisterErrors();

      registerConfirmPassword.value = (event.target as HTMLInputElement).value;
    };

    const onLogInClick = () => {
      store.commit("setAuthorizationModal", "auth");
    };

    const onSignUpClick = () => {
      store.commit("setAuthorizationModal", "register");
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

    const onRegisterSubmit = () => {
      clearRegisterErrors();

      const error = registerFormValidation(
        registerName.value,
        registerPassword.value,
        registerConfirmPassword.value,
      );

      if (error) {
        const { type, message } = error;

        if (type === "login") registerNameError.value = message;
        if (type === "password") registerPasswordError.value = message;
        if (type === "confirm") registerConfirmPasswordError.value = message;
      } else {
        store.dispatch("tryToRegister", {
          username: registerName.value,
          password: registerPassword.value,
        });
      }
    };

    return {
      isLoading: computed(() => store.state.auth.isLoading),
      error: computed(() => store.state.auth.error),
      usernameError: computed(() => store.getters.getUsernameError),
      passwordError: computed(() => store.getters.getPasswordError),
      onLogInClick,
      onSignUpClick,
      loginName,
      loginPassword,
      loginNameError,
      loginPasswordError,
      registerName,
      registerPassword,
      registerConfirmPassword,
      registerNameError,
      registerPasswordError,
      registerConfirmPasswordError,
      setLoginName,
      setLoginPassword,
      setRegisterName,
      setRegisterPassword,
      setRegisterConfirmPassword,
      onAuthSubmit,
      onRegisterSubmit,
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