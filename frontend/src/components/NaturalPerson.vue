<template>
  <h1 data-test="heading">Pessoa Física</h1>
  <form @submit.prevent="submitForm" novalidate data-test="form">
    <label for="name">
      Nome completo
      <input v-model="formStep2.name" type="text" id="name" data-test="name" autocomplete="name" required />
    </label>
    <legend v-if="isInvalid.name" data-test="error-name">{{ error.name }}</legend>

    <label for="cpf">
      CPF
      <input v-model="formStep2.cpf" type="text" placeholder="ex: 123.456.789-10" id="cpf" data-test="cpf"
        autocomplete="off" required />
    </label>
    <legend v-if="isInvalid.cpf" data-test="error-cpf">{{ error.cpf }}</legend>

    <label for="birthdate">
      Data de nascimento
      <input v-model="formStep2.birthdate" type="date" id="birthdate" data-test="birthdate" autocomplete="bday"
        required />
    </label>
    <legend v-if="isInvalid.birthdate" data-test="error-birthdate">{{ error.birthdate }}</legend>

    <label for="phone">
      Telefone
      <input v-model="formStep2.phone" type="tel" placeholder="ex: (12) 34567-8910" id="phone" data-test="phone"
        autocomplete="tel" required />
    </label>
    <legend v-if="isInvalid.phone" data-test="error-phone">{{ error.phone }}</legend>

    <button type="button" id="previous-step" data-test="btn-previous" @click="emit('previous-step')">Voltar</button>
    <button type="submit" id="next-step" data-test="btn-next" @submit="submitForm">Continuar</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['next-step', 'previous-step']);

const formStep2 = reactive({
  name: props.formData.step2.name,
  cpf: props.formData.step2.cpf,
  birthdate: props.formData.step2.birthdate,
  phone: props.formData.step2.phone
});

const isInvalid = reactive({
  name: false,
  cpf: false,
  birthdate: false,
  phone: false,
});

const error = reactive({
  name: '',
  cpf: '',
  birthdate: '',
  phone: ''
});

function setInvalidField(typeError, field) {
  isInvalid[field] = true;
  error[field] = typeError === 'empty' ? 'Campo obrigatório!' : 'Campo inválido!'
}

function submitForm() {
  Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);

  const validName = validate.field('name', formStep2.name);
  const validCPF = validate.field('cpf', formStep2.cpf);
  const validBirthdate = validate.field('date', formStep2.birthdate);
  const validPhone = validate.field('phone', formStep2.phone);

  if (
    typeof validName === 'boolean'
    && typeof validCPF === 'boolean'
    && typeof validBirthdate === 'boolean'
    && typeof validPhone === 'boolean'
  ) {
    Object.keys(error).forEach((key) => error[key] = '');
    Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);
    return emit('next-step', formStep2);
  }

  typeof validName === 'string' && setInvalidField(validName, 'name');
  typeof validCPF === 'string' && setInvalidField(validCPF, 'cpf');
  typeof validBirthdate === 'string' && setInvalidField(validBirthdate, 'birthdate');
  typeof validPhone === 'string' && setInvalidField(validPhone, 'phone');
}
</script>
