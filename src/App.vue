<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <QuestionsArea :max-ranked-items="3" />
  </main>
  <footer>
    <AppFooter />
  </footer>
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter/AppFooter.vue'
import AppNavbar from './components/AppNavbar/AppNavbar.vue'
import QuestionsArea from './components/QuestionsArea/QuestionsArea.vue'
</script>
