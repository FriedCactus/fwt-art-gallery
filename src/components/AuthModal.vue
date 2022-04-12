<template>
  <div class="auth-modal">
    <div class="top">
      <button @click="onClose" class="close-button">
        <CloseIcon />
      </button>
    </div>

    <template v-if="type === 'auth'">
      <form @submit.prevent="" class="form">
        <h3 class="title">AUTHORIZATION</h3>
        <div class="slot"><slot /></div>
        <div class="submit-button">
          <Button :style="'filled'" type="submit">Log in</Button>
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
      <form @submit.prevent="" class="form">
        <h3 class="title">СREATE YOUR PROFILE</h3>
        <div class="slot"><slot /></div>
        <div class="submit-button">
          <Button :style="'filled'" type="submit">Registration</Button>
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
import { defineComponent, PropType } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Link from "@/ui/Link.vue";
import { useStore } from "@/store";

type Props = {
  type: "auth" | "register";
};

export default defineComponent({
  name: "AuthModal",
  components: {
    CloseIcon,
    Button,
    Link,
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

    const onLogInClick = () => {
      store.commit("setAuthorizationModal", "auth");
    };

    const onSignUpClick = () => {
      store.commit("setAuthorizationModal", "register");
    };

    return {
      onLogInClick,
      onSignUpClick,
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

  @media ($tablet) {
    padding: 38px 85px;
    border-radius: 35px;
    width: auto;
    height: auto;
  }

  .top {
    position: absolute;
    top: 28px;
    right: 28px;
    padding-right: 16px;
    margin-bottom: 57px;

    @media ($tablet) {
      top: 22px;
      right: 22px;
    }

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
      margin-bottom: 35px;
      font-weight: 900;
      font-size: 20px;
      line-height: 115%;
      text-transform: uppercase;
    }

    .slot {
      margin-bottom: 30px;
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
}
</style>