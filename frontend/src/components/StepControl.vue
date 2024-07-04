<template>
  <section>
    <p data-test="step">Passo {{ currentStep }} de 4</p>
  </section>
</template>

<script setup>
defineProps(['currentStep']);
</script>