<template>
    <slot class="mr-1"></slot>
    <div v-if="state.hasRecord">
        <div v-if="hasSpecies" class="h6 fw-normal">{{ state.recordInfo.nesting.species }}</div>
        <div v-else>&nbsp;</div>
        <div class="fs-small text-nowrap">
            <span>{{ formatDate(state.recordInfo.datetime) }}</span>
            <template v-if="hasValue(state.recordInfo.nesting.eggs) || hasValue(state.recordInfo.nesting.chicks)">
                <span>&nbsp;-&nbsp;</span>
                <span v-if="hasValue(state.recordInfo.nesting.eggs)">&nbsp;{{ state.recordInfo.nesting.eggs }} Æg</span>
                <span v-if="hasValue(state.recordInfo.nesting.chicks)">&nbsp;{{ state.recordInfo.nesting.chicks}} Unger</span>
            </template>
            <span class="float-end fst-italic">&nbsp;{{ state.recordInfo.status.statusName }}</span>
        </div>
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

const hasSpecies = computed(() => {
    return state.recordInfo.nesting.species != null &&
        state.recordInfo.nesting.species.length > 0;
});

const props = defineProps({
    fid: Number
});

function hasValue(value) {
    return value != null && value > 0;
}

function getRecordInfo() {
    api.get('nestbox/record/' + props.fid + '/latest')
        .then(res => {
            if (res.data != "") {
                state.recordInfo = res.data;
                state.hasRecord = true;
            }
        })
}

function formatDate(date) {
    var options = {
        month: 'long',
        day: '2-digit'
    }
    return new Date(date).toLocaleDateString('da-dk', options);
}

onMounted(() => {
    getRecordInfo();
});
</script>

<style scoped>
.h6 {
    margin-bottom: 0.1rem;
}
</style>