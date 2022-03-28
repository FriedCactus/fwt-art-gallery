import PictureCard from "../ui/PictureCard.vue";

const Template = (args) => ({
  components: { PictureCard },
  setup() {
    return { args };
  },
  template: '<PictureCard v-bind="args" />',
});

export default {
  title: "PictureCard",
  components: PictureCard,
  decorators: [
    () => ({
      template: '<div style="width: 360px; height: 300px;" ><story /></div>',
    }),
  ],
  args: {
    author: "Author",
    name: "Painting",
    imgUrl: "card_mock.jpeg",
  },
};

export const Basic = Template.bind({});
Basic.args = {};

export const CreatedProp = Template.bind({});
CreatedProp.args = {
  created: 1931,
};

export const YearsProp = Template.bind({});
YearsProp.args = {
  years: "(1904-1989)",
};

export const Full = Template.bind({});
Full.args = {
  created: 1931,
  years: "(1904-1989)",
};
