import Button from "../ui/Button.vue";

const Template = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template: '<Button v-bind="args">Click</Button>',
});

const IconTemplate = (args) => ({
  components: { Button },
  setup() {
    return { args };
  },
  template:
    '<Button v-bind="args"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.6218 9.10563C15.4582 9.06459 15.2946 9.10563 15.1515 9.20822C14.6199 9.65964 14.0065 10.029 13.3317 10.2752C12.6978 10.5214 12.0026 10.6446 11.2665 10.6446C9.61027 10.6446 8.09716 9.96742 7.01345 8.87992C5.92974 7.79241 5.25498 6.27401 5.25498 4.61197C5.25498 3.91433 5.37766 3.2372 5.58213 2.62163C5.80706 1.96503 6.13421 1.36998 6.56361 0.857004C6.74763 0.631295 6.70674 0.302991 6.48182 0.118321C6.33869 0.0157259 6.17511 -0.0253121 6.01153 0.0157259C4.2735 0.487662 2.7604 1.53413 1.67668 2.92942C0.633869 4.30419 0 6.00726 0 7.87449C0 10.1111 0.899685 12.1424 2.3719 13.6198C3.84411 15.0972 5.8684 16 8.09716 16C9.97832 16 11.7163 15.3434 13.1068 14.2559C14.5176 13.1479 15.54 11.5679 15.9694 9.76223C16.0716 9.45445 15.9081 9.16718 15.6218 9.10563ZM12.4933 13.3941C11.3074 14.338 9.79429 14.9125 8.13806 14.9125C6.19556 14.9125 4.43708 14.1123 3.16934 12.8401C1.90161 11.5679 1.10416 9.80327 1.10416 7.85397C1.10416 6.23297 1.63579 4.75561 2.55592 3.56551C3.18979 2.74475 3.98724 2.06762 4.90737 1.59569C4.80513 1.82139 4.7029 2.0471 4.62111 2.29333C4.35529 3.03201 4.23261 3.81173 4.23261 4.63249C4.23261 6.58179 5.03005 8.36695 6.29779 9.63912C7.56553 10.9113 9.34445 11.7115 11.287 11.7115C12.1457 11.7115 12.9636 11.5679 13.7202 11.2806C13.986 11.178 14.2518 11.0754 14.4972 10.9523C14.0065 11.8962 13.3317 12.7375 12.4933 13.3941Z" fill="white"/></svg></Button>',
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
DarkFilled.args = {
  theme: "dark",
};

export const LightFilled = Template.bind({});
LightFilled.args = {
  theme: "light",
};

export const DarkOutlined = Template.bind({});
DarkOutlined.args = {
  theme: "dark",
  style: "outlined",
};

export const LightOutlined = Template.bind({});
LightOutlined.args = {
  theme: "light",
  style: "outlined",
};

export const DarkText = Template.bind({});
DarkText.args = {
  theme: "dark",
  style: "text",
};

export const LightText = Template.bind({});
LightText.args = {
  theme: "light",
  style: "text",
};

export const DarkIcon = IconTemplate.bind({});
DarkIcon.args = {
  theme: "dark",
  style: "outlined",
};

export const LightIcon = IconTemplate.bind({});
LightIcon.args = {
  theme: "light",
  style: "outlined",
};
