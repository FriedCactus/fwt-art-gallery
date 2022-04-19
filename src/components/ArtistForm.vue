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
      <Button :staticTheme="'light'" :style="'filled'" type="submit"
        >Save</Button
      >
    </div>
  </form>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import CloseIcon from "@/assets/icons/close-icon.svg";
import Button from "@/ui/Button.vue";
import Input from "@/ui/Input.vue";
import TextareaVue from "@/ui/Textarea.vue";
import Select from "@/ui/Select.vue";
import { useStore } from "@/store";

export default defineComponent({
  name: "ArtistForm",
  components: { CloseIcon, Button, Input, TextareaVue, Select },
  setup() {
    const store = useStore();

    const name = ref<string>("");
    const years = ref<string>("");
    const location = ref<string>("");
    const description = ref<string>("");
    const selctedGenres = ref<string[]>([]);

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

    return {
      name,
      setName,
      years,
      setYears,
      location,
      setLocation,
      description,
      setDescription,
      genres: computed(() => store.state.filters.genres),
      selctedGenres,
    };
  },
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
}
</style>