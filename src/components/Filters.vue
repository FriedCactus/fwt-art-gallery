<template>
  <div class="filters">
    <div class="button">
      <Button :onClick="onAddClick">ADD ARTIST</Button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import Button from "@/ui/Button.vue";
import bodyLock from "@/utils/bodyLock";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Filters",
  components: {
    Button,
  },
  setup() {
    const store = useStore();

    const onAddClick = () => {
      store.commit("setIsAddArtistModalOpen", true);
      bodyLock(true);
    };

    return {
      onAddClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;

  .button {
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

    .button {
      flex: 0 0 25%;
      margin-bottom: 0;
      margin-right: 20px;
    }
  }
}
</style>