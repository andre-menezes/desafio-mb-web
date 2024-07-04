<template>
  <h1 data-test="heading">Seja bem vindo(a)!</h1>
  <form @submit.prevent="submitForm" novalidate data-test="form">
    <label for="email">
      Endereço de e-mail
      <input v-model="formStep1.email" type="email" id="email" data-test="email" required />
    </label>
    <legend v-if="isInvalid" data-test="error-name">{{ error }}</legend>
    <div>
      <label for="pf">
        <input v-model="formStep1.client" id="pf" type="radio" name="client" value="PF" />
        Pessoa Física
      </label>

      <label for="pj">
        <input v-model="formStep1.client" id="pj" type="radio" name="client" value="PJ" />
        Pessoa Jurídica
      </label>
    </div>
    <button type="submit" data-test="btn-next" @click="submitForm">Continuar</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['next-step', 'previous-step']);

const formStep1 = reactive({
  email: props.formData.step1.email,
  client: props.formData.step1.client,
});

const isInvalid = ref(false);
const error = ref('Campo obrigatório!');

function submitForm() {
  isInvalid.value = false;

  const isFormValid = validate.field('email', formStep1.email);

  if (typeof isFormValid === 'string') {
    isInvalid.value = true;
    error.value = isFormValid === 'empty' ? 'Campo obrigatório!' : 'Campo inválido!'
    return;
  };

  return isFormValid && emit('next-step', formStep1);
}
</script>
