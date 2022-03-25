<template>
  <div class="picture-card">
    <img src="../assets/mocks/images/card_mock.jpeg" alt="" />

    <div class="label">
      <div class="label-row">
        <h3 class="title">Name</h3>
        <div class="years">123546</div>
      </div>
      <div class="label-row">
        <div class="item">
          <span>Name: </span>
          <p class="text">Text</p>
        </div>
        <div class="item">
          <span>Created: </span>
          <p class="text">Text</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PictureCard",
  props: {
    image: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.picture-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
  }

  .label {
    display: flex;
    flex-direction: column;

    cursor: pointer;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;

    padding: 5px 15px;
    transition: 0.3s ease;

    background-color: #ffffffbf;

    &:hover {
      padding: 10px 15px;
    }

    .label-row {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }

      .title {
        font-weight: 700;
        font-size: 18px;
        line-height: 111%;
        text-transform: capitalize;
      }
      .years {
      }

      .item {
        .text {
        }
      }
    }
  }
}
</style>
