import PictureCard from "../ui/PictureCard.vue";

export default {
  title: "PictureCard",
  components: PictureCard,
  decorators: [
    () => ({
      template: '<div style="width: 360px; height: 300px;" ><story /></div>',
    }),
  ],
};

export const Main = () => ({
  components: { PictureCard },
  template: "<PictureCard />",
});
