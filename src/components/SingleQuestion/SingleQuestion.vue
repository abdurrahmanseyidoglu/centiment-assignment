<template>
  <div class="single-question container">
    <button class="single-question__prev" title="previous question" type="button">
      <IconGrayArrowUp />
      <p>Prev</p>
    </button>
    <QuestionHeader />
    <div class="single-question__lists-wrapper">
      <div class="single-question__options-list" ref="optionsWrapper">
        <VueDraggable
          v-model="optionsList"
          :animation="150"
          ghostClass="blue-background"
          dragClass="blue-background"
          group="ranking"
          :disabled="isDragDisabled"
        >
          <OptionItem
            v-for="option in optionsList"
            :key="option.id"
            :option="option"
            :isRanked="false"
            @click="handleAddOption(option)"
            :class="rankedList.length>= maxRankedItems && 'disabled-option'"
          />
        </VueDraggable>
      </div>
      <div class="single-question__ranked-list" :style="{ minHeight: optionsWrapperHeight + 'px' }">
        <VueDraggable
          v-model="rankedList"
          :animation="150"
          ghostClass="blue-background"
          dragClass="blue-background"
          group="ranking"
          :sort="true"
          @add="onAdd"
          @end="onEnd"
          @start="onStart"
        >
          <OptionItem
            v-for="option in rankedList"
            :key="option.id"
            :option="option"
            :isRanked="true"
            @click="handleRemoveOption(option)"
          />
        </VueDraggable>

        <div class="single-question__placeholders">
          <OptionPlaceholder v-for="i in maxRankedItems" :key="i" :order="i" />
          <div class="single-question__reset" @click="handleReset">
            <IconReset />
            <p>Reset</p>
          </div>
        </div>
      </div>
    </div>
    <button class="single-question__next" type="button" @click="handleNextClick">
      <p>Next</p>
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, inject } from 'vue'
import IconGrayArrowUp from '../icons/IconGrayArrowUp.vue'
import { VueDraggable } from 'vue-draggable-plus'
import IconReset from '../icons/IconReset.vue'
import OptionItem from '../OptionItem/OptionItem.vue'
import OptionPlaceholder from '../OptionPlaceholder/OptionPlaceholder.vue'

import type { Option } from '@/types/interfaces'
import { useNotify } from '@/composables/useNotify'
import QuestionHeader from '../QuestionHeader/QuestionHeader.vue'
const maxRankedItems = inject<number>('maxRankedItemsKey', 3)

const originalOptionsList = ref<Option[]>([
  { label: 'Salary and benefits', id: 1 },
  { label: 'Work-life balance', id: 2 },
  { label: 'Career advancement opportunities', id: 3 },
  { label: 'Company culture', id: 4 },
  { label: 'Job location', id: 5 }
])

const optionsList = ref<Option[]>([...originalOptionsList.value])
const rankedList = ref<Option[]>([])
const isDragDisabled = ref<boolean>(false)

function updateOptionsListDraggableState(): void {
  if (rankedList.value.length >= maxRankedItems) {
    isDragDisabled.value = true
  } else {
    isDragDisabled.value = false
  }
}

function onAdd(): void {
  updateOptionsListDraggableState()
}

function onStart(): void {
  isDragDisabled.value = false
}

function onEnd(): void {
  updateOptionsListDraggableState()
}

function handleReset(): void {
  optionsList.value = [...originalOptionsList.value]
  rankedList.value.length = 0
  isDragDisabled.value = false
}

function handleNextClick() {
  if (rankedList.value.length === maxRankedItems) {
    let rankedListResult = ''
    rankedList.value.forEach(
      (option, index) => (rankedListResult += `<p>${index + 1}. ${option.label}</p>`)
    )
    useNotify('default', `<strong>Your ranked options are: ${rankedListResult}</strong>`)
  } else {
    useNotify('info', `Please rank all ${maxRankedItems} options first`)
  }
}

// START click-to-select feature
function handleAddOption(option: Option) {
  // Show a warning if the user tries to add more than the maxRankedItems
  if (rankedList.value.length === maxRankedItems) {
    useNotify('warning', `You can't rank more than ${maxRankedItems} options`)
  }
  if (rankedList.value.length < maxRankedItems) {
    rankedList.value.push(option)
    optionsList.value = optionsList.value.filter(
      (filteredOption) => filteredOption.id !== option.id
    )
    updateOptionsListDraggableState()
  }

}
function handleRemoveOption(option: Option) {
  optionsList.value.push(option)
  rankedList.value = rankedList.value.filter((filteredOption) => filteredOption.id !== option.id)
  updateOptionsListDraggableState()
}
// END click-to-select feature

const optionsWrapper = ref<HTMLElement | null>(null)
const optionsWrapperHeight = ref<number>(0)

onMounted(() => {
  if (optionsWrapper.value) {
    optionsWrapperHeight.value = optionsWrapper.value.offsetHeight
  }
})
</script>
<style lang="scss">
@import './SingleQuestion.scss';
</style>
