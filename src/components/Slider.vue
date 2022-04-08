<template>
  <div class="slider">
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
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useStore } from "@/store";

export default defineComponent({
  components: {
    Swiper,
    SwiperSlide,
  },

  setup() {
    const store = useStore();

    const api = process.env.VUE_APP_BASE_URL;

    const onSlideChange = (swiper: any) => {
      store.commit("setActiveSlide", swiper.realIndex);
    };

    return {
      api,
      paintings: computed(() => store.state.gallery.artistPaintings),
      modules: [Pagination],
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
</style>

<style lang="scss" scoped>
.slider {
  .slide {
    display: flex;
    padding-bottom: 30px;

    picture,
    img {
      width: 100%;
    }
  }
}
</style>