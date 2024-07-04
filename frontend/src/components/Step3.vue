<template>
  <h1 data-test="heading">Senha de acesso</h1>
  <form @submit.prevent="submitForm" novalidate data-test="form">
    <label for="pswd">
      Sua senha
      <input v-model="formStep3.password" type="password" id="pswd" data-test="password" autocomplete="new-password"
        required />
    </label>
    <legend v-if="isInvalid" data-test="error-password">{{ error }}</legend>

    <button type="button" id="previous-step" data-test="btn-previous" @click="emit('previous-step')">Voltar</button>
    <button type="submit" id="next-step" data-test="btn-next" @submit="submitForm">Continuar</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['next-step', 'previous-step']);

const formStep3 = reactive({
  password: props.formData.step3.password,
});

const isInvalid = ref(false);
const error = ref('Campo obrigatório!');

function submitForm() {
  isInvalid.value = false;

  const isFormValid = validate.field('password', formStep3.password);

  if (typeof isFormValid === 'string') {
    isInvalid.value = true;
    error.value = isFormValid === 'empty' ? 'Campo obrigatório!' : 'Campo inválido!'
    return;
  };

  return isFormValid && emit('next-step', formStep3);
}
</script>