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
          <FavouriteButton
            :isActive="isFavourite"
            :onClick="onFavouriteClick"
          />
        </span>
        <span class="button-container">
          <EditButton />
        </span>
        <span class="button-container">
          <RemoveButton />
        </span>
      </div>

      <div class="slider-item">
        <Slider />
      </div>

      <div class="info">
        <div class="item">{{ info.description }}</div>
        <div class="item">{{ info.year }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/store";
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
    const store = useStore();
    const route = useRoute();

    const { artistId } = route.params;
    const paintingId = computed(
      () =>
        store.state.artist.artist?.paintings[store.state.artist.activeSlide]
          ._id,
    );
    const mainPaintingId = computed(
      () => store.state.artist.artist?.mainPainting._id,
    );
    const isFavourite = computed(
      () => mainPaintingId.value === paintingId.value,
    );

    const info = computed(() => {
      const { activeSlide } = store.state.artist;
      const description =
        store.state.artist.artist?.paintings[activeSlide]?.name;
      const year =
        store.state.artist?.artist?.paintings[activeSlide].yearOfCreation;

      return { description, year };
    });

    const onFavouriteClick = () => {
      if (paintingId.value) {
        store.dispatch("tryToPatchMainPainting", {
          artistId,
          paintingId: paintingId.value,
        });
      }
    };

    return {
      info,
      onFavouriteClick,
      isFavourite,
    };
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

  @media ($tablet) {
    padding: 20px 50px;
  }

  .top-row {
    align-self: flex-end;
    margin-bottom: 95px;

    @media (orientation: landscape) {
      margin-bottom: 10px;
    }

    @media ($tablet) {
      margin-bottom: 170px;

      @media (orientation: landscape) {
        margin-bottom: 20px;
      }
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
    margin: 0 auto;
    max-width: 100%;

    @media (orientation: landscape) {
      margin-bottom: 10px;
      max-width: 310px;
    }

    @media ($tablet) {
      @media (orientation: portrait) {
        max-width: 620px;
      }

      @media (orientation: landscape) {
      }
    }

    @media ($laptop) {
      @media (orientation: portrait) {
        max-width: 700px;
      }

      @media (orientation: landscape) {
        max-width: 700px;
      }
    }

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

      @media ($tablet) {
        margin-bottom: 20px;
      }
    }

    .info {
      align-self: center;

      display: flex;
      flex-direction: column;
      align-items: center;

      font-weight: 500;
      font-size: 13px;
      line-height: 115%;
      color: $ArtisPageInfo;

      @media ($tablet) {
        flex-direction: row;
      }

      .item {
        margin-bottom: 15px;
        padding: 12px 20px;
        border-radius: 8px;

        @media ($tablet) {
          margin-bottom: 0;
          margin-right: 20px;

          &:last-child {
            margin-right: 0;
          }
        }

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