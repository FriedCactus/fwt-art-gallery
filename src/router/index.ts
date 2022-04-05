import { createRouter, createWebHistory } from "vue-router";

import GalleryPage from "../views/GalleryPage.vue";
import ArtistPage from "../views/ArtistPage.vue";

const basePath = process.env.VUE_APP_BASE_PATH;

const routes = [
  {
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
