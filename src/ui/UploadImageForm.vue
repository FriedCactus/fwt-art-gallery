<template>
  <form class="upload-form" @submit.prevent="onFormSubmit">
    <div class="top">
      <div class="left">
        <UploadIcon />
        <h4 class="title">Image</h4>
      </div>
      <div class="right">
        <button @click="onCloseClick()" class="close-button" type="button">
          <CloseIcon />
        </button>
      </div>
    </div>

    <div class="inputs">
      <div class="input-row name">
        <label for="name" class="label" :class="{ error: nameError }">
          <h4 class="title">The name of the picture</h4>
          <input
            class="input"
            id="name"
            placeholder="Enter a name"
            type="text"
            :value="name"
            @input="onNameChange($event)"
          />
          <p v-if="nameError" class="error-text">{{ nameError }}</p>
        </label>
      </div>
      <div class="input-row year">
        <label for="year" class="label" :class="{ error: yearError }">
          <h4 class="title">Year of creation</h4>
          <input
            class="input"
            id="year"
            placeholder="Enter the year"
            type="text"
            :value="yearOfCreation"
            @input="onYearChange($event)"
          />
          <p v-if="yearError" class="error-text">{{ yearError }}</p>
        </label>
      </div>
    </div>

    <DropZone
      :onDragEnter="onDragEnter"
      :onDragLeave="onDragLeave"
      class="drop-container"
      :class="{ active: isDropActive }"
    >
      <template v-if="!uploadedImageUrl">
        <span class="logo-container">
          <DropzoneIcon />
        </span>
        <div class="label">Drag and Drop file here</div>

        <label for="upload" class="upload-label">
          <div class="button-container">
            <Button :staticTheme="'dark'" :onClick="onUploadInputClick"
              >Select file</Button
            >
          </div>
          <input
            ref="uploadInputRef"
            class="upload-input"
            id="upload"
            type="file"
            @change="onFileUpload"
          />
        </label>

        <p class="drop-text">Image weight must be less than 3 MB</p>
        <span class="drop-types">.jpg, .png</span>
      </template>
      <div v-else class="image">
        <img :src="uploadedImageUrl" alt="" />
      </div>
    </DropZone>

    <div class="bottom">
      <div class="button-container">
        <Button
          :disabled="!uploadedImageUrl"
          :staticTheme="'dark'"
          :style="'filled'"
          type="submit"
        >
          Save
        </Button>
      </div>
    </div>
    <span class="types">.jpg, .png</span>
  </form>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, ref } from "vue";
import DropZone from "@/components/DropZone.vue";
import DropzoneIcon from "@/assets/icons/dropzone-icon.svg";
import CloseIcon from "@/assets/icons/close-icon.svg";
import UploadIcon from "@/assets/icons/upload-icon.svg";
import Button from "./Button.vue";

export default defineComponent({
  name: "UploadImageForm",
  components: {
    CloseIcon,
    UploadIcon,
    Button,
    DropzoneIcon,
    DropZone,
  },
  props: {
    onCloseClick: {
      type: Function,
      required: true,
    },
    onUpload: {
      type: Function,
      default: () => {},
    },
  },
  setup() {
    const conditions = ["jpeg", "jpg", "png"];
    const uploadInputRef = ref<HTMLInputElement>();

    const store = useStore();
    const isDropActive = ref<boolean>(false);

    const name = ref<string>("");
    const yearOfCreation = ref<string>("");
    const nameError = ref<string>("");
    const yearError = ref<string>("");

    const uploadedImage = computed(() => store.state.artist.uploadedFile);

    const onNameChange = (e: Event) => {
      name.value = (e.target as HTMLInputElement).value;
      nameError.value = "";
    };

    const onYearChange = (e: Event) => {
      yearOfCreation.value = (e.target as HTMLInputElement).value;
      yearError.value = "";
    };

    const onDragEnter = () => {
      isDropActive.value = true;
    };

    const onDragLeave = () => {
      isDropActive.value = false;
    };

    const onUploadInputClick = () => {
      uploadInputRef.value?.click();
    };

    const onFileUpload = (e: Event) => {
      const input = e.target as HTMLInputElement;

      if (!input.files) return;

      const file = input.files[0];
      const isFileValid = conditions.some((condition) =>
        file.type.includes(condition),
      );

      if (isFileValid) {
        store.commit("setUploadedFiles", file);
      }
    };

    const onFormSubmit = () => {
      if (!uploadedImage.value) return;

      const data = new FormData();
      data.append("image", uploadedImage.value);
      data.append("name", "Test");
      data.append("yearOfCreation", "1856");

      const payload = {
        name: name.value,
        yearOfCreation: yearOfCreation.value,
        image: uploadedImage.value,
      };

      store.dispatch("tryToAddPainting", payload);
    };

    return {
      name,
      yearOfCreation,
      nameError,
      yearError,
      onDragEnter,
      onDragLeave,
      isDropActive,
      uploadedImageUrl: computed(
        () => uploadedImage.value && URL.createObjectURL(uploadedImage.value),
      ),
      uploadInputRef,
      onUploadInputClick,
      onFileUpload,
      onFormSubmit,
      onNameChange,
      onYearChange,
    };
  },
});
</script>

<style lang="scss" scoped>
.upload-form {
  position: relative;
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

      &.name {
      }

      &.year {
      }

      .label {
        &.error {
          .input {
            border: 1px solid $InputError;
          }
        }

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
          border: 1px solid transparent;
          outline: none;

          font-size: 14px;

          &::placeholder {
            color: $UploadInputPlaceholder;
          }
        }

        .error-text {
          margin-top: 2px;

          font-weight: 400;
          font-size: 10px;
          line-height: 120%;
          color: $InputError;
        }
      }
    }
  }

  .drop-container {
    flex: 1 1 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    margin-bottom: 20px;
    padding: 15px;
    border: 3px dashed $UploadZoneBorder;
    background-color: $UploadInputBackground;
    border-radius: 8px;
    text-align: center;

    &.active {
      border: 3px solid $white;
    }

    .logo-container {
      display: none;
      width: 49px;
      height: 49px;
      margin-bottom: 16px;
    }

    .label {
      display: none;
      margin-bottom: 20px;

      font-weight: 400;
      font-size: 18px;
      line-height: 116%;
      color: $UploadText;
    }

    .upload-label {
      .button-container {
        width: 180px;
        height: 40px;
        margin-bottom: 12px;
      }

      .upload-input {
        display: none;
      }
    }

    .drop-text {
      width: 130px;

      font-weight: 300;
      font-size: 12px;
      line-height: 166%;
      color: $UploadZoneText;
    }

    .drop-types {
      position: absolute;
      bottom: 15px;
      left: 15px;

      font-weight: 400;
      font-size: 12px;
      line-height: 116%;
      color: $UploadText;
    }
  }

  .bottom {
    display: flex;
    justify-content: center;
    .button-container {
      width: 180px;
      height: 40px;
    }
  }

  .types {
    display: none;
    color: $UploadText;
    font-weight: 400;
    font-size: 14px;
    line-height: 114%;
  }

  @media ($tablet) {
    border-radius: 8px;

    .inputs {
      flex-direction: row;

      .input-row {
        flex: 1 1 auto;
        margin-bottom: 0;
        margin-right: 20px;

        &:last-child {
          margin-right: 0;
        }

        &.name {
        }

        &.year {
          flex: 0 0 30%;
        }
      }
    }

    .drop-zone {
      .logo-container,
      .label {
        display: block;
      }

      .drop-types {
        display: none;
      }
    }

    .types {
      display: block;
      position: absolute;
      bottom: 32px;
      left: 20px;
    }
  }
}
</style>