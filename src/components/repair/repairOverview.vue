<template>
    <div class="row">
        <span class="col h4">Reparation</span>
        <div class="col-auto">
            <div class="btn btn-sm btn-success" @click="addRepair()">Opret</div>
        </div>
    </div>
    <div class="border-top scroll mb-2">
        <div v-if="state.hasData" class="mb-2 row row-cols-1 row-cols-lg-3 g-3">
            <div v-for="repairType in state.repairTypes">
                <div class="fw-bold mb-1 mt-2 h5 pb-1">
                    <span>{{ repairType.repairTypeName }}</span>
                    <span class="ms-1">({{ countOfReparsForRepairType(repairType.repairTypeId) }})</span>
                </div>
                <div class="row row-cols-1 row-cols-xl-2 g-2">
                    <div v-for="repair in repairListByRepairType(repairType.repairTypeId)" class="col">
                        <repair :repair="repair"></repair>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import api from '@/api';
import { onMounted, reactive, computed, watch } from 'vue';
import repair from '@/components/repair/repair.vue';

import { useRouter } from 'vue-router';
const router = useRouter();

const state = reactive({
    repairList: {},
    repairTypes: [],
    hasData: false,
});

onMounted(() => {
    getRepairList();
    getRepairTypes();
});

function getRepairList() {
    api.get('repair/list')
        .then(res => {
            state.repairList = res.data;
            state.hasData = true;
        })
};

function repairListByRepairType(repairTypeId) {
    return state.repairList.filter((item) => item.repairType.repairTypeId == repairTypeId);
}

function countOfReparsForRepairType(repairTypeId) {
    return repairListByRepairType(repairTypeId).length;
}

function repairTypeHasRepairs(repairTypeId) {
    return repairListByRepairType(repairTypeId).length > 0;
}

function getRepairTypes() {
    api.get('repair/type')
        .then(res => {
            state.repairTypes = res.data.reverse();
        })
};

function addRepair() {
    router.replace({ name: 'repairAdd' });
}
</script>