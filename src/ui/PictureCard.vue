<template>
  <div class="picture-card">
    <img :src="require(`../assets/mocks/images/${imgUrl}`)" alt="" />

    <div class="label">
      <div class="top-row">
        <h3 class="title">{{ author }}</h3>
        <div class="years" v-if="years">{{ years }}</div>
      </div>
      <div class="bottom-row">
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "PictureCard",
  props: {
    author: {
      type: String,
      required: true,
    },
    imgUrl: {
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
});
</script>

<style lang="scss" scoped>
.picture-card {
  position: relative;
  border-radius: 4px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
  }

  .label {
    display: flex;
    flex-direction: column;

    cursor: pointer;
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

    @media ($laptop) {
      &:hover {
        padding: 10px 15px;
        transform: translateY(calc(-100% + 30px));
      }
    }

    .top-row {
      @media ($tablet) {
        margin-bottom: 15px;
      }

      .title {
        font-weight: 500;
        font-size: 12px;
        line-height: 111%;
        text-transform: capitalize;
        color: $black;

        @media ($tablet) {
          font-weight: 700;
          font-size: 18px;
        }
      }
      .years {
        font-weight: 300;
        font-size: 13px;
        line-height: 115%;
        color: $darkGrey;
      }
    }

    .bottom-row {
      display: none;

      @media ($tablet) {
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
