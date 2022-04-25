<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  padding: 15px;
  margin: 0 auto;
  min-height: inherit;

  @media ($tablet) {
    max-width: 728px;
    padding: 20px 0;
  }

  @media ($laptop) {
    max-width: 984px;
  }

  @media ($desktop) {
    max-width: 1120px;
  }
}
</style>
