<template>
    <ul class="nav nav-pills" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[state.activeTab == 0 ? 'border border-2' : '']"
                @click="setActiveTab(0)">Tjekkes</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[state.activeTab == 1 ? 'border border-2' : '']"
                @click="setActiveTab(1)">OK</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" :class="[state.activeTab == 2 ? 'border border-2' : '']"
                @click="setActiveTab(2)">Ukendt</button>
        </li>
    </ul>
    <div class="mt-2 tab-content">
        <loopNestBox v-if="state.activeTab == 0" :nestBoxList="state.nestBoxList.boxesForChecking"></loopNestBox>
        <loopNestBox v-if="state.activeTab == 1" :nestBoxList="state.nestBoxList.boxesChecked"></loopNestBox>
        <loopNestBox :showBrief="true" v-if="state.activeTab == 2" :nestBoxList="state.nestBoxList.boxesNotChecked"></loopNestBox>
    </div>
</template>

<script setup>
import api from '@/api';
import loopNestBox from '@/components/nestbox/loopNestBox.vue';

import { onMounted, reactive, computed } from 'vue';

const state = reactive({
    nestBoxList: {},
    hasData: false,
    activeTab: 0
});


onMounted(() => {
    getNestBoxes();
});

function setActiveTab(tabIndex) {
    state.activeTab = tabIndex;
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