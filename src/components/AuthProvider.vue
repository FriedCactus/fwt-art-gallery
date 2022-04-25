<template>
  <slot />
</template>

<script lang="ts" setup>
import useAuth from "@/hooks/useAuth";
import { useStore } from "@/store";
import { onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const { isAccess, setLoginCookies, refreshToken } = useAuth();

onMounted(async () => {
  if (!isAccess.value && refreshToken) {
    await store.dispatch("tryToRefresh", refreshToken);

    if (!isAccess.value) {
      router.push({
        name: "home",
      });
    }
  }
});

watch(isAccess, (newValue) => {
  if (newValue) {
    setLoginCookies();
  }
});
</script>