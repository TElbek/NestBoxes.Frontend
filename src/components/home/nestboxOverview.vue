<template>
    <div v-if="state.hasData">
        <div class="d-flex gap-1">
            <div>
                <navigation :boxesForCheckingCount="boxesForCheckingCount" :boxesCheckedCount="boxesCheckedCount"
                    :boxesNotCheckedCount="boxesNotCheckedCount" class="mb-2"></navigation>
            </div>
            <div class="ms-auto" v-if="!nestBoxFilter.filterForLatter">
                <input type="search" class="form-control form-control-sm" v-model="searchValue"
                    placeholder="Søg..." :class="[hasSearchValue ? 'bg-nestbox-light' : '']" v-focus/>
            </div>
        </div>
        <div>
            <loopNestBox v-if="tabSelected.index == 0" :nestBoxList="boxesForCheckingList">
            </loopNestBox>
            <loopNestBox v-if="tabSelected.index == 1" :nestBoxList="boxesCheckedList">
            </loopNestBox>
            <loopNestBox v-if="tabSelected.index == 2" :nestBoxList="boxesNotCheckedList" :showBrief="true">
            </loopNestBox>
        </div>
    </div>
</template>

<script setup>
import api from '@/api';
import navigation from '@/components/home/nestboxNavigation.vue';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';
import { storeToRefs } from 'pinia'

import { useTabSelectedStore } from '@/stores/overviewtabselected.js';
import { useNestboxFilterStore } from '@/stores/nestboxfilter.js';
import { searchItemForValue } from '@/js/searchItem.js';

const vFocus = {
  mounted: (el) => el.focus()
}

const tabSelected = useTabSelectedStore()
const nestBoxFilter = useNestboxFilterStore();

const { daysAhead } = storeToRefs(nestBoxFilter)
const { searchValue } = storeToRefs(nestBoxFilter)

import { onMounted, reactive, computed, watch } from 'vue';

const state = reactive({
    nestBoxList: {},
    hasData: false,
});

const boxesForCheckingCount = computed(() => boxesForCheckingList.value.length);
const boxesCheckedCount = computed(() => boxesCheckedList.value.length);
const boxesNotCheckedCount = computed(() => boxesNotCheckedList.value.length);

const boxesForCheckingList = computed(() => getNestBoxFiltered(state.nestBoxList.boxesForChecking));
const boxesCheckedList = computed(() => getNestBoxFiltered(state.nestBoxList.boxesChecked));
const boxesNotCheckedList = computed(() => getNestBoxFiltered(state.nestBoxList.boxesNotChecked));

const uniqueOrientations = ['N','NØ','Ø','SØ','V','SV','NV'];

const hasSearchValue = computed(() => {
    return nestBoxFilter.searchValue.length >= 1 && !isNaN(nestBoxFilter.searchValue) || 
           nestBoxFilter.searchValue.length >= 2 &&  isNaN(nestBoxFilter.searchValue) || 
           isOrientationSearchValue.value;
});

const isOrientationSearchValue = computed(() => {return uniqueOrientations.includes(nestBoxFilter.searchValue.toUpperCase())})

onMounted(() => {
    getNestBoxes();
});

function getNestBoxes() {
    api.get('nestbox/checkme?before=' + nestBoxFilter.daysAhead)
        .then(res => {
            state.nestBoxList = res.data;
            state.hasData = true;
        })
};

function getSortedByFid(list) {
    return list.sort((a, b) => parseInt(a.properties.boxId) - parseInt(b.properties.boxId));
}

function getNestBoxFiltered(list) {
    var result = list;

    if (nestBoxFilter.filterForLatter) {
        result = list.filter((item) => item.properties.altitude == 2);
    }

    else if (hasSearchValue.value && isNaN(nestBoxFilter.searchValue)) {        
        if(isOrientationSearchValue.value) {
            result = result.filter((item) => item.properties.orientation == nestBoxFilter.searchValue.toUpperCase())
        }
        else {
            result = result.filter((item) => searchItemForValue(item, nestBoxFilter.searchValue.toLowerCase()))
        }
    }

    else if (hasSearchValue.value && !isNaN(nestBoxFilter.searchValue)) {        
        result = result.filter((item) => item.properties.boxId == nestBoxFilter.searchValue || 
                                         item.properties.zone == nestBoxFilter.searchValue);
    }

    return getSortedByFid(result);
}

watch(daysAhead, async (newDaysAhead, oldDaysAhead) => {
    if (newDaysAhead != oldDaysAhead) {
        getNestBoxes();
    }
}); 
</script>

<style scoped>
input {
    width: 120px;
}
</style>