import { createRouter, createWebHistory } from "vue-router";

import { basePath } from "@/utils/constants";
import GalleryPage from "../views/GalleryPage.vue";
import ArtistPage from "../views/ArtistPage.vue";

const routes = [
  {
    name: "home",
    path: basePath,
    component: GalleryPage,
  },
  {
    path: `${basePath}/:artistId`,
    component: ArtistPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
