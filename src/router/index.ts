import { createRouter, createWebHistory } from "vue-router";
import GalleryPage from "../views/GalleryPage.vue";

const basePath = "/fwt-art-gallery";

const routes = [
  {
    path: basePath,
    component: GalleryPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
