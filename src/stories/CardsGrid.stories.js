import CardsGrid from "../ui/CardsGrid.vue";

const Template = (args) => ({
  components: { CardsGrid },
  setup() {
    return {
      args,
    };
  },
  template: "<CardsGrid />",
});

export default {
  title: "CardsGrid",
};

export const Grid = Template.bind({});
