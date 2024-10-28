<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import UiButton from '@/components/ui/button.vue'

defineEmits<{
  confirm: []
}>()

defineProps<{
  type: 'error' | 'success'
  message: string
}>()
</script>

<template>
  <VueFinalModal
    class="confirm-modal"
    content-class="confirm-modal__content"
    :class="{ error: type === 'error' }"
  >
    <div class="confirm-modal__title">
      <template v-if="type === 'success'">Успешно!</template>
      <template v-else>Ошибка</template>
    </div>
    <div class="confirm-modal__message">
      {{ message }}
    </div>
    <UiButton @click="$emit('confirm')">Ok</UiButton>
  </VueFinalModal>
</template>

<style lang="scss">
.confirm-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    width: 400px;
    background: var(--white);
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
  }

  &__title {
    @include typography_title;
  }

  &__message {
    @include typography_field-input;
  }

  &.error {
    .confirm-modal__title,
    .confirm-modal__message {
      color: var(--text-red);
    }
  }
}
</style>
