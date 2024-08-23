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
            <div class="single-question__options-wrapper">
                <div class="single-question__options">
                    <VueDraggable v-model="optionsList" :animation="150" ghostClass="ghost" group="rank" :sort="false"
                        :disabled="!(rankedOptions.length < 3)">
                        <div class="single-question__option" v-for="option in optionsList" :key="option.id">
                            <p>{{ option.label }}</p>
                            <IconGrayArrowRight />
                        </div>
                    </VueDraggable>
                </div>
                <div class="single-question__options--ranked">
                    <VueDraggable v-model="rankedOptions" :animation="150" ghostClass="ghost" group="rank" :sort="true"
                        @update="onUpdate" @add="onAdd" @remove="onRemove" @start="onStart">
                        <div class="single-question__option" v-for="rankedItem in rankedOptions" :key="rankedItem.id">
                            <p>{{ rankedItem.label }}</p>
                            <IconGrayArrowRight />
                        </div>
                    </VueDraggable>
                </div>
            </div>
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
interface Option {
    label: string;
    id: number;
}

const optionsList = ref<Option[]>([
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
]);

const rankedOptions = ref<Option[] | []>([

]);



// const rankedOptions = ref(
//   optionsList.value.map((item) => ({
//     label: `${item.label}-2`,
//     id: `${item.id}-2`
//   }))
// ) 
function onUpdate() {
    console.log('update')
}
function onAdd() {
    console.log(rankedOptions.value.length)

}
function onRemove() {
    console.log(rankedOptions.value.length);
    console.log('after remove')

}
function onStart() {
    console.log("started :D");
    console.log(rankedOptions.value.length);


}

</script>
