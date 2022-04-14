import { useStore } from "@/store";
import { useCookies } from "@vueuse/integrations/useCookies";
import { computed } from "vue";

// Логика слишком разбросана по хуку, может получится сделать получше
const useAuth = () => {
  const store = useStore();
  const cookies = useCookies();

  const access = computed(() => store.state.auth.accessToken);
  const refresh = computed(() => store.state.auth.refreshToken);
  const expires = computed(() => store.state.auth.expires);

  store.commit("setTokens", {
    accessToken: cookies.get("access_token") || "",
    refreshToken: cookies.get("refresh_token") || "",
    expires: cookies.get("expires_at") || 0,
  });

  const isAccess = computed(() => !!access.value && Date.now() < expires.value);

  if (isAccess.value) store.commit("setIsAuth", true);

  const setLoginCookies = () => {
    cookies.set("access_token", access.value);
    cookies.set("refresh_token", refresh.value);
    cookies.set("expires_at", expires.value);
  };

  const clearLoginCookies = () => {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    cookies.remove("expires_at");
  };

  return {
    isAccess,
    setLoginCookies,
    clearLoginCookies,
    refreshToken: refresh.value,
  };
};

export default useAuth;
