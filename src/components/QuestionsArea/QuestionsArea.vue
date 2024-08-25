<template>
  <div class="questions">
    <QuestionsNavigation />
    <SingleQuestion />
  </div>
</template>

<script setup lang="ts">
import QuestionsNavigation from '../QuestionsNavigation/QuestionsNavigation.vue'
import SingleQuestion from '../SingleQuestion/SingleQuestion.vue'
</script>

<style lang="scss">
@import './QuestionsArea.scss';
</style>
