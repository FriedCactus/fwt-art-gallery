<template>
  <div class="artist-page" :class="theme">
    <div class="artist-info">
      <div class="portrait">
        <img src="@/assets/mocks/images/artist.jpeg" alt="Mock" />
      </div>
      <button class="edit-button">
        <EditIcon />
        EDIT
      </button>

      <div class="bio">
        <h3 class="artist-name">James Whistler</h3>
        <div class="years">July 11, 1834 - July 17, 1903</div>
        <div class="biography">
          <p class="first-part">
            He studied in the Russian Empire and the United States, but spent
            most of his active life in England. He is best known for his
            portraits of his contemporaries.
          </p>
          <p class="second-part">
            Experienced the influence of realists in the person of his friend
            Gustave Courbet and the Pre-Raphaelites, as well as Japanese art. In
            a number of creative methods it was close to impressionism.
          </p>
          <button class="show-all">
            <span class="text">SHOW ALL</span>
            <ArrowIcon />
          </button>
          <div class="country">London, Great Britain</div>
        </div>
      </div>

      <div class="tags">
        <span class="tag-item">
          <Tag>weapons</Tag>
        </span>
        <span class="tag-item">
          <Tag>realistic</Tag>
        </span>
        <span class="tag-item">
          <Tag>anime & manga</Tag>
        </span>
        <span class="tag-item">
          <Tag> Unreal engine </Tag>
        </span>
      </div>
    </div>
    <div class="paintings">
      <CardsGrid :paintings="paintings" />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import EditIcon from "@/assets/icons/edit_icon.svg";
import ArrowIcon from "@/assets/icons/arrow.svg";
import Tag from "@/ui/Tag.vue";
import CardsGrid from "@/ui/CardsGrid.vue";

export default defineComponent({
  name: "ArtistPage",
  components: {
    EditIcon,
    ArrowIcon,
    Tag,
    CardsGrid,
  },

  setup() {
    const route = useRoute();
    const { artistId } = route.params;

    const store = useStore();

    onMounted(() => {
      if (typeof artistId === "string") {
        store.dispatch("fetchPaintingsByArtist", artistId);
      }
    });

    return {
      theme: computed(() => store.state.theme.theme),
      paintings: computed(() => store.state.gallery.artistPaintings),
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-page {
  display: flex;
  flex-direction: column;

  .artist-info {
    display: flex;
    flex-direction: column;

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

    .bio {
      font-size: 14px;

      .artist-name {
        font-weight: 900;
        font-size: 22px;
        line-height: 118%;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 10px;
      }

      .years {
        font-weight: 400;
        line-height: 114%;
        color: $lightGrey;
        text-align: center;
        margin-bottom: 30px;
      }

      .biography {
        line-height: 200%;
        margin-bottom: 5px;

        .first-part {
          margin-bottom: 10px;
        }

        .second-part {
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
            margin-left: 5px;
            width: 13px;
            height: 7px;
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
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 13px;

      .tag-item {
        margin: 0 30px 20px 0;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .paintings {
  }

  &.dark {
    .artist-info {
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

      .bio {
        color: $SecondaryColorDark;

        .artist-name {
        }

        .years {
        }

        .biography {
          .first-part {
          }

          .second-part {
          }

          .show-all {
            color: $ShowAllDark;

            svg {
              :deep(path) {
                fill: $ShowAllDark;
              }
            }
          }

          .country {
          }
        }
      }

      .tags {
        .tag {
        }
      }
    }
  }

  &.light {
    .artist-info {
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

      .bio {
        color: $SecondaryColorLight;

        .artist-name {
        }

        .years {
        }

        .biography {
          .first-part {
          }

          .second-part {
          }

          .show-all {
            color: $ShowAllLight;

            svg {
              :deep(path) {
                fill: $ShowAllLight;
              }
            }
          }

          .country {
          }
        }
      }

      .tags {
        .tag {
        }
      }
    }
  }
}
</style>