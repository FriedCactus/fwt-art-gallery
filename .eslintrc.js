module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "@vue/airbnb",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "eol-last": "off",
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "vue/no-unused-components": "warn",
    "vue/multi-word-component-names": "off",
    "vuejs-accessibility/anchor-has-content": "warn",
    "@typescript-eslint/no-empty-function": "off",
    "object-curly-newline": "off",
    "import/prefer-default-export": "warn",
    "implicit-arrow-linebreak": "warn",
    "import/extensions": "off",
    "operator-linebreak": "off",
    "no-confusing-arrow": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
  },
};
