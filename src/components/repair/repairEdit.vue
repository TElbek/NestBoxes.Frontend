<template>
    <div>
    </div>
</template>

<script setup>
import api from '@/api';
import {useRoute} from 'vue-router';
import { onMounted, reactive, computed, watch } from 'vue';

const route = useRoute();
const state = reactive({
    nestBoxList: [],
    repairTypes: [],
    repair: {},
    hasData: false,
});

onMounted(() => {
    getNestBoxList();
    getRepairTypes();
    if(isAddRoute) {
        getNewRepair();
    }
});

const isAddRoute = computed(() => {return route == 'RepairAdd'});

function getNestBoxList() {
    api.get('nestbox')
        .then(res => {
            state.nestBoxList = res.data;
        })
};

function getRepairTypes() {
    api.get('repair/type')
        .then(res => {
            state.repairTypes = res.data;
        })
};

function getNewRepair() {
    api.get('repair/new')
        .then(res => {
            state.repair = res.data;
        });
}
</script>