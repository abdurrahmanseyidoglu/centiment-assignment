<template>
  <div class="questions-navigation">
    <button class="questions-navigation__prev" title="previous question" type="button">
      <IconBlueArrowUp />
    </button>
    <button class="questions-navigation__next" title="next question" type="button">
      <IconBlueArrowDown />
    </button>
  </div>
</template>
<script setup lang="ts">
import IconBlueArrowDown from '../icons/IconBlueArrowDown.vue'
import IconBlueArrowUp from '../icons/IconBlueArrowUp.vue'
</script>
<style lang="scss">
@import './QuestionsNavigation.scss';
</style>
