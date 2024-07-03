<template>
  <main>
    <component :is="currentStepComponent" :formData="formData" @next-step="nextStep" @previous-step="previousStep" />
  </main>
</template>

<script setup>
import { computed, reactive, ref } from 'vue';

const formData = reactive({
  step1: {
    email: null,
    client: null
  }
});

const currentStep = ref(1);

const currentStepComponent = computed(() => `step-${currentStep.value}`);

function nextStep(stepData) {
  formData[`step${currentStep.value}`] = stepData;
  if (currentStep.value < 3) currentStep.value++;
}

function previousStep() {
  if (currentStep.value > 1) currentStep.value--;
}
</script>
