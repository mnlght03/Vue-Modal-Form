<script setup lang="ts">
import { FieldInjectionKey } from '@/components/ui/field.vue'
import { inject } from 'vue'

withDefaults(
  defineProps<{
    required?: boolean
    disabled?: boolean
    readonly?: boolean
  }>(),
  {
    // Задаем пропсам undefined в явном виде, они могут быть переназначены через inject
    required: undefined,
    disabled: undefined,
    readonly: undefined,
  },
)

const field = inject(FieldInjectionKey, undefined)
const model = defineModel<string | number>()
</script>

<template>
  <input
    class="input"
    v-model="model"
    v-bind="$attrs"
    :disabled="disabled ?? field?.disabled"
    :readonly="readonly ?? field?.readonly"
    :required="required ?? field?.required"
  />
</template>

<style scoped lang="scss">
.input {
  @include typography_field-input;
  border: none;
  width: 100%;

  &::placeholder {
    font-size: 16px;
  }
}
</style>
