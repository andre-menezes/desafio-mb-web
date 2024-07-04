<template>
  <h1 data-test="heading">Revise suas informações</h1>
  <form @submit.prevent="submitForm" novalidate data-test="form">
    <label for="email">
      Endereço de e-mail
      <input v-model="formStep4.step1.email" type="email" id="email" data-test="email" autocomplete="email" required />
    </label>
    <legend v-if="isInvalid.email" data-test="error-email">{{ error.email }}</legend>

    <div v-if="formStep4.step1.client === 'PF'">
      <label for="name">
        Nome completo
        <input v-model="formStep4.step2.name" type="text" id="name" data-test="name" autocomplete="name" required />
      </label>
      <legend v-if="isInvalid.name" data-test="error-name">{{ error.name }}</legend>
    </div>

    <div v-if="formStep4.step1.client === 'PF'">
      <label for="cpf">
        CPF
        <input v-model="formStep4.step2.cpf" type="text" placeholder="ex: 123.456.789-10" id="cpf" data-test="cpf"
          autocomplete="off" required />
      </label>
      <legend v-if="isInvalid.cpf" data-test="error-cpf">{{ error.cpf }}</legend>
    </div>

    <div v-if="formStep4.step1.client === 'PF'">
      <label for="birthdate">
        Data de nascimento
        <input v-model="formStep4.step2.birthdate" type="date" id="birthdate" data-test="birthdate" autocomplete="bday"
          required />
      </label>
      <legend v-if="isInvalid.birthdate" data-test="error-birthdate">{{ error.birthdate }}</legend>
    </div>

    <div v-if="formStep4.step1.client === 'PJ'">
      <label for="companyName">
        Razão Social
        <input v-model="formStep4.step2.companyName" type="text" id="companyName" data-test="company-name"
          autocomplete="organization" required />
      </label>
      <legend v-if="isInvalid.companyName" data-test="error-company-name">{{ error.companyName }}</legend>
    </div>

    <div v-if="formStep4.step1.client === 'PJ'">
      <label for="cnpj">
        CNPJ
        <input v-model="formStep4.step2.cnpj" type="text" placeholder="ex: 12.345.678/0001-90" id="cnpj" data-test="cnpj"
          autocomplete="off" required />
      </label>
      <legend v-if="isInvalid.cnpj" data-test="error-cnpj">{{ error.cnpj }}</legend>
    </div>

    <div v-if="formStep4.step1.client === 'PJ'">
      <label for="openingDate">
        Data de abertura
        <input v-model="formStep4.step2.openingDate" type="date" id="openingDate" data-test="opening-date"
          autocomplete="bday" required />
      </label>
      <legend v-if="isInvalid.openingDate" data-test="error-opening-date">{{ error.openingDate }}</legend>
    </div>

    <label for="phone">
      Telefone
      <input v-model="formStep4.step2.phone" type="tel" placeholder="ex: (12) 34567-8910" id="phone" data-test="phone"
        autocomplete="tel" required />
    </label>
    <legend v-if="isInvalid.phone" data-test="error-phone">{{ error.phone }}</legend>

    <label for="pswd">
      Sua senha
      <input v-model="formStep4.step3.password" type="password" id="pswd" data-test="password"
        autocomplete="current-password" required />
    </label>
    <legend v-if="isInvalid.password" data-test="error-password">{{ error.password }}</legend>

    <button type="button" id="previous-step" data-test="btn-previous" @click="emit('previous-step')">Voltar</button>
    <button type="submit" id="next-step" data-test="btn-next">Cadastrar</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['register', 'next-step', 'previous-step']);

const step2 = props.formData.step1.client === 'PF'
  ? ({
    name: props.formData.step2.name,
    cpf: props.formData.step2.cpf,
    birthdate: props.formData.step2.birthdate,
    phone: props.formData.step2.phone
  })
  : ({
    companyName: props.formData.step2.companyName,
    cnpj: props.formData.step2.cnpj,
    openingDate: props.formData.step2.openingDate,
    phone: props.formData.step2.phone
  });

const formStep4 = reactive({
  step1: {
    email: props.formData.step1.email,
    client: props.formData.step1.client
  },
  step2,
  step3: {
    password: props.formData.step3.password,
  }
})

const isInvalid = reactive({
  email: false,
  name: false,
  cpf: false,
  birthdate: false,
  companyName: false,
  cnpj: false,
  openingDate: false,
  phone: false,
});

const error = reactive({
  email: '',
  name: '',
  cpf: '',
  birthdate: '',
  companyName: '',
  cnpj: '',
  openingDate: '',
  phone: '',
});

function setInvalidField(typeError, field) {
  isInvalid[field] = true;
  error[field] = typeError === 'empty' ? 'Campo obrigatório!' : 'Campo inválido!'
}

function submitForm() {
  Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);

  const validEmail = validate.field('email', formStep4.step1.email);
  const validName = validate.field('name', formStep4.step2.name);
  const validCPF = validate.field('cpf', formStep4.step2.cpf);
  const validBirthdate = validate.field('date', formStep4.step2.birthdate);
  const validCompanyName = validate.field('name', formStep4.step2.companyName);
  const validCNPJ = validate.field('cnpj', formStep4.step2.cnpj);
  const validOpeningDate = validate.field('date', formStep4.step2.openingDate);
  const validPhone = validate.field('phone', formStep4.step2.phone);
  const validPassword = validate.field('password', formStep4.step3.password);

  if (
    typeof validEmail === 'boolean'
    && (typeof validName === 'boolean' || typeof validCompanyName === 'boolean')
    && (typeof validCPF === 'boolean' || typeof validCNPJ === 'boolean')
    && (typeof validBirthdate === 'boolean' || typeof validOpeningDate === 'boolean')
    && typeof validPhone === 'boolean'
  ) {
    Object.keys(error).forEach((key) => error[key] = '');
    Object.keys(isInvalid).forEach((key) => isInvalid[key] = false);

    const userData = { ...formStep4.step1, ...formStep4.step2, ...formStep4.step3 };
    return emit('next-step', userData);
  }

  typeof validEmail === 'string' && setInvalidField(validEmail, 'email');
  typeof validName === 'string' && setInvalidField(validName, 'name');
  typeof validCPF === 'string' && setInvalidField(validCPF, 'cpf');
  typeof validBirthdate === 'string' && setInvalidField(validBirthdate, 'birthdate');
  typeof validCompanyName === 'string' && setInvalidField(validCompanyName, 'companyName');
  typeof validCNPJ === 'string' && setInvalidField(validCNPJ, 'cnpj');
  typeof validOpeningDate === 'string' && setInvalidField(validOpeningDate, 'openingDate');
  typeof validPhone === 'string' && setInvalidField(validPhone, 'phone');
  typeof validPassword === 'string' && setInvalidField(validPassword, 'password');
}
</script>
