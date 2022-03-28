import Button from "../ui/Button.vue";

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Click</Button>',
});

export default {
  title: "Button",
  components: Button,
  decorators: [
    () => ({
      template: '<div style="width: 180px; height: 40px;" ><story /></div>',
    }),
  ],
  args: {},
};

export const DarkFilled = Template.bind({});
DarkFilled.args = {};

export const LightFilled = Template.bind({});
LightFilled.args = {
  theme: "light",
};

export const DarkOutlined = Template.bind({});
DarkOutlined.args = {
  style: "outlined",
};

export const LightOutlined = Template.bind({});
LightOutlined.args = {
  theme: "light",
  style: "outlined",
};
