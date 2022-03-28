import FavouriteButton from "../ui/FavouriteButton.vue";

export default {
  title: "IconButton",
};

export const Favourite = () => ({
  components: { FavouriteButton },
  template: '<div style="width: 30px; height: 30px" ><FavouriteButton /></div>',
});

export const FavouriteActive = () => ({
  components: { FavouriteButton },
  template:
    '<div style="width: 30px; height: 30px" ><FavouriteButton :isActive="true" /></div>',
});
