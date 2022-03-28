<template>
  <div class="picture-card">
    <img src="../assets/mocks/images/card_mock.jpeg" alt="" />

    <div class="label">
      <div class="label-row">
        <h3 class="title">{{ author }}</h3>
        <div class="years" v-if="years">{{ years }}</div>
      </div>
      <div class="label-row">
        <div class="item">
          <span>Name: </span>
          <p class="text">{{ name }}</p>
        </div>
        <div class="item" v-if="created">
          <span>Created: </span>
          <p class="text">{{ created }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PictureCard',
  props: {
    author: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    created: Number,
    years: String,
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
    top: calc(100% - 30px);
    left: 0;
    width: 100%;

    padding: 5px 15px;
    transition: all 0.3s ease;

    background-color: #ffffffbf;

    @media ($laptop) {
      &:hover {
        padding: 10px 15px;
        transform: translateY(calc(-100% + 30px));
      }
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
        margin-bottom: 5px;
        color: $black;
      }
      .years {
        font-weight: 300;
        font-size: 13px;
        line-height: 115%;
        color: $darkGrey;
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
