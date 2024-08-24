<template>
  <div class="option-placeholder">
    <p>{{ props.order }}</p>
  </div>
</template>
<style lang="scss">
@import './OptionPlaceholder.scss';
</style>
<script setup lang="ts">
const props = defineProps<{
  order: number
}>()
</script>
