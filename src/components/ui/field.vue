<script lang="ts">
export const FieldInjectionKey: InjectionKey<
  Ref<{
    required: boolean
    disabled: boolean
    readonly: boolean
    error: boolean
  }>
> = Symbol('field')
</script>

<script setup lang="ts">
import { computed, provide, type InjectionKey, type Ref } from 'vue'
import UiFieldErrors from '@/components/ui/field-errors.vue'

const props = defineProps<{
  label?: string
  required?: boolean
  disabled?: boolean
  readonly?: boolean
  errors?: string[] | string
  dir?: 'vertical' | 'horizontal'
}>()

provide(
  FieldInjectionKey,
  computed(() => ({
    required: props.required,
    disabled: props.disabled,
    readonly: props.readonly,
    error: !!props.errors,
  })),
)
</script>

<template>
  <label class="field">
    <div
      class="field__wrapper"
      :class="{ horizontal: dir === 'horizontal', error: errors?.length }"
    >
      <span class="field__label" v-if="label || $slots.label">
        {{ label }}
        <slot name="label" />
      </span>
      <slot />
    </div>

    <UiFieldErrors v-if="errors" :errors="errors" />
  </label>
</template>

<style scoped lang="scss">
.field {
  &__label {
    @include typography_field-label;
  }

  &__wrapper {
    display: flex;
    gap: 8px;
    flex-direction: column;
    padding: 0 20px;
    min-height: 64px;
    justify-content: center;
    border: 2px solid var(--border-color);
    border-radius: var(--field-radius);

    &.horizontal {
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      text-align: end;
    }

    &.error {
      border-color: var(--text-red);
    }
  }
}
</style>
