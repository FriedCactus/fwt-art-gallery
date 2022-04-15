<template>
  <form class="upload-form" @submit.prevent="">
    <div class="top">
      <div class="left">
        <UploadIcon />
        <h4 class="title">Image</h4>
      </div>
      <div class="right">
        <button @click="onCloseClick()" class="close-button">
          <CloseIcon />
        </button>
      </div>
    </div>
    <div class="inputs">
      <div class="input-row">
        <label for="name" class="label">
          <h4 class="title">Year of creation</h4>
          <input
            class="input"
            id="name"
            placeholder="Enter the year"
            type="text"
          />
        </label>
      </div>
      <div class="input-row">
        <label for="year" class="label">
          <h4 class="title">The name of the picture</h4>
          <input
            class="input"
            id="year"
            placeholder="Enter a name"
            type="text"
          />
        </label>
      </div>
    </div>
    <div class="drop-zone">Drop</div>
    <div class="bottom">
      <div class="button">
        <Button :staticTheme="'dark'" :style="'filled'">Save</Button>
      </div>
    </div>
    <span class="types">Types</span>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import UploadIcon from "@/assets/icons/upload-icon.svg";
import Button from "./Button.vue";

export default defineComponent({
  name: "UploadImageForm",
  components: {
    CloseIcon,
    UploadIcon,
    Button,
  },
  props: {
    onCloseClick: {
      type: Function,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
.upload-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px 15px 30px;
  background-color: $UploadFormBackground;

  .top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;

    .left {
      display: flex;
      align-items: center;

      svg {
        margin-right: 15px;
        :deep(path) {
          fill: $white;
        }
      }

      .title {
        font-weight: 400;
        font-size: 14px;
        color: $white;
      }
    }

    .right {
      .close-button {
        cursor: pointer;
        background: transparent;
        border: none;
        outline: none;
        width: 15px;
        height: 15px;

        svg {
        }
      }
    }
  }

  .inputs {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;

    font-family: "Roboto";
    font-weight: 400;
    font-size: 12px;
    line-height: 116%;

    .input-row {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        .title {
          color: $UploadInputLabel;
          margin-bottom: 10px;
        }

        .input {
          color: $white;
          background-color: $UploadInputBackground;
          padding: 12px;
          width: 100%;
          height: 40px;
          border-radius: 6px;
          border: none;
          outline: none;

          font-size: 14px;

          &::placeholder {
            color: $UploadInputPlaceholder;
          }
        }
      }
    }
  }

  .drop-zone {
  }

  .bottom {
  }

  .types {
  }
}
</style>