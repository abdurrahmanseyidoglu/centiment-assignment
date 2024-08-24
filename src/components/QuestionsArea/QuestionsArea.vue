<template>
  <div class="questions">
    <div class="questions-navigation">
      <button class="questions-navigation__prev" title="previous question" type="button">
        <IconBlueArrowUp />
      </button>
      <button class="questions-navigation__next" title="next question" type="button">
        <IconBlueArrowDown />
      </button>
    </div>
    <div class="single-question container">
      <button class="single-question__prev" title="previous question" type="button">
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
            />
          </VueDraggable>
        </div>
        <div
          class="single-question__ranked-list"
          :style="{ minHeight: optionsWrapperHeight + 'px' }"
        >
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
            <OptionPlaceholder v-for="i in props.maxRankedItems" :key="i" :order="i" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import IconBlueArrowDown from '../icons/IconBlueArrowDown.vue'
import IconBlueArrowUp from '../icons/IconBlueArrowUp.vue'
import IconGrayArrowUp from '../icons/IconGrayArrowUp.vue'
import IconReset from '../icons/IconReset.vue'
import OptionItem from '../OptionItem/OptionItem.vue'
import OptionPlaceholder from '../OptionPlaceholder/OptionPlaceholder.vue'
import type { Option } from '@/types/interfaces'
import { useNotify } from '@/composables/useNotify'

const props = defineProps({
  maxRankedItems: {
    type: Number,
    default: 2
  }
})

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
  if (rankedList.value.length >= props.maxRankedItems) {
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
  if (rankedList.value.length === props.maxRankedItems) {
    let rankedListResult = ''
    rankedList.value.forEach(
      (option, index) => (rankedListResult += `<p>${index + 1}. ${option.label}</p>`)
    )
    useNotify('default', `<strong>Your preferred options are: ${rankedListResult}</strong>`)
  } else {
    useNotify('info', `Please rank all ${props.maxRankedItems} items first`)
  }
}

//click-to-select feature
function handleAddOption(option: Option) {
  if (rankedList.value.length === props.maxRankedItems) {
    useNotify('warning', `You can't use more than ${props.maxRankedItems} items`)
  }
  if (rankedList.value.length < props.maxRankedItems) {
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

const optionsWrapper = ref<HTMLElement | null>(null)
const optionsWrapperHeight = ref<number>(0)

onMounted(() => {
  if (optionsWrapper.value) {
    optionsWrapperHeight.value = optionsWrapper.value.offsetHeight
  }
})
</script>

<style lang="scss">
@import './QuestionsArea.scss';
</style>
