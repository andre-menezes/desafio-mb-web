<template>
  <NaturalPerson v-if="props.formData.step1.client === 'PF'" :formData="formData" @next-step="nextStep"
    @previous-step="previousStep" />
  <LegalPerson v-else :formData="formData" @next-step="nextStep" @previous-step="previousStep" />
</template>

<script setup>
import NaturalPerson from './NaturalPerson.vue';
import LegalPerson from './LegalPerson.vue';

const props = defineProps(['formData', 'nextStep', 'previousStep'])
</script>