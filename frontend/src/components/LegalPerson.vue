<template>
  <h1 data-test="heading">Pessoa Jurídica</h1>
  <form @submit.prevent="submitForm" novalidate data-test="form">
    <label for="companyName">
      Razão Social
      <input v-model="formStep2.companyName" type="text" id="companyName" data-test="company-name"
        autocomplete="organization" required />
    </label>
    <legend v-if="isInvalid.companyName" data-test="error-company-name">{{ error.companyName }}</legend>

    <label for="cnpj">
      CNPJ
      <input v-model="formStep2.cnpj" type="text" placeholder="ex: 12.345.678/0001-90" id="cnpj" data-test="cnpj"
        autocomplete="off" required />
    </label>
    <legend v-if="isInvalid.cnpj" data-test="error-cnpj">{{ error.cnpj }}</legend>

    <label for="openingDate">
      Data de abertura
      <input v-model="formStep2.openingDate" type="date" id="openingDate" data-test="opening-date" autocomplete="bday"
        required />
    </label>
    <legend v-if="isInvalid.openingDate" data-test="error-opening-date">{{ error.openingDate }}</legend>

    <label for="phone">
      Telefone
      <input v-model="formStep2.phone" type="tel" placeholder="ex: (98) 8765-4321" id="phone" data-test="phone"
        autocomplete="tel" required />
    </label>
    <legend v-if="isInvalid.phone" data-test="error-phone">{{ error.phone }}</legend>

    <button type="button" id="previous-step" data-test="btn-previous" @click="emit('previous-step')">Voltar</button>
    <button type="submit" id="next-step" data-test="btn-next">Continuar</button>
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
