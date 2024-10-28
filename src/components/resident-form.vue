<script setup lang="ts">
import { ref } from 'vue'
import { add, set } from 'date-fns'
import { vMaska } from 'maska/vue'
import { formatDate } from '@/utils'
import * as z from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useModal, useVfm } from 'vue-final-modal'

import UiField from '@/components/ui/field.vue'
import UiInput from '@/components/ui/input.vue'
import UiSelect from '@/components/ui/select.vue'
import UiRange from '@/components/ui/range.vue'
import UiDateRange from '@/components/ui/date-range.vue'
import UiButton from '@/components/ui/button.vue'
import ConfirmModal from '@/components/confirm-modal.vue'

const buildingTypeOptions = [
  {
    label: 'Производственная площадь',
    value: 'manufacturing',
  },
  {
    label: 'Жилая площадь',
    value: 'living',
  },
]

/** Минимальная разница между площадями */
const squareMinDiff = 20
const minSquare = 20
const maxSquare = 200

/** Минимальная разница между значениями даты начала аренды в днях */
const dateMinDiff = 5
const minDate = add(
  set(new Date(), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  }),
  {
    days: 1,
  },
)
/** Разбег даты начала аренды - 2 недели */
const maxDate = add(
  set(new Date(), {
    hours: 23,
    minutes: 59,
    seconds: 59,
    milliseconds: 0,
  }),
  {
    days: 15,
  },
)

const validationSchema = toTypedSchema(
  z
    .object({
      phone: z
        .string({ message: 'Это поле обязательно' })
        .trim()
        .regex(/\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}/, {
          message: 'Неправильный формат номера',
        }),
      organizationName: z
        .string({ message: 'Это поле обязательно' })
        .trim()
        .min(3, {
          message:
            'Название организации может быть от 3 до 100 символов в длину',
        })
        .max(100, {
          message:
            'Название организации может быть от 3 до 100 символов в длину',
        }),
      buildingType: z
        .string({ message: 'Это поле обязательно' })
        .min(1, { message: 'Это поле обязательно' }),
      address: z
        .string({ message: 'Это поле обязательно' })
        .trim()
        .min(3, {
          message: 'Адрес должен быть от 3 до 100 символов в длину',
        })
        .max(100, {
          message: 'Адрес должен быть от 3 до 100 символов в длину',
        }),
      squareFrom: z
        .number({ message: 'Это поле обязательно' })
        .min(minSquare, {
          message: `Площадь должна быть в диапазоне ${minSquare} - ${maxSquare}`,
        })
        .max(maxSquare, {
          message: `Площадь должна быть в диапазоне ${minSquare} - ${maxSquare}`,
        }),
      squareTo: z
        .number({ message: 'Это поле обязательно' })
        .min(minSquare, {
          message: `Площадь должна быть в диапазоне ${minSquare} - ${maxSquare}`,
        })
        .max(maxSquare, {
          message: `Площадь должна быть в диапазоне ${minSquare} - ${maxSquare}`,
        }),
      dateFrom: z
        .string({ message: 'Это поле обязательно' })
        .datetime()
        .refine((val) => new Date(val) >= minDate, {
          message: `Минимальная дата начала аренды - ${formatDate(minDate)}`,
        }),
      dateTo: z
        .string({ message: 'Это поле обязательно' })
        .datetime()
        .refine((val) => new Date(val) <= maxDate, {
          message: `Максимальная дата начала аренды - ${formatDate(maxDate)}`,
        }),
    })
    .refine((data) => data.squareFrom <= data.squareTo, {
      message: 'Неверный диапазон площади',
      path: ['squareTo'],
    })
    .refine((data) => new Date(data.dateFrom) <= new Date(data.dateTo), {
      message: 'Неверный диапазон дат',
      path: ['dateTo'],
    }),
)

const { handleSubmit, errors, isSubmitting, defineField } = useForm({
  validationSchema,
})

const modalType = ref<'success' | 'error'>('success')
const modalMessage = ref('')

const vfm = useVfm()

const handleCloseModal = (close: () => void) => {
  modalType.value === 'success' ? vfm.closeAll() : close()
}

const { open: openConfirmModal, close } = useModal({
  component: ConfirmModal,
  attrs: {
    // @ts-expect-error
    type: modalType,
    // @ts-expect-error
    message: modalMessage,
    onClosed: () => handleCloseModal(close),
    onConfirm: () => handleCloseModal(close),
  },
})

const submit = handleSubmit(async (values) => {
  try {
    const url = ''
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(values),
    })

    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }

    modalType.value = 'success'
    modalMessage.value = 'Спасибо, что выбрали нас!'
    openConfirmModal()
  } catch (e) {
    modalType.value = 'error'
    modalMessage.value = `${e}`
    openConfirmModal()
  }
})

const [phone, phoneAttrs] = defineField('phone')
const [organizationName, organizationNameAttrs] =
  defineField('organizationName')
const [address, addressAttrs] = defineField('address')
const [buildingType, buildingTypeAttrs] = defineField('buildingType')
const [squareFrom, squareFromAttrs] = defineField('squareFrom')
const [squareTo, squareToAttrs] = defineField('squareTo')
const [dateFrom, dateFromAttrs] = defineField('dateFrom')
const [dateTo, dateToAttrs] = defineField('dateTo')
</script>

<template>
  <form class="resident-form" @submit.prevent="submit">
    <h1 class="resident-form__title">
      Заполните заявку, чтобы стать резидентом
    </h1>
    <div class="resident-form__fields">
      <UiField label="Контактный телефон" :errors="errors.phone">
        <UiInput
          type="phone"
          v-maska="'+7 (###) ###-##-##'"
          v-model="phone"
          v-bind="phoneAttrs"
        />
      </UiField>

      <UiField
        label="Наименование организации / ИП"
        :errors="errors.organizationName"
      >
        <UiInput
          type="text"
          v-model="organizationName"
          v-bind="organizationNameAttrs"
        />
      </UiField>

      <UiSelect
        v-model="buildingType"
        v-bind="buildingTypeAttrs"
        label="Тип помещения"
        :options="buildingTypeOptions"
        :errors="errors.buildingType"
      />

      <UiField label="Адрес" dir="horizontal" :errors="errors.address">
        <UiInput
          type="text"
          class="resident-form__address-input"
          v-model="address"
          v-bind="addressAttrs"
        />
      </UiField>

      <UiRange
        label="Площадь помещения"
        v-model:from="squareFrom"
        v-model:to="squareTo"
        :min="minSquare"
        :max="maxSquare"
        :min-diff="squareMinDiff"
        :from-attrs="squareFromAttrs"
        :to-attrs="squareToAttrs"
        :from-errors="errors.squareFrom"
        :to-errors="errors.squareTo"
      >
        <template #label> (м<sup>2</sup>) </template>
      </UiRange>

      <UiDateRange
        label="Дата начала аренды"
        v-model:from="dateFrom"
        v-model:to="dateTo"
        :min="minDate"
        :max="maxDate"
        :min-diff="dateMinDiff"
        :from-attrs="dateFromAttrs"
        :to-attrs="dateToAttrs"
        :from-errors="errors.dateFrom"
        :to-errors="errors.dateTo"
      />
    </div>

    <UiButton class="resident-form__submit-button" :disabled="isSubmitting">
      Отправить
    </UiButton>
  </form>
</template>

<style scoped lang="scss">
.resident-form {
  padding: 40px;
  background: var(--white);
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 800px;
  max-width: 100%;

  &__title {
    @include typography_title;
  }

  &__fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__address-input {
    text-align: end;
  }

  &__submit-button {
    align-self: center;
  }
}
</style>
