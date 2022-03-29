import Link from "../ui/Link.vue";

const Template = (args) => ({
  components: { Link },
  setup() {
    return {
      args,
    };
  },
  template: '<Link v-bind="args">Link<Link />',
});

export default {
  title: "Link",
};

export const DarkLink = Template.bind({});
DarkLink.args = {
  theme: "dark",
};

export const LightLink = Template.bind({});
LightLink.args = {
  theme: "light",
};
