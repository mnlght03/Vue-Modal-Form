<template>
  <button class="button" v-bind="$attrs">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: 12px 40px;
  color: var(--white);
  background-color: var(--text-blue);
  border-radius: var(--button-radius);
  border: none;
  cursor: pointer;
  user-select: none;
}
</style>
