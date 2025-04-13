<template>
    <div class="row">
        <span class="col h4">{{ route.meta.title }}</span>
        <div class="col-auto">
            <div class="btn btn-sm btn-success" @click="addRepair()">Opret</div>
        </div>
    </div>
    <div class="scroll mb-2">
        <div v-if="state.hasData" class="mb-2 row row-cols-1 row-cols-lg-3 g-3">
            <div v-for="repairTypeId in uniqueRepairTypes">
                <div class="fw-bold mb-1 mt-2 h5 pb-1 border-bottom">
                    <span>{{ getRepairTypeNameById(repairTypeId) }}</span>
                    <span class="ms-1">({{ countOfReparsForRepairType(repairTypeId) }})</span>
                </div>
                <div class="row row-cols-1 row-cols-xl-2 g-2">
                    <div v-for="repairItem in repairListByRepairType(repairTypeId)" class="col">
                        <repair :repairModel="repairItem"></repair>
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

import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();

const state = reactive({
    repairList: {},
    repairTypes: [],
    hasData: false,
});

onMounted(() => {
    getRepairTypes();
});

const uniqueRepairTypes = computed(() => {
    const uniqueList = [...new Set(state.repairList.map(repair => repair.repairType.repairTypeId))];
    return uniqueList.sort((a,b) => a - b).reverse();
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