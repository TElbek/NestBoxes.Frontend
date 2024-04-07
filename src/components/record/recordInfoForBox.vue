<template>
    <slot class="mr-1"></slot>
    <div v-if="state.hasRecord">
        <div v-if="hasSpecies" class="h6 fw-normal">{{  state.recordInfo.nesting.species}}</div>
        <div v-else>&nbsp;</div>
        <div class="fs-small text-nowrap">
            <span>{{ formatDate(state.recordInfo.datetime) }}&nbsp;-&nbsp;</span>
            <span v-if="state.recordInfo.nesting.eggs != null">&nbsp;{{ state.recordInfo.nesting.eggs }}</span>
            <span v-if="state.recordInfo.nesting.chicks != null">&nbsp;{{ state.recordInfo.nesting.chicks }}</span>
            <span>&nbsp;{{ state.recordInfo.status.statusName }}</span>
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

const hasSpecies = computed(() =>{
    return state.recordInfo.nesting.species != null && 
           state.recordInfo.nesting.species.length > 0;
});

const props = defineProps({
    fid: Number
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