<script setup lang="ts">
import { computed } from 'vue'
import { add } from 'date-fns'
import { formatDate } from '@/utils'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import UiField from '@/components/ui/field.vue'
import UiFieldErrors from '@/components/ui/field-errors.vue'

type DateType = string | Date

const props = withDefaults(
  defineProps<{
    label?: string
    min: DateType
    max: DateType
    /** min difference in days */
    minDiff?: number
    fromAttrs?: any
    toAttrs?: any
    errors?: string[] | string
    fromErrors?: string[] | string
    toErrors?: string[] | string
  }>(),
  {
    label: undefined,
    minDiff: 0,
    fromAttrs: undefined,
    toAttrs: undefined,
    errors: undefined,
  },
)

const from = defineModel<DateType>('from')
const to = defineModel<DateType>('to')

const fromMaxDate = computed(() => {
  return add(to.value ?? props.max, {
    days: -props.minDiff,
  })
})

const toMinDate = computed(() => {
  return add(from.value ?? props.min, {
    days: props.minDiff,
  })
})
</script>

<template>
  <div class="range">
    <div class="range__label" v-if="label || $slots.label">
      {{ label }}
      <slot name="label" />
    </div>

    <div class="range__fields">
      <UiField label="от" dir="horizontal" class="field" :errors="fromErrors">
        <VueDatePicker
          v-model="from"
          model-type="iso"
          no-today
          :format="formatDate"
          :min-date="min"
          :max-date="fromMaxDate"
          prevent-min-max-navigation
          ignore-time-validation
          v-bind="fromAttrs"
        />
      </UiField>
      <UiField label="до" dir="horizontal" class="field" :errors="toErrors">
        <VueDatePicker
          v-model="to"
          model-type="iso"
          no-today
          :format="formatDate"
          :min-date="toMinDate"
          :max-date="max"
          prevent-min-max-navigation
          ignore-time-validation
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

:deep(.dp__input) {
  @include typography_field-input;
  padding: 0;
  text-align: end;
  border: none;
}

:deep(.dp__input_icon) {
  display: none;
}

:deep(.dp--tp-wrap) {
  display: none;
}

:deep(.dp--clear-btn) {
  display: none;
}
</style>
