<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <QuestionsArea :max-ranked-items="3" />
  </main>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar/AppNavbar.vue'
import QuestionsArea from './components/QuestionsArea/QuestionsArea.vue'
</script>
