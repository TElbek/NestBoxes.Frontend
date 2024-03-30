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
    <div class="mt-2 tab-content">
        <loopNestBox v-if="tabSelected.index == 0" :nestBoxList="state.nestBoxList.boxesForChecking"></loopNestBox>
        <loopNestBox v-if="tabSelected.index == 1" :nestBoxList="state.nestBoxList.boxesChecked"></loopNestBox>
        <loopNestBox v-if="tabSelected.index == 2" :nestBoxList="state.nestBoxList.boxesNotChecked" :showBrief="true" ></loopNestBox>
    </div>
</template>

<script setup>
import api from '@/api';
import {useTabSelectedStore} from '@/stores/overviewtabselected.js';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

const tabSelected = useTabSelectedStore()

import { onMounted, reactive } from 'vue';

const state = reactive({
    nestBoxList: {},
    hasData: false,
});


onMounted(() => {
    getNestBoxes();
});

function setActiveTab(tabIndex) {
    tabSelected.set(tabIndex);
}

function getNestBoxes() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/checkme?before=8')
        .then(res => {
            state.nestBoxList = res.data;
            state.hasData = true;
        })
};
</script>

<style scoped>
.nav-link {
    color: black;
}
</style>