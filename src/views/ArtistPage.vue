<template>
  <div class="artist-page" :class="theme">
    <div class="artist-info">
      <div class="left">
        <div class="portrait">
          <picture v-if="artist?.avatar">
            <source
              :srcset="`${api}/${artist.avatar.webp}`"
              type="image/webp"
            />
            <img :srcset="`${api}/${artist.avatar.src}`" alt="artist.name" />
          </picture>
        </div>
        <button class="edit-button">
          <EditIcon />
          EDIT
        </button>
        <h3 class="artist-name">{{ artist?.name }}</h3>
        <div class="years">{{ artist?.yearsOfLife }}</div>
      </div>

      <div class="right">
        <div class="biography">
          <p class="first-part">
            {{ artist?.description }}
          </p>
          <!-- Вторая часть описания, раскомментить если будет -->
          <!--  <p class="second-part" :class="{ active: isTextShown }">
            Experienced the influence of realists in the person of his friend
            Gustave Courbet and the Pre-Raphaelites, as well as Japanese art. In
            a number of creative methods it was close to impressionism.
          </p>
          <button
            @click="onShowButtonClick"
            class="show-all"
            :class="{ active: isTextShown }"
          >
            <span class="text">{{
              isTextShown ? "SHOW LESS" : "SHOW ALL"
            }}</span>
            <ArrowIcon />
          </button> -->
          <div class="country">London, Great Britain</div>
        </div>

        <div v-if="artist?.genres.length" class="tags">
          <span
            v-for="genre in artist.genres"
            :key="genre._id"
            class="tag-item"
          >
            <Tag>{{ genre.name }}</Tag>
          </span>
        </div>
      </div>
    </div>
    <div class="paintings">
      <CardsGrid
        :favouriteId="artist?.mainPainting._id"
        :paintings="artist?.paintings"
        :onPaintingClick="onPaintingClick"
      />
    </div>
    <PaintingModal v-if="isPaintingModalOpen" :onClose="onModalCLose" />
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import EditIcon from "@/assets/icons/edit_icon.svg";
import ArrowIcon from "@/assets/icons/arrow.svg";
import Tag from "@/ui/Tag.vue";
import CardsGrid from "@/ui/CardsGrid.vue";
import PaintingModal from "@/components/PaintingModal.vue";
import bodyLock from "@/utils/bodyLock";

export default defineComponent({
  name: "ArtistPage",
  components: {
    EditIcon,
    ArrowIcon,
    Tag,
    CardsGrid,
    PaintingModal,
  },

  setup() {
    const store = useStore();
    const route = useRoute();
    const { artistId } = route.params;

    const api = process.env.VUE_APP_BASE_URL;

    const isTextShown = ref<boolean>(false);
    const isPaintingModalOpen = ref<boolean>(false);

    // Скролл лок при открытии модалки
    watch(isPaintingModalOpen, (value) => {
      bodyLock(value);
    });

    onMounted(() => {
      if (typeof artistId === "string") {
        store.dispatch("fetchArtistById", artistId);
      }
    });

    const onShowButtonClick = () => {
      isTextShown.value = !isTextShown.value;
    };

    const onModalCLose = () => {
      isPaintingModalOpen.value = false;
    };

    const onPaintingClick = (index: number) => {
      store.commit("setActiveSlide", index);
      isPaintingModalOpen.value = true;
      bodyLock(true);
    };

    return {
      theme: computed(() => store.state.settings.theme),
      artist: computed(() => store.state.artist.artist),
      onShowButtonClick,
      isTextShown,
      isPaintingModalOpen,
      onPaintingClick,
      onModalCLose,
      api,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-page {
  display: flex;
  flex-direction: column;

  @media ($desktop) {
    flex-direction: row;
  }

  .artist-info {
    display: flex;
    flex-direction: column;

    @media ($tablet) {
      flex-direction: row;
      margin-bottom: 40px;
    }

    @media ($desktop) {
      flex: 0 0 455px;
      flex-direction: column;
      margin: 0 95px 0 0;
    }

    .left {
      display: flex;
      flex-direction: column;

      @media ($tablet) {
        flex: 0 0 calc(50% - 20px);
        margin-right: 20px;
      }

      @media ($desktop) {
        flex: 1 1 auto;
        margin-right: 0;
      }

      .portrait {
        margin-bottom: 10px;
      }

      .edit-button {
        cursor: pointer;
        align-self: flex-end;
        margin-bottom: 20px;
        font-family: Roboto;
        font-weight: 700;
        font-size: 14px;
        line-height: 114%;
        transition: color 0.3s ease;
        background-color: transparent;
        border: none;
        outline: none;

        svg {
          margin-right: 5px;

          :deep(path) {
            transition: fill 0.3s ease;
          }
        }
      }

      .artist-name {
        font-weight: 900;
        font-size: 22px;
        line-height: 118%;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 10px;

        @media ($tablet) {
          text-align: left;
          font-size: 26px;
        }
      }

      .years {
        font-weight: 400;
        font-size: 14px;
        line-height: 114%;
        color: $lightGrey;
        text-align: center;
        margin-bottom: 30px;

        @media ($tablet) {
          text-align: left;
          margin-bottom: 0;
        }

        @media ($desktop) {
          margin-bottom: 22px;
        }
      }
    }

    .right {
      display: flex;
      flex-direction: column;
      font-size: 14px;

      .biography {
        line-height: 200%;
        margin-bottom: 5px;

        .first-part {
          margin-bottom: 10px;
        }

        .second-part {
          display: none;
          margin-bottom: 5px;

          &.active {
            display: inline;
          }
        }

        .show-all {
          display: flex;
          align-items: center;
          cursor: pointer;
          height: 16px;
          line-height: 114%;
          background-color: transparent;
          border: none;
          outline: none;
          margin-bottom: 20px;

          .text {
            text-decoration: underline dashed;
          }

          svg {
            transition: transform 0.3s ease;
            margin-left: 5px;
            width: 13px;
            height: 7px;
          }

          &.active {
            svg {
              transform: rotate(180deg);
            }
          }
        }

        .country {
          color: $lightGrey;
          font-weight: 400;
          font-size: 14px;
          line-height: 114%;
          font-variant: small-caps;
          text-transform: uppercase;
          margin-bottom: 30px;

          @media ($tablet) {
            margin-bottom: 40px;
          }
        }
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .tag-item {
          margin: 0 20px 20px 0;
          width: auto;

          &:last-child {
            margin-right: 0;
          }

          @media ($tablet) {
            margin-right: 20px;
          }
        }
      }
    }
  }

  .paintings {
  }

  &.dark {
    .artist-info {
      color: $SecondaryColorDark;

      .left {
        .edit-button {
          color: $SecondaryColorDark;

          svg {
            :deep(path) {
              fill: $SecondaryColorDark;
            }
          }

          &:hover,
          &:active {
            color: $LinkActiveDark;

            svg {
              :deep(path) {
                fill: $LinkActiveDark;
              }
            }
          }
        }
      }

      .right {
        .biography {
          .show-all {
            color: $ShowAllDark;

            svg {
              :deep(path) {
                fill: $ShowAllDark;
              }
            }
          }
        }
      }
    }
  }

  &.light {
    color: $SecondaryColorLight;

    .artist-info {
      .left {
        .edit-button {
          color: $SecondaryColorLight;

          svg {
            :deep(path) {
              fill: $SecondaryColorLight;
            }
          }

          &:hover,
          &:active {
            color: $LinkActiveLight;

            svg {
              :deep(path) {
                fill: $LinkActiveLight;
              }
            }
          }
        }
      }

      .right {
        .biography {
          .show-all {
            color: $ShowAllLight;

            svg {
              :deep(path) {
                fill: $ShowAllLight;
              }
            }
          }
        }
      }
    }
  }
}
</style>