<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  errors: string[] | string
}>()

const errors = computed(() =>
  Array.isArray(props.errors) ? props.errors : [props.errors],
)
</script>

<template>
  <div class="field-errors">
    <p class="error" v-for="(error, i) in errors" :key="i">
      {{ error }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.field-errors {
  margin-left: 16px;
  .error {
    margin-top: 8px;
    color: var(--text-red);
  }
}
</style>
