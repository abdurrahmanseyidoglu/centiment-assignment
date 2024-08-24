<template>
  <div class="questions">
    <div class="questions-navigation">
      <button class="questions-navigation__prev">
        <IconBlueArrowUp />
      </button>
      <button class="questions-navigation__next">
        <IconBlueArrowDown />
      </button>
    </div>
    <div class="single-question container">
      <button class="single-question__prev">
        <IconGrayArrowUp />
        <p>Prev</p>
      </button>
      <div class="single-question__header">
        <p class="single-question__title">
          Which of the following are most important when selecting a job?
        </p>
        <p class="single-question__sub-title">Rank your top three items</p>
      </div>
      <div class="single-question__lists-wrapper">
        <div class="single-question__options-list">
          <VueDraggable
            v-model="optionsList"
            :animation="150"
            ghostClass="blue-background"
            dragClass="blue-background"
            group="ranking"
            :sort="false"
            :disabled="isDragDisabled"
          >
            <div class="single-question__option" v-for="option in optionsList" :key="option.id">
              <p>{{ option.label }}</p>
              <IconGrayArrowRight />
            </div>
          </VueDraggable>
        </div>
        <div class="single-question__ranked-list">
          <VueDraggable
            v-model="rankedOptions"
            :animation="150"
            ghostClass="blue-background"
            dragClass="blue-background"
            group="ranking"
            :sort="true"
            @add="onAdd"
            @remove="onRemove"
            @end="onEnd"
            @start="onStart"
          >
            <div
              class="single-question__ranked-option"
              v-for="rankedItem in rankedOptions"
              :key="rankedItem.id"
            >
              <p>{{ rankedItem.label }}</p>
            </div>
          </VueDraggable>

          <div class="single-question__placeholders">
            <div class="single-question__placeholder" v-for="i in 3" :key="i">
              <p>{{ i }}</p>
            </div>
            <div class="single-question__reset" @click="handleReset">
              <IconReset />
              <p>Reset</p>
            </div>
          </div>
        </div>
      </div>
      <button class="single-question__next" @click="handleNextClick">
        <p>Next</p>
      </button>
    </div>
  </div>
</template>
<style lang="scss">
@import './QuestionsArea.scss';
</style>
<script setup lang="ts">
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import IconBlueArrowDown from '../icons/IconBlueArrowDown.vue'
import IconBlueArrowUp from '../icons/IconBlueArrowUp.vue'
import IconGrayArrowRight from '../icons/IconGrayArrowRight.vue'
import IconGrayArrowUp from '../icons/IconGrayArrowUp.vue'
import IconReset from '../icons/IconReset.vue'

interface Option {
  label: string
  id: number
}

const originalOptionsList = ref<Option[]>([
  {
    label: 'Salary and benefits',
    id: 1
  },
  {
    label: 'Work-life balance',
    id: 2
  },
  {
    label: 'Career advancement opportunities',
    id: 3
  },
  {
    label: 'Company culture',
    id: 4
  },
  {
    label: 'Job location',
    id: 5
  }
])

//Get a copy of the original array to work on it while keeping the original one untouched for the RESET button
const optionsList = ref<Option[]>(originalOptionsList.value)
const rankedOptions = ref<Option[]>([])
const isDragDisabled = ref<boolean>(false)
function disableOptionsListDrag(): void {
  if (rankedOptions.value.length >= 3) {
    isDragDisabled.value = true
  }
}

function onAdd(): void {
  disableOptionsListDrag()
}
function onRemove(): void {
  disableOptionsListDrag()
}

function onStart(): void {
  //Make it false so user can drag from the ranked list back to the options list
  isDragDisabled.value = false
}
function onEnd(): void {
  disableOptionsListDrag()
}
function handleReset(): void {
  // Reset optionsList to its original state
  optionsList.value = [...originalOptionsList.value]
  rankedOptions.value.length = 0
  isDragDisabled.value = false
}
function handleNextClick() {
  rankedOptions.value.forEach((option) => console.log(option.label))
}
</script>
