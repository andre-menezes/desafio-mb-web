<template>
  <main class="box">
    <StepControl :currentStep="currentStep" />
    <component :data-testid="`step-${currentStep}`" :is="currentStepComponent" :formData="formData" @next-step="nextStep"
      @previous-step="previousStep" />
  </main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';
import StepControl from './components/StepControl.vue';
import { useFetchApi } from './assets/fetch';

let formData = reactive({
  step1: {
    email: null,
    client: 'PF'
  },
  step2: {
    name: null,
    cpf: null,
    birthdate: null,
    phone: null
  },
  step3: {
    password: null
  }
});

const currentStep = ref(1);

const currentStepComponent = computed(() => `step-${currentStep.value}`);

async function nextStep(stepData) {
  formData[`step${currentStep.value}`] = stepData;

  if (currentStep.value === 4) {
    const response = await useFetchApi('/registration', stepData);
    if (!response.ok) {
      const data = await response.json();
      return alert(data.message);
    }

    if (response.ok) {
      const data = await response.json();
      currentStep.value = 1;
      resetFields();
      return alert(data.message);
    }
  }

  if (currentStep.value < 4) currentStep.value++;
}

function previousStep() {
  if (currentStep.value > 1) currentStep.value--;
}

function resetFields() {
  formData = {
    step1: {
      email: null,
      client: 'PF'
    },
    step2: {
      name: null,
      cpf: null,
      birthdate: null,
      phone: null
    },
    step3: {
      password: null
    }
  }
}
</script>
