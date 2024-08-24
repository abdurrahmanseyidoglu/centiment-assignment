<template>
  <div class="single_option">
    <p :class="isRanked && 'ellipsis-text'">{{ props.option.label }}</p>
    <IconGrayArrowRight v-if="!props.isRanked" />
  </div>
</template>
<style lang="scss">
@import './OptionItem.scss';
</style>
<script setup lang="ts">
import type { Option } from '@/types/interfaces'
import IconGrayArrowRight from '../icons/IconGrayArrowRight.vue'
const props = defineProps<{
  option: Option
  isRanked: boolean
}>()
</script>
