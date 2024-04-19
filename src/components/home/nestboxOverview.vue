<template>
    <div v-if="state.hasData">
        <div>
            <navigation :boxesForCheckingCount="boxesForCheckingCount" :boxesCheckedCount="boxesCheckedCount"
                :boxesNotCheckedCount="boxesNotCheckedCount" class="mb-2"></navigation>
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
import { storeToRefs } from 'pinia'
import { useTabSelectedStore } from '@/stores/overviewtabselected.js';
import navigation from '@/components/home/nestboxNavigation.vue';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';
import { useNestboxFilterStore } from '@/stores/nestboxfilter.js'

const tabSelected = useTabSelectedStore()
const nestBoxFilter = useNestboxFilterStore();

const { daysAhead } = storeToRefs(nestBoxFilter)

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

onMounted(() => {
    getNestBoxes();
});

function getNestBoxes() {
    api.get('nestbox/checkme?before=' + nestBoxFilter.daysAhead)
        .then(res => {
            state.nestBoxList = res.data;;
            state.hasData = true;
        })
};

function getSortedByFid(list) {
    return list.sort((a, b) => parseInt(a.boxId) - parseInt(b.boxId));
}

function getNestBoxFiltered(list) {
    var result = list;

    if (nestBoxFilter.filterForLatter) {
        result = list.filter((item) => item.altitude == 2);
    }

    if (nestBoxFilter.filterZone != null) {
        result = result.filter((item) => item.zone == nestBoxFilter.filterZone);
    }

    return getSortedByFid(result);
}

watch(daysAhead, async (newDaysAhead, oldDaysAhead) => {
    if (newDaysAhead != oldDaysAhead) {
        getNestBoxes();
    }
}); 
</script>