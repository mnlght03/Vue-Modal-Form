<script setup lang="ts">
import { ModalsContainer, useModal } from 'vue-final-modal'
import UiButton from '@/components/ui/button.vue'
import ResidentModal from '@/components/resident-modal.vue'

const { open } = useModal({
  component: ResidentModal,
})
</script>

<template>
  <main>
    <UiButton @click="open()">Стать резидентом</UiButton>
    <ModalsContainer />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100dvh;
}
</style>
