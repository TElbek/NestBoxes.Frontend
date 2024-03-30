<template>
    <div v-if="state.hasRecord">
        <span class="fs-6">{{ state.recordInfo.nesting.species }}</span>
        <!-- <div class="row">
            <div class="col-auto">Æg</div>
            <div class="col">{{ state.recordInfo.nesting.eggs }}</div>
            <div class="col-auto">Unger</div>
            <div class="col">{{ state.recordInfo.nesting.chicks }}</div>
        </div> -->
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