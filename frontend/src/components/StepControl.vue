<template>
  <section class="step-control">
    <p data-testid="step">Passo <span class="step-control__current-step">{{ currentStep }}</span> de 4</p>
    <div class="step-control__bars">
      <div v-for="n in 4" class="step-control__bars__item" :class="n <= currentStep ? 'current' : ''"></div>
    </div>
  </section>
</template>

<script setup>
defineProps(['currentStep']);
</script>
