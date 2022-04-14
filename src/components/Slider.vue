<template>
  <div class="slider">
    <button class="slider-prev-button">
      <PrevIcon />
    </button>
    <Swiper
      @slideChange="onSlideChange"
      :initialSlide="activeSlide"
      :modules="modules"
      :pagination="{
        clickable: true,
        horizontalClass: `slider-pagination-horizontal`,
        bulletClass: `slider-bullet`,
        bulletActiveClass: `slider-active-bullet`,
      }"
      :navigation="{
        prevEl: `.slider-prev-button`,
        nextEl: `.slider-next-button`,
        disabledClass: `slider-button-disabled`,
      }"
      :keyboard="{
        enabled: true,
      }"
      :slider-per-view="1"
      :space-between="50"
    >
      <SwiperSlide v-for="painting in paintings" :key="painting._id">
        <div class="slide">
          <picture>
            <source
              :srcset="`${api}/${painting.image.webp2x} 2x`"
              media="(min-width: 768px)"
              type="image/webp"
            />
            <source
              :srcset="`${api}/${painting.image.src2x} 2x`"
              media="(min-width: 768px)"
            />
            <source
              :srcset="`${api}/${painting.image.webp}`"
              type="image/webp"
            />
            <img :srcset="`${api}/${painting.image.src}`" alt="painting.name" />
          </picture>
        </div>
      </SwiperSlide>
    </Swiper>
  </div>
  <button class="slider-next-button">
    <NextIcon />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Keyboard, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useStore } from "@/store";
import PrevIcon from "@/assets/icons/prev-arrow.svg";
import NextIcon from "@/assets/icons/next-arrow.svg";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
    PrevIcon,
    NextIcon,
  },

  setup() {
    const store = useStore();

    const api = process.env.VUE_APP_BASE_URL;

    const onSlideChange = (swiperInstance: any) => {
      store.commit("setActiveSlide", swiperInstance.realIndex);
    };

    return {
      api,
      paintings: computed(() => store.state.artist.artist?.paintings),
      modules: [Pagination, Keyboard, Navigation],
      onSlideChange,
      activeSlide: computed(() => store.state.artist.activeSlide),
    };
  },
});
</script>

<style lang="scss">
.slider-pagination-horizontal {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 1px !important;

  @media ($tablet) {
    bottom: 25px !important;
  }
}

.slider-bullet {
  display: inline-block;
  border-radius: 50%;
  margin: 0 4px;
  width: 12px;
  height: 12px;
  background-color: $SliderBullet;
}

.slider-active-bullet {
  width: 15px;
  height: 15px;
  background-color: $SliderBulletActive;
}

.slider-prev-button,
.slider-next-button {
  cursor: pointer;
  display: none;
  position: absolute;
  z-index: 5;
  width: 30px;
  height: 100%;
  border: none;
  outline: none;
  background-color: $SliderButton;

  @media ($tablet) {
    display: block;
  }
}

.slider-prev-button {
  top: 0;
  left: 0;
}

.slider-next-button {
  top: 0;
  right: 0;
}

.slider-button-disabled {
  cursor: auto;
  background-color: $SliderDisabledButton;
}
</style>

<style lang="scss" scoped>
.slider {
  .slide {
    display: flex;
    justify-content: center;
    padding-bottom: 30px;

    @media ($tablet) {
      padding-bottom: 0;
    }

    picture,
    img {
      width: 100%;
    }
  }
}
</style>