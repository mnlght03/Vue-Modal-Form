<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import ResidentForm from '@/components/resident-form.vue'
</script>

<template>
  <VueFinalModal class="resident-modal" content-class="resident-modal__content">
    <ResidentForm />
  </VueFinalModal>
</template>

<style lang="scss">
.resident-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  &__content {
    max-width: 100%;
    max-height: 100%;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
