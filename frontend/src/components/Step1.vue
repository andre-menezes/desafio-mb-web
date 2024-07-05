<template>
  <h1 data-testid="heading" class="form__title">Seja bem vindo(a)!</h1>
  <form @submit.prevent="submitForm" novalidate data-testid="form" class="form">
    <div>
      <label for="email" class="form__label">
        Endereço de e-mail
        <input v-model="formStep1.email" type="email" id="email" data-testid="email" autocomplete="email" required
          class="form__input" />
      </label>
      <legend v-if="isInvalid" data-testid="error-email" class="form__legend">{{ error }}</legend>
    </div>
    <div class="form__radio-group">
      <label for="pf" class="form__label">
        <input v-model="formStep1.client" id="pf" type="radio" name="client" value="PF" class="radio" />
        Pessoa Física
      </label>

      <label for="pj" class="form__label">
        <input v-model="formStep1.client" id="pj" type="radio" name="client" value="PJ" />
        Pessoa Jurídica
      </label>
    </div>
    <custom-button type="submit" data-testid="btn-next" text="Continuar" class="form__button button-solid" />
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

<style></style>