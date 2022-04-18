<template>
  <!-- eslint-disable max-len -->
  <div class="picture-card" :class="{ static: !artist?.mainPainting }">
    <template v-if="artist">
      <picture v-if="artist.mainPainting">
        <source
          :srcset="`${api}${artist.mainPainting?.image.webp}`"
          type="image/webp"
        />
        <img
          :srcset="`${api}${artist.mainPainting?.image.src}`"
          :alt="artist.name"
        />
      </picture>
      <div v-else class="mock">
        <div class="logo">
          <PaintingMock />
        </div>
        <p class="text">
          The paintings of this artist have not been uploaded yet
        </p>
      </div>

      <div class="label full" :class="{ interactive: artist.mainPainting }">
        <div class="top-row">
          <h3 class="title">{{ artist.name }}</h3>
          <div class="years" v-if="artist.yearsOfLife">
            {{ artist.yearsOfLife }}
          </div>
        </div>
        <div v-if="artist.mainPainting" class="bottom-row">
          <div class="item">
            <span>Name: </span>
            <p class="text">{{ artist.mainPainting.name }}</p>
          </div>
          <div class="item" v-if="artist.mainPainting.yearOfCreation">
            <span>Created: </span>
            <p class="text">{{ artist.mainPainting.yearOfCreation }}</p>
          </div>
        </div>
      </div>
    </template>

    <template v-if="painting">
      <picture>
        <source
          :srcset="`${api}${painting.image.webp}, ${api}${painting.image.webp2x} 2x`"
          type="image/webp"
        />
        <img
          :srcset="`${api}${painting.image.src}, ${api}${painting.image.src2x} 2x`"
          :alt="painting.name"
        />
      </picture>

      <div class="top-menu">
        <span class="button-container">
          <FavouriteButton
            :onClick="onFavouriteClick"
            :isActive="isFavourite"
          />
        </span>
        <span class="button-container">
          <RemoveButton :onClick="onRemoveClick" />
        </span>
        <span class="button-container">
          <EditButton :onClick="onEditClick" />
        </span>
      </div>

      <div class="label">
        <div class="top-row">
          <h3 class="title">
            {{ painting.name }}, {{ painting.yearOfCreation }}
          </h3>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { useRoute } from "vue-router";
import { useStore } from "@/store";
import { defineComponent, PropType } from "vue";
import type { TArtistStatic, TPainting } from "@/types";
import bodyLock from "@/utils/bodyLock";
import PaintingMock from "@/assets/images/painting-mock.svg";
import EditButton from "./EditButton.vue";
import FavouriteButton from "./FavouriteButton.vue";
import RemoveButton from "./RemoveButton.vue";

export default defineComponent({
  name: "PictureCard",
  props: {
    artist: Object as PropType<TArtistStatic>,
    painting: Object as PropType<TPainting>,
    isFavourite: Boolean,
  },
  components: {
    EditButton,
    FavouriteButton,
    RemoveButton,
    PaintingMock,
  },
  setup(props) {
    const api = process.env.VUE_APP_BASE_URL;

    const store = useStore();
    const route = useRoute();
    const { artistId } = route.params;

    const setActivePainting = () => {
      if (props.painting) {
        store.commit("setActivePaintingId", props.painting._id);
      }
    };

    const onFavouriteClick = () => {
      if (props.painting) {
        store.dispatch("tryToPatchMainPainting", {
          artistId,
          paintingId: props.painting._id,
        });
      }
    };

    const onRemoveClick = () => {
      setActivePainting();
      store.commit("setIsConfirmRemoveModalOpen", true);

      bodyLock(true);
    };

    const onEditClick = () => {
      setActivePainting();
      store.commit("setIsEditPaintingModalOpen", true);

      bodyLock(true);
    };

    return {
      api,
      onFavouriteClick,
      onRemoveClick,
      onEditClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.picture-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 100%;

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

  @media ($laptop) {
    &:hover {
      .top-menu {
        transform: translateY(0);
      }
    }
  }

  &.static {
    border: 1px solid $StaticPictureCardBorder;
  }

  .mock {
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 8px 13px 33px;
    background-color: $black;

    .logo {
      margin-bottom: 8px;
      width: 35px;
      height: 35px;
    }

    .text {
      font-weight: 400;
      font-size: 10px;
      line-height: 120%;
      text-transform: uppercase;
      color: $StaticPictureCardText;
    }

    @media ($tablet) {
      padding: 16px 37px 46px;

      .text {
        font-size: 14px;
      }

      .logo {
        margin-bottom: 10px;
        width: 70px;
        height: 70px;
      }
    }

    @media ($laptop) {
      padding: 27px 40px 54px;

      .text {
        font-size: 16px;
      }

      .logo {
        margin-bottom: 31px;
        width: 110px;
        height: 110px;
      }
    }
  }

  .top-menu {
    position: absolute;
    display: flex;
    top: 20px;
    right: 20px;
    transform: translateY(-300%);
    transition: transform 0.5s ease;

    .button-container {
      margin-right: 10px;
      width: 30px;
      height: 30px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .label {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;

    position: absolute;
    top: calc(100% - 26px);
    left: 0;
    width: 100%;
    height: 26px;

    background-color: #ffffffbf;
    padding: 5px 15px;
    transition: all 0.3s ease;

    @media ($tablet) {
      height: auto;
      top: calc(100% - 29px);
    }

    &.full {
      &.interactive {
        @media ($laptop) {
          &:hover {
            padding: 10px 15px;
            transform: translateY(calc(-100% + 30px));
          }
        }
      }
    }

    .top-row {
      @media ($tablet) {
        margin-bottom: 15px;
      }

      .title {
        height: 100%;

        font-weight: 500;
        font-size: 12px;
        line-height: 111%;
        text-transform: capitalize;
        color: $black;

        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;

        @media ($tablet) {
          font-weight: 700;
          font-size: 18px;
        }

        @media ($laptop) {
          margin-bottom: 5px;
        }
      }
      .years {
        display: none;
        font-weight: 300;
        font-size: 13px;
        line-height: 115%;
        color: $darkGrey;

        @media ($laptop) {
          display: block;
        }
      }
    }

    .bottom-row {
      display: none;

      @media ($laptop) {
        display: block;
      }

      .item {
        display: flex;
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 142%;
        color: $black;

        &:last-child {
          margin-bottom: 0;
        }

        span {
          font-weight: 500;
          margin-right: 6px;
        }
        .text {
          font-weight: 300;
        }
      }
    }
  }
}
</style>
