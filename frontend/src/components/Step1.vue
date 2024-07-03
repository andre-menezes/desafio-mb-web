<template>
  <h1>Seja bem vindo(a)!</h1>
  <form @submit.prevent="submitForm" novalidate>
    <label for="email">
      Endereço de e-mail
      <input v-model="formStep1.email" type="email" id="email" required />
    </label>
    <legend v-if="isInvalid" id="error-message">{{ error }}</legend>
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
    <button type="submit" @click="submitForm">Continuar</button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue';
import validate from '@/composables/validate';

const props = defineProps(['formData']);
const emit = defineEmits(['next-step', 'previous-step']);

const formStep1 = reactive({
  email: '',
  client: 'PF'
});

const isInvalid = ref(false);
const error = ref('Campo obrigatório!');

function submitForm() {
  isInvalid.value = false;

  if (!formStep1.email) {
    isInvalid.value = true;
    error.value = 'Campo obrigatório!';
    return;
  }

  const isValidEmail = validate.email(formStep1.email);
  if (!isValidEmail) {
    error.value = 'E-mail inválido!';
    isInvalid.value = true;
    return;
  }

  return emit('next-step', formStep1);
}
</script>
