<template>
  <form @submit.prevent="" class="artist-form">
    <div class="top">
      <button class="close-button" type="button">
        <CloseIcon />
      </button>
    </div>
    <div class="photo">
      <div class="avatar">
        <img src="@/assets/images/avatar-mock.png" alt="Avatar" />
      </div>
      <button class="edit-button" type="button">Change Profile Photo</button>
    </div>
    <div class="inputs">Inputs</div>
    <div class="save-button">
      <Button :staticTheme="'light'" :style="'filled'">Save</Button>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";

export default defineComponent({
  name: "ArtistForm",
  components: { CloseIcon, Button },
});
</script>

<style lang="scss" scoped>
.artist-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 15px 15px 30px;
  background-color: $white;

  .top {
    display: flex;
    justify-content: flex-end;

    .close-button {
      cursor: pointer;
      background: transparent;
      outline: none;
      border: none;

      svg {
        :deep(path) {
          fill: $black;
        }
      }
    }
  }

  .photo {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .avatar {
      width: 120px;
      height: 120px;
      margin-bottom: 12px;
    }

    .edit-button {
      background: transparent;
      border: none;
      outline: none;

      font-weight: 700;
      font-size: 14px;
      line-height: 114%;
      color: $black;
    }
  }

  .inputs {
    flex: 1 1 auto;
    margin-bottom: 20px;
  }

  .save-button {
    width: 100%;
    height: 40px;
  }
}
</style>