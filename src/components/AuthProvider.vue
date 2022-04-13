<template>
  <slot />
</template>

<script lang="ts">
import useAuth from "@/hooks/useAuth";
import { defineComponent, watch } from "vue";

export default defineComponent({
  name: "AuthProvider",
  setup() {
    const { isAccess, setLoginCookies } = useAuth();

    watch(isAccess, (newValue) => {
      if (newValue) {
        setLoginCookies();
      }
    });
  },
});
</script>