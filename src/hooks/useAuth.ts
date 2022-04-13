import { useStore } from "@/store";
import { useCookies } from "@vueuse/integrations/useCookies";
import { computed } from "vue";

const useAuth = () => {
  const store = useStore();
  const cookies = useCookies();

  store.commit("setTokens", {
    accessToken: cookies.get("accessToken") || "",
    refreshToken: cookies.get("refreshToken") || "",
  });

  const access = computed(() => store.state.auth.accessToken);
  const refresh = computed(() => store.state.auth.refreshToken);
  const isAccess = computed(() => !!access.value);

  if (isAccess.value) store.commit("setIsAuth", true);

  const setLoginCookies = () => {
    cookies.set("accessToken", access.value);
    cookies.set("refreshToken", refresh.value);
  };

  const clearLoginCookies = () => {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  };

  return { isAccess, setLoginCookies, clearLoginCookies };
};

export default useAuth;
