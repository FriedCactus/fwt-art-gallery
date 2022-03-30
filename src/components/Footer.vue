<template>
  <footer class="footer" :class="theme">
    <div class="top">
      <p class="text">
        Проект реализован в рамках стажировки для Frontend-разработчиков от
        компании <Link :bold="true">Framework Team</Link>
      </p>
      <div class="social">
        <a href="#" class="link" aria-label="FB">
          <FbDark v-if="theme === 'dark'" />
          <FbLight v-else />
        </a>
        <a href="#" class="link" aria-label="VK">
          <VkDark v-if="theme === 'dark'" />
          <VkLight v-else />
        </a>
        <a href="#" class="link" aria-label="Instagram">
          <InstDark v-if="theme === 'dark'" />
          <InstLight v-else />
        </a>
      </div>
    </div>
    <div class="bottom">
      <p class="text">Иванов Иван, 2022</p>
    </div>
  </footer>
</template>

<script lang="ts">
import Link from "@/ui/Link.vue";
import { computed, defineComponent } from "vue";
import FbDark from "@/assets/icons/fb_dark.svg";
import VkDark from "@/assets/icons/vk_dark.svg";
import InstDark from "@/assets/icons/inst_dark.svg";
import FbLight from "@/assets/icons/fb_light.svg";
import VkLight from "@/assets/icons/vk_light.svg";
import InstLight from "@/assets/icons/inst_light.svg";
import { useStore } from "@/store";

export default defineComponent({
  name: "Footer",
  components: {
    Link,
    FbDark,
    VkDark,
    InstDark,
    FbLight,
    VkLight,
    InstLight,
  },
  setup() {
    const store = useStore();

    return {
      theme: computed(() => store.state.theme.theme),
    };
  },
});
</script>

<style lang="scss" scoped>
.footer {
  padding: 30px 0 15px;
  font-weight: 400;
  font-size: 14px;
  line-height: 126%;

  @media ($tablet) {
    padding: 20px 0;
  }

  .top {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;

    @media ($tablet) {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .text {
      margin-bottom: 15px;

      @media ($tablet) {
        margin-bottom: 0;
        font-size: 16px;
        max-width: 420px;
      }

      @media ($laptop) {
        font-weight: 700;
      }
    }

    .social {
      display: flex;
      .link {
        text-decoration: none;
        width: 22px;
        height: 22px;
        margin-right: 15px;

        @media ($tablet) {
          margin-right: 20px;
        }

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

  .bottom {
    .text {
      line-height: 114%;
    }
  }

  &.dark {
    border-top: 2px solid $FooterColorDark;

    .top {
      .text {
        color: $SecondaryColorDark;
      }
    }

    .bottom {
      .text {
        color: $FooterColorDark;
      }
    }
  }

  &.light {
    border-top: 2px solid $FooterColorLight;

    .top {
      .text {
        color: $SecondaryColorLight;
      }
    }

    .bottom {
      .text {
        color: $FooterColorLight;
      }
    }
  }
}
</style>