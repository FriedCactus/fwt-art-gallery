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
        <div class="inputs">
          <div class="input">
            <Input :placeholder="'Email'">
              <PersonIcon />
            </Input>
          </div>
          <div class="input">
            <Input :placeholder="'Password'">
              <LockIcon />
            </Input>
          </div>
        </div>
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
        <div class="inputs">
          <div class="input">
            <Input :placeholder="'Email'">
              <PersonIcon />
            </Input>
          </div>
          <div class="input">
            <Input :placeholder="'Password'">
              <LockIcon />
            </Input>
          </div>
          <div class="input">
            <Input :placeholder="'Confirm password'">
              <LockIcon />
            </Input>
          </div>
        </div>
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
import Input from "@/ui/Input.vue";
import PersonIcon from "@/assets/icons/person-icon.svg";
import LockIcon from "@/assets/icons/lock-icon.svg";

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