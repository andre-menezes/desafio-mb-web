<template>
  <h1 data-testid="heading" class="form__title">Pessoa Física</h1>
  <form @submit.prevent="submitForm" novalidate data-testid="form" class="form">
    <div>
      <label for="name" class="form__label">
        Nome completo
        <input v-model="formStep2.name" type="text" id="name" data-testid="name" autocomplete="name" required
          class="form__input" />
      </label>
      <legend v-if="isInvalid.name" data-testid="error-name" class="form__legend">{{ error.name }}</legend>
    </div>

    <div>
      <label for="cpf" class="form__label">
        CPF
        <input v-model="formStep2.cpf" type="text" placeholder="ex: 123.456.789-10" id="cpf" data-testid="cpf"
          autocomplete="off" required class="form__input" />
      </label>
      <legend v-if="isInvalid.cpf" data-testid="error-cpf" class="form__legend">{{ error.cpf }}</legend>
    </div>

    <div>
      <label for="birthdate" class="form__label">
        Data de nascimento
        <input v-model="formStep2.birthdate" type="date" id="birthdate" data-testid="birthdate" autocomplete="bday"
          required class="form__input" />
      </label>
      <legend v-if="isInvalid.birthdate" data-testid="error-birthdate" class="form__legend">{{ error.birthdate }}</legend>
    </div>

    <div>
      <label for="phone" class="form__label">
        Telefone
        <input v-model="formStep2.phone" type="tel" placeholder="ex: (12) 34567-8910" id="phone" data-testid="phone"
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

function previousStep() {
  emit('previous-step');
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
