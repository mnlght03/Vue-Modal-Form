<script setup lang="ts">
import { computed, ref } from 'vue'
import IconChevron from '@/components/icon/chevron.vue'
import UiFieldErrors from '@/components/ui/field-errors.vue'

export type SelectOption = {
  label: string
  value: string
}

const props = defineProps<{
  label?: string
  options: SelectOption[]
  errors?: string[] | string
}>()

const model = defineModel<string | string[]>()

const selectedLabel = computed(
  () =>
    props.options.find((option) => option.value === model.value)?.label ?? '',
)

const opened = ref(false)

const handleOptionSelected = (option: SelectOption) => {
  model.value = option.value
  opened.value = false
}
</script>

<template>
  <div class="select" :class="{ opened, error: errors?.length }">
    <div class="select__toggle" @click="opened = !opened">
      <div class="select__label-wrapper">
        <div class="select__label" v-if="label">{{ label }}</div>
        <div class="select__selected">
          {{ selectedLabel ?? '' }}
        </div>
      </div>
      <IconChevron class="icon" />
    </div>

    <UiFieldErrors v-if="errors" :errors="errors" />

    <div class="select__menu" v-show="opened">
      <div
        v-for="option in options"
        class="select__option"
        :key="option.value"
        @click="handleOptionSelected(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select {
  position: relative;

  &__toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    cursor: pointer;
    border: 2px solid var(--border-color);
    border-radius: var(--field-radius);
    padding: 0 20px;
    height: 64px;
    user-select: none;
  }

  &__label {
    @include typography_field-label;
  }

  &__selected {
    @include typography_field-input;
  }

  &__label-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__menu {
    position: absolute;
    left: 0;
    right: 0;
    margin-top: 8px;
    z-index: var(--dropdown-z-index);
    background: var(--white);
    border: 2px solid var(--border-color);
    border-radius: var(--field-radius);
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
  }

  &__option {
    padding: 8px 16px;
    cursor: pointer;
    color: var(--text-blue);

    &:hover {
      background: var(--border-color);
    }
  }

  &.opened {
    .icon {
      transform: rotate(180deg);
    }
  }

  &.error {
    .select__toggle {
      border-color: var(--text-red);
    }
  }
}
</style>
