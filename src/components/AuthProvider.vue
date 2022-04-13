<template>
  <slot />
</template>

<script lang="ts">
import useAuth from "@/hooks/useAuth";
import { useStore } from "@/store";
import { defineComponent, onMounted, watch } from "vue";

export default defineComponent({
  name: "AuthProvider",
  setup() {
    const store = useStore();

    const { isAccess, setLoginCookies, refreshToken } = useAuth();

    onMounted(() => {
      if (!isAccess.value && refreshToken) {
        store.dispatch("tryToRefresh", refreshToken);
      }
    });

    watch(isAccess, (newValue) => {
      if (newValue) {
        setLoginCookies();
      }
    });
  },
});
</script>