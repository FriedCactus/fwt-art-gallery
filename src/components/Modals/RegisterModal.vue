<template>
  <div class="auth-modal">
    <div class="top">
      <button @click="onCloseClick" class="close-button">
        <CloseIcon />
      </button>
    </div>
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
        <Link @click="onLoginLinkClick">please log in</Link>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Link from "@/ui/Link.vue";
import { useStore } from "@/store";
import Input from "@/ui/Input.vue";
import PersonIcon from "@/assets/icons/person-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";
import { registerFormValidation } from "@/utils/formsValidation";

const store = useStore();

const registerName = ref("");
const registerPassword = ref("");
const registerConfirmPassword = ref("");
const registerNameError = ref("");
const registerPasswordError = ref("");
const registerConfirmPasswordError = ref("");

const isLoading = computed(() => store.state.auth.isLoading);
const error = computed(() => store.state.auth.error);
const usernameError = computed(() => store.getters.getUsernameError);
const passwordError = computed(() => store.getters.getPasswordError);

const isError = computed(() => store.getters.isError);

const clearRegisterErrors = () => {
  if (isError.value) store.commit("clearError");

  if (registerNameError.value) registerNameError.value = "";
  if (registerPasswordError.value) registerPasswordError.value = "";
  if (registerConfirmPasswordError.value) {
    registerConfirmPasswordError.value = "";
  }
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

const onSignUpClick = () => {
  store.commit("setAuthorizationModal", "register");
};

const onCloseClick = () => {
  store.commit("setIsRegisterModalOpen", false);
};

const onLoginLinkClick = () => {
  store.commit("setIsRegisterModalOpen", false);
  store.commit("setIsAuthModalOpen", true);
};

const onRegisterSubmit = () => {
  clearRegisterErrors();

  const errorMessage = registerFormValidation(
    registerName.value,
    registerPassword.value,
    registerConfirmPassword.value,
  );

  if (errorMessage) {
    const { type, message } = errorMessage;

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