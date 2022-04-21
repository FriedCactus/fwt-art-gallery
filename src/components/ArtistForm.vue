<template>
  <form @submit.prevent="onSubmit" class="artist-form">
    <div class="top">
      <button class="close-button" type="button" @click="onCloseClick">
        <CloseIcon />
      </button>
    </div>
    <div class="photo">
      <div class="avatar">
        <img src="@/assets/images/avatar-mock.png" alt="Avatar" />
      </div>
      <button class="edit-button" type="button">Change Profile Photo</button>
    </div>
    <div class="inputs">
      <div class="input-container">
        <Input
          :placeholder="'Name'"
          :value="name"
          :onInput="setName"
          :style="'label'"
          :required="true"
        />
      </div>
      <div class="input-container">
        <Input
          :placeholder="'Years of life'"
          :value="years"
          :onInput="setYears"
          :style="'label'"
        />
      </div>
      <div class="input-container">
        <Input
          :placeholder="'Location'"
          :value="location"
          :onInput="setLocation"
          :style="'label'"
        />
      </div>
      <div class="input-container">
        <Select
          :placeholder="'Genres'"
          :required="true"
          :style="'label'"
          :staticTheme="'light'"
          :options="genres"
          :values="selctedGenres"
          :onUpdate="updateGenres"
        />
      </div>

      <div class="textarea-container">
        <TextareaVue
          :placeholder="'Description'"
          :value="description"
          :onInput="setDescription"
        />
      </div>
    </div>
    <div class="save-button">
      <Button :staticTheme="'light'" :style="'filled'" type="submit">
        Save
      </Button>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Input from "@/ui/Input.vue";
import TextareaVue from "@/ui/Textarea.vue";
import Select from "@/ui/Select.vue";
import { useStore } from "@/store";
import { TAddArtistBody } from "@/api";
import { TGenre } from "@/types";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ArtistForm",
  props: {
    isEdit: {
      type: Boolean,
    },
  },
  components: { CloseIcon, Button, Input, TextareaVue, Select },
  setup(props) {
    const route = useRoute();
    const { artistId } = route.params;

    const store = useStore();
    const artist = computed(() => store.state.artist.artist);
    const genres = computed(() => store.state.filters.genres);

    const name = ref<string>("");
    const years = ref<string>("");
    const location = ref<string>("");
    const description = ref<string>("");
    const selctedGenres = ref<TGenre[]>([]);

    onBeforeMount(() => {
      if (artist.value && props.isEdit) {
        name.value = artist.value.name;
        years.value = artist.value.yearsOfLife;
        description.value = artist.value.description;
        selctedGenres.value = artist.value.genres;
      }
    });

    const setName = (e: Event) => {
      name.value = (e.target as HTMLInputElement).value;
    };

    const setYears = (e: Event) => {
      years.value = (e.target as HTMLInputElement).value;
    };

    const setLocation = (e: Event) => {
      location.value = (e.target as HTMLInputElement).value;
    };

    const setDescription = (e: Event) => {
      description.value = (e.target as HTMLTextAreaElement).value;
    };

    const updateGenres = (value: TGenre[]) => {
      selctedGenres.value = value;
    };

    const onCloseClick = () => {
      if (props.isEdit) {
        store.commit("setIsEditArtistModalOpen", false);
      } else {
        store.commit("setIsAddArtistModalOpen", false);
      }
    };

    const onSubmit = async () => {
      const payload: TAddArtistBody = {
        description: description.value,
        genres: selctedGenres.value,
        name: name.value,
        yearsOfLife: years.value,
      };

      if (props.isEdit) {
        await store.dispatch("tryToPatchArtist", payload);
        await store.dispatch("fetchArtistById", artistId);
      } else {
        await store.dispatch("tryToAddArtist", payload);
        await store.dispatch("fetchArtistsStatic");
      }

      onCloseClick();
    };

    return {
      name,
      setName,
      years,
      setYears,
      location,
      setLocation,
      description,
      setDescription,
      genres,
      selctedGenres,
      onCloseClick,
      onSubmit,
      updateGenres,
    };
  },
});
</script>

<style lang="scss" scoped>
.artist-form {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 30px 15px;
  background-color: $white;
  overflow-y: auto;

  .top {
    position: absolute;
    top: 15px;
    right: 15px;

    .close-button {
      cursor: pointer;
      background: transparent;
      outline: none;
      border: none;
      width: 12px;
      height: 12px;

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
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    .input-container {
      width: 100%;
      margin-bottom: 20px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    .textarea-container {
      flex: 1 1 auto;
    }
  }

  .save-button {
    width: 100%;
    height: 40px;
  }

  @media ($tablet) {
    padding: 40px 60px;

    .top {
      top: 20px;
      right: 20px;
    }
  }
}
</style>