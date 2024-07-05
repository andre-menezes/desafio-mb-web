<template>
  <h1 data-testid="heading" class="form__title">Senha de acesso</h1>
  <form @submit.prevent="submitForm" novalidate data-testid="form" class="form">
    <div>
      <label for="pswd" class="form__label">
        Sua senha
        <input v-model="formStep3.password" type="password" id="password" data-testid="password"
          autocomplete="new-password" required class="form__input" />
      </label>
      <legend v-if="isInvalid" data-testid="error-password" class="form__legend">{{ error }}</legend>
    </div>

    <div class="form__button-position">
      <custom-button type="button" id="previous-step" data-testid="btn-previous" text="Voltar"
        @handle-click="previousStep" class="form__button button-outline" />
      <custom-button type="submit" data-testid="btn-next" text="Continuar" class="form__button button-solid" />
    </div>
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

function previousStep() {
  emit('previous-step');
}

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