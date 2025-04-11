<template>
    <div v-if="state.hasData" class="mb-2">
        <div v-for="repairType in state.repairTypes">
           <template v-if="repairTypeHasRepairs(repairType.repairTypeId)">
            <div class="h5">{{ repairType.repairTypeName}}</div>
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 row-cols-xxl-5 g-2 mb-3">
                <div v-for="repair in repairListByRepairType(repairType.repairTypeId)" class="col">
                    <repair :repair="repair"></repair>
                </div>
            </div>
           </template>
        </div>
    </div>
    <div class="btn btn-sm btn-success" @click="addRepair()">Tilføj</div>
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

function repairListByRepairType (repairTypeId) {
    return state.repairList.filter((item) => item.repairType.repairTypeId == repairTypeId);
}

function repairTypeHasRepairs(repairTypeId) {
    return repairListByRepairType(repairTypeId).length > 0;
}

function getRepairTypes() {
    api.get('repair/type')
        .then(res => {
            state.repairTypes = res.data;
        })
};

function addRepair() {
    router.push({ name: 'repairAdd' });
}
</script>