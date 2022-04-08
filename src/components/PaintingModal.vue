<template>
  <div class="painting-modal">
    <div class="top-row">
      <button @click="onClose()" class="close-button">
        <CloseIcon />
      </button>
    </div>

    <div class="bottom-row">
      <div class="menu">
        <span class="button-container">
          <FavouriteButton />
        </span>
        <span class="button-container">
          <EditButton />
        </span>
        <span class="button-container">
          <RemoveButton />
        </span>
      </div>

      <div class="slider-item"><Slider /></div>

      <div class="info">
        <div class="item">Arrangement in Grey and Black</div>
        <div class="item">1871</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import FavouriteButton from "@/ui/FavouriteButton.vue";
import RemoveButton from "@/ui/RemoveButton.vue";
import EditButton from "@/ui/EditButton.vue";
import Slider from "./Slider.vue";

export default defineComponent({
  components: {
    CloseIcon,
    FavouriteButton,
    RemoveButton,
    EditButton,
    Slider,
  },
  props: {
    onClose: {
      type: Function,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.painting-modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  padding: 15px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $ModalBackgroundMobile;
  z-index: 2;

  .top-row {
    align-self: flex-end;
    margin-bottom: 95px;

    @media ($tablet) {
      margin-bottom: 170px;
    }

    .close-button {
      cursor: pointer;
      background-color: transparent;
      outline: none;
      border: none;
      width: 12px;
      height: 12px;
    }
  }

  .bottom-row {
    display: flex;
    flex-direction: column;

    .menu {
      align-self: flex-end;
      display: flex;
      margin-bottom: 8px;

      .button-container {
        width: 30px;
        height: 30px;
        margin-right: 15px;

        &:last-child {
          margin-right: 0;
        }
      }
    }

    .slider-item {
      margin-bottom: 45px;
    }

    .info {
      align-self: center;
      font-weight: 500;
      font-size: 13px;
      line-height: 115%;
      color: $ArtisPageInfo;
      text-align: center;

      .item {
        margin-bottom: 15px;
        padding: 12px 20px;
        border-radius: 8px;

        background-color: $ArtisPageInfoBackground;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  @media ($tablet) {
    background-color: $ModalBackground;
  }
}
</style>