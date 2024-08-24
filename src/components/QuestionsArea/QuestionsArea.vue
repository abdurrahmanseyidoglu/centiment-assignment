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
      <div
        class="single-question__lists-wrapper"
        ref="listsWrapper"
        :style="{ minHeight: listsWrapperHeight + 'px' }"
      >
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
            <OptionItem
              v-for="option in optionsList"
              :key="option.id"
              :option="option"
              :isRanked="false"
            />
          </VueDraggable>
        </div>
        <div class="single-question__ranked-list">
          <VueDraggable
            v-model="rankedList"
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
            <OptionItem
              v-for="option in rankedList"
              :key="option.id"
              :option="option"
              :isRanked="true"
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
import { ref, onMounted } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import IconBlueArrowDown from '../icons/IconBlueArrowDown.vue'
import IconBlueArrowUp from '../icons/IconBlueArrowUp.vue'
import IconGrayArrowUp from '../icons/IconGrayArrowUp.vue'
import IconReset from '../icons/IconReset.vue'
import OptionItem from '../OptionItem/OptionItem.vue'
import OptionPlaceholder from '../OptionPlaceholder/OptionPlaceholder.vue'
import type { Option } from '@/types/interfaces'
const props = defineProps({
  maxRankedItems: {
    type: Number,
    default: 2
  }
})
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
const optionsList = ref<Option[]>([...originalOptionsList.value])
const rankedList = ref<Option[]>([])
const isDragDisabled = ref<boolean>(false)

function disableOptionsListDrag(): void {
  if (rankedList.value.length >= props.maxRankedItems) {
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
  rankedList.value.length = 0
  isDragDisabled.value = false
}
function handleNextClick() {
  rankedList.value.forEach((option, index) => console.log(`${index + 1}. ${option.label}`))
}

const listsWrapper = ref<HTMLElement | null>(null)
const listsWrapperHeight = ref<number>(0)

onMounted(() => {
  if (listsWrapper.value) {
    listsWrapperHeight.value = listsWrapper.value.offsetHeight
  }
})
</script>
