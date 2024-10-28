<script setup lang="ts">
import UiField from '@/components/ui/field.vue'
import UiInput from '@/components/ui/input.vue'
import UiFieldErrors from '@/components/ui/field-errors.vue'

const props = withDefaults(
  defineProps<{
    label?: string
    min: number
    max: number
    minDiff?: number
    step?: number
    fromAttrs?: any
    toAttrs?: any
    errors?: string[] | string
    fromErrors?: string[] | string
    toErrors?: string[] | string
  }>(),
  {
    label: undefined,
    minDiff: 0,
    step: 1,
    fromAttrs: undefined,
    toAttrs: undefined,
    errors: undefined,
  },
)

const from = defineModel<number | ''>('from')
const to = defineModel<number | ''>('to')

const handleFromChanged = () => {
  if (typeof from.value !== 'number') {
    return
  }

  if (from.value < props.min) {
    from.value = props.min
  } else if (
    typeof to.value !== 'number' &&
    from.value > props.max - props.minDiff
  ) {
    from.value = props.max - props.minDiff
  } else if (
    typeof to.value === 'number' &&
    from.value > to.value - props.minDiff
  ) {
    from.value = to.value - props.minDiff
  }
}

const handleToChanged = () => {
  if (typeof to.value !== 'number') {
    return
  }

  if (to.value > props.max) {
    to.value = props.max
  } else if (
    typeof from.value !== 'number' &&
    to.value < props.min + props.minDiff
  ) {
    to.value = props.min + props.minDiff
  } else if (
    typeof from.value === 'number' &&
    to.value < from.value + props.minDiff
  ) {
    to.value = from.value + props.minDiff
  }
}
</script>

<template>
  <div class="range">
    <div class="range__label" v-if="label || $slots.label">
      {{ label }}
      <slot name="label" />
    </div>

    <div class="range__fields">
      <UiField
        label="от"
        dir="horizontal"
        class="field"
        @change="handleFromChanged"
        :errors="fromErrors"
      >
        <UiInput
          type="number"
          :step="step"
          v-model="from"
          :placeholder="min"
          class="range__input"
          v-bind="fromAttrs"
        />
      </UiField>
      <UiField
        label="до"
        dir="horizontal"
        class="field"
        @change="handleToChanged"
        :errors="toErrors"
      >
        <UiInput
          type="number"
          :step="step"
          v-model="to"
          :placeholder="max"
          class="range__input"
          v-bind="toAttrs"
        />
      </UiField>
    </div>

    <UiFieldErrors v-if="errors" :errors="errors" />
  </div>
</template>

<style scoped lang="scss">
.range {
  &__label {
    @include typography_field-label;
    margin-bottom: 20px;
  }

  &__fields {
    display: flex;
    gap: 8px;

    .field {
      flex: 1;
    }
  }

  &__input {
    text-align: end;
  }
}
</style>
