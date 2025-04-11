<template>
    <div class="row">
        <span class="col h4">Reparation</span>
        <div class="col-auto">
            <div class="btn btn-sm btn-success" @click="addRepair()">Opret</div>
        </div>
    </div>
    <div class="border-top scroll mb-2">
        <div v-if="state.hasData" class="mb-2 row row-cols-1 row-cols-lg-3 g-3">
            <div v-for="repairTypeId in uniqueRepairTypes">
                <div class="fw-bold mb-1 mt-2 h5 pb-1">
                    <span>{{ getRepairTypeNameById(repairTypeId) }}</span>
                    <span class="ms-1">({{ countOfReparsForRepairType(repairTypeId) }})</span>
                </div>
                <div class="row row-cols-1 row-cols-xl-2 g-2">
                    <div v-for="item in repairListByRepairType(repairTypeId)" class="col">
                        <repair :repairModel="item"></repair>
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
    getRepairTypes();
});

const uniqueRepairTypes = computed(() => {
    return [...new Set(state.repairList.map(repair => repair.repairType.repairTypeId))];
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

function getRepairTypeNameById(id) {
    return state.repairTypes.filter((item) => item.repairTypeId == id)[0].repairTypeName;
}

function getRepairTypes() {
    api.get('repair/type')
        .then(res => {
            state.repairTypes = res.data.reverse();
            getRepairList();
        })
};

function addRepair() {
    router.replace({ name: 'repairAdd' });
}
</script>