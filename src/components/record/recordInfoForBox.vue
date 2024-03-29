<template>
    <div v-if="state.hasRecord">
        <span class="fs-6">{{ state.recordInfo.nesting.species }}</span>
        <!-- <span>{{ addInfo }}</span>
        <div>Eggs: {{ state.recordInfo.nesting.eggs }} {{ hasEggs }}</div>
        <div>Chicks: {{ state.recordInfo.nesting.chicks }} {{hasChicks }}</div> -->
    </div>
    <div v-else>
        <span>&nbsp;</span>
    </div>
</template>

<script setup>
import api from '@/api';
import { onMounted, reactive, computed } from 'vue';

const state = reactive({
    recordInfo: {},
    hasRecord: false
});

const props = defineProps({
    fid: Number
});

const hasEggs = computed(() => state.hasRecord && state.recordInfo.nesting.eggs != null);
const hasChicks = computed(() => state.hasRecord && state.recordInfo.nesting.chicks !== null);

const eggs = computed(() => state.hasRecord ? state.recordInfo.nesting.eggs : 0);
const chicks = computed(() => state.hasRecord ? state.recordInfo.nesting.chicks : 0);

const addInfo = computed(() => {
    var info = "";
    if (hasEggs || hasChicks) {
        info += " med ";
    }
    if (hasEggs) {
        info += eggs.value + " æg";
    };
    if (hasChicks) {
        info += chicks.value + " unger";
    };
    return info;
});

function getRecordInfo() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/record/' + props.fid + '/latest')
        .then(res => {
            if (res.data != "") {
                state.recordInfo = res.data;
                state.hasRecord = true;
            }
        })
}

onMounted(() => {
    getRecordInfo();
});
</script>