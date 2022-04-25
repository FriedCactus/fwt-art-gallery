<template>
  <div class="filters">
    <div class="filter-container">
      <Button :onClick="onAddClick">ADD ARTIST</Button>
    </div>
    <div class="filter-container">
      <Input
        :placeholder="'Name'"
        :value="nameSearch"
        :onInput="nameSearchUpdate"
      ></Input>
    </div>
    <div class="filter-container">
      <Select
        :placeholder="'Genres'"
        :options="genres"
        :values="selectedGenres"
        :onUpdate="selectedGenresUpdate"
      />
    </div>
    <div class="filter-container">Sort by</div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
import Button from "@/ui/Button.vue";
import Input from "@/ui/Input.vue";
import Select from "@/ui/Select.vue";
import { computed, ref } from "vue";

const store = useStore();

const genres = computed(() => store.state.filters.genres);

const nameSearch = ref<string>("");
const selectedGenres = ref([]);

const nameSearchUpdate = (e: Event) => {
  nameSearch.value = (e.target as HTMLInputElement).value;
};

const selectedGenresUpdate = (arr: any) => {
  selectedGenres.value = arr;
};

const onAddClick = () => {
  store.commit("setIsAddArtistModalOpen", true);
};
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .filter-container {
    width: 100%;
    height: 40px;
    margin-bottom: 15px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media ($tablet) {
    flex-direction: row;
    margin-bottom: 40px;

    .filter-container {
      flex: 0 0 25%;
      margin-bottom: 0;
      margin-right: 20px;
    }
  }
}
</style>