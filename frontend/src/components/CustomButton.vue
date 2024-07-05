<template>
  <button :id="id" :type="type" @click="handleClick" :data-testid="dataTestid" :class="class">
    {{ text }}
  </button>
</template>

<script setup>
defineProps(['class', 'data-testid', 'id', 'text', 'type']);
const emit = defineEmits(['handle-click']);

function handleClick() {
  emit('handle-click');
}
</script>