<template>
    <ul class="nav nav-pills" role="tablist" v-if="state.hasData">
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[tabSelected.index == 0 ? 'border border-2' : '']"
                @click="setActiveTab(0)">Tjekkes ({{ state.nestBoxList.boxesForChecking.length }})</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[tabSelected.index == 1 ? 'border border-2' : '']"
                @click="setActiveTab(1)">OK ({{ state.nestBoxList.boxesChecked.length }})</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[tabSelected.index == 2 ? 'border border-2' : '']"
                @click="setActiveTab(2)">Ukendt ({{ state.nestBoxList.boxesNotChecked.length }})</button>
        </li>
    </ul>
    <div class="mt-2" v-if="state.hasData">
        <loopNestBox v-if="tabSelected.index == 0" :nestBoxList="boxesForCheckingList"></loopNestBox>
        <loopNestBox v-if="tabSelected.index == 1" :nestBoxList="boxesCheckedList"></loopNestBox>
        <loopNestBox v-if="tabSelected.index == 2" :nestBoxList="boxesNotCheckedList" :showBrief="true" ></loopNestBox>
    </div>
</template>

<script setup>
import api from '@/api';
import {useTabSelectedStore} from '@/stores/overviewtabselected.js';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

const tabSelected = useTabSelectedStore()

import { onMounted, reactive, computed } from 'vue';

const state = reactive({
    nestBoxList: {},
    hasData: false,
});

const boxesForCheckingList = computed(() => getSortedByFid(state.nestBoxList.boxesForChecking));
const boxesCheckedList = computed(() => getSortedByFid(state.nestBoxList.boxesChecked));
const boxesNotCheckedList = computed(() => getSortedByFid(state.nestBoxList.boxesNotChecked));

onMounted(() => {
    getNestBoxes();
});

function setActiveTab(tabIndex) {
    tabSelected.set(tabIndex);    
}

function getNestBoxes() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/checkme?before=' + import.meta.env.VITE_VUE_CHECKME_DAYSAHEAD)
        .then(res => {
            state.nestBoxList = res.data;;
            state.hasData = true;
        })
};

function getSortedByFid(list) {
    return list.sort((a, b) => parseInt(a.fid) - parseInt(b.fid));
}
</script>

<style scoped>
.nav-link {
    color: black;
}
</style>