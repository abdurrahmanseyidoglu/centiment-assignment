<template>
  <header>
    <AppNavbar />
  </header>
  <main>
    <QuestionsArea />
  </main>
  <footer>
    <AppFooter />
  </footer>
</template>

<script setup lang="ts">
import AppFooter from './components/AppFooter/AppFooter.vue'
import AppNavbar from './components/AppNavbar/AppNavbar.vue'
import QuestionsArea from './components/QuestionsArea/QuestionsArea.vue'
import { provide } from 'vue'

// Dynamically set the limit of the ranked values
let maxRankedItemsKey = 3
provide('maxRankedItemsKey', maxRankedItemsKey)
</script>
