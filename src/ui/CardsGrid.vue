<template>
  <section class="cards-grid">
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
    <div class="card">
      <PictureCard
        :author="'Author'"
        :name="'Name'"
        :imgUrl="'card_mock.jpeg'"
      />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PictureCard from "./PictureCard.vue";

export default defineComponent({
  components: {
    PictureCard,
  },
});
</script>

<style lang="scss" scoped>
.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, auto);
  gap: 15px;

  @media ($tablet) {
    grid-template-columns: repeat(6, auto);
    gap: 20px;
  }

  .card {
    @media ($tablet) {
      grid-column: span 2;
    }
  }
}
</style>