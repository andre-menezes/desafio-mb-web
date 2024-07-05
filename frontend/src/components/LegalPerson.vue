<template>
  <h1 data-testid="heading" class="form__title">Pessoa Jurídica</h1>
  <form @submit.prevent="submitForm" novalidate data-testid="form" class="form">
    <div>
      <label for="companyName" class="form__label">
        Razão Social
        <input v-model="formStep2.companyName" type="text" id="companyName" data-testid="company-name"
          autocomplete="organization" required class="form__input" />
      </label>
      <legend v-if="isInvalid.companyName" data-testid="error-company-name" class="form__legend">{{ error.companyName }}
      </legend>
    </div>

    <div>
      <label for="cnpj" class="form__label">
        CNPJ
        <input v-model="formStep2.cnpj" type="text" placeholder="ex: 12.345.678/0001-90" id="cnpj" data-testid="cnpj"
          autocomplete="off" required class="form__input" />
      </label>
      <legend v-if="isInvalid.cnpj" data-testid="error-cnpj" class="form__legend">{{ error.cnpj }}</legend>
    </div>

    <div>
      <label for="openingDate" class="form__label">
        Data de abertura
        <input v-model="formStep2.openingDate" type="date" id="openingDate" data-testid="opening-date" autocomplete="bday"
          required class="form__input" />
      </label>
      <legend v-if="isInvalid.openingDate" data-testid="error-opening-date" class="form__legend">{{ error.openingDate }}
      </legend>
    </div>

    <div>
      <label for="phone" class="form__label">
        Telefone
        <input v-model="formStep2.phone" type="tel" placeholder="ex: (12) 3456-7890" id="phone" data-testid="phone"
          autocomplete="tel" required class="form__input" />
      </label>
      <legend v-if="isInvalid.phone" data-testid="error-phone" class="form__legend">{{ error.phone }}</legend>
    </div>

    <div class="form__button-position">
      <custom-button type="button" id="previous-step" data-testid="btn-previous" text="Voltar"
        @handle-click="previousStep" class="form__button button-outline" />
      <custom-button type="submit" data-testid="btn-next" text="Continuar" class="form__button button-solid" />
    </div>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['next-step', 'previous-step']);

const formStep2 = reactive({
  companyName: props.formData.step2.companyName,
  cnpj: props.formData.step2.cnpj,
  openingDate: props.formData.step2.openingDate,
  phone: props.formData.step2.phone
});

const isInvalid = reactive({
  companyName: false,
  cnpj: false,
  openingDate: false,
  phone: false,
});

const error = reactive({
  companyName: '',
  cnpj: '',
  openingDate: '',
  phone: ''
});

function setInvalidField(typeError, field) {
  isInvalid[field] = true;
  error[field] = typeError === 'empty' ? 'Campo obrigatório!' : 'Campo inválido!'
}

function previousStep() {
  emit('previous-step');
}

function submitForm() {
  Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);

  const validCompanyName = validate.field('name', formStep2.companyName);
  const validCNPJ = validate.field('cnpj', formStep2.cnpj);
  const validOpeningDate = validate.field('date', formStep2.openingDate);
  const validPhone = validate.field('phone', formStep2.phone);

  if (
    typeof validCompanyName === 'boolean'
    && typeof validCNPJ === 'boolean'
    && typeof validOpeningDate === 'boolean'
    && typeof validPhone === 'boolean'
  ) {
    Object.keys(error).forEach((key) => error[key] = '');
    Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);
    return emit('next-step', formStep2);
  }

  typeof validCompanyName === 'string' && setInvalidField(validCompanyName, 'companyName');
  typeof validCNPJ === 'string' && setInvalidField(validCNPJ, 'cnpj');
  typeof validOpeningDate === 'string' && setInvalidField(validOpeningDate, 'openingDate');
  typeof validPhone === 'string' && setInvalidField(validPhone, 'phone');
}
</script>
