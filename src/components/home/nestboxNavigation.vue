<template>
    <ul class="nav nav-pills" id="myTab" role="tablist">
        <li class="nav-item px-1 d-none d-md-block" role="presentation" v-for="status in state.statusses">
            <button class="nav-link" id="check-tab" data-bs-toggle="tab" data-bs-target="#check" type="button"
                role="tab" aria-controls="check" aria-selected="true" @click="setActiveTab(status.tab)"
                :class="[status.tab == tabSelected.index ? 'active' : '']">{{ status.caption }} ({{
            countForTab(status.tab) }})</button>
        </li>

        <li class="nav-item dropdown px-0 d-md-none">
            <a class="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-expanded="false">
                {{ selectedCaption }}: {{ countForTab(tabSelected.index) }}
            </a>
            <ul class="dropdown-menu">
                <li v-for="status in state.statusses" class="dropdown-item" @click="setActiveTab(status.tab)">{{
            countForTab(status.tab) }}: {{ status.caption }}</li>
            </ul>
        </li>

        <li class="nav-item dropdown px-1">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false"
                :class="[nestBoxFilter.hasZoneValue ? 'active' : '']">Zone {{ nestBoxFilter.filterZone
                }}</a>
            <ul class="dropdown-menu" style="max-height:300px; overflow-y: auto;">
                <li><a class="dropdown-item" @click="setZoneFilter(null)">Alle</a></li>
                <li v-for="zone in state.zoneList">
                    <a class="dropdown-item" @click="setZoneFilter(zone.zoneId)">{{ zone.zoneId }}</a>
                </li>
            </ul>
        </li>

        <li class="nav-item px-1" role="presentation">
            <button class="nav-link" type="button" :class="[nestBoxFilter.filterForLatter ? 'active' : '']" role="tab"
                aria-controls="unknown" aria-selected="false" @click="setFilterForLatter()">Stige</button>
        </li>
    </ul>
</template>

<script setup>
import api from '@/api';
import { onMounted, reactive, computed } from 'vue';
import { useTabSelectedStore } from '@/stores/overviewtabselected.js';
import { useNestboxFilterStore } from '@/stores/nestboxfilter.js'

const tabSelected = useTabSelectedStore();
const nestBoxFilter = useNestboxFilterStore();

const props = defineProps({
    boxesForCheckingCount: 0,
    boxesCheckedCount: 0,
    boxesNotCheckedCount: 0,
});

const state = reactive({
    zoneList: [],
    statusses: [
        { caption: 'Tjekkes', tab: 0 },
        { caption: 'OK', tab: 1 },
        { caption: 'Ukendt', tab: 2 }
    ]
});

onMounted(() => {
    getZoneList();
});

const selectedCaption = computed(() => {
    return state.statusses[tabSelected.index].caption;
});

function countForTab(tab) {
    switch (tab) {
        case 0: return props.boxesForCheckingCount;
        case 1: return props.boxesCheckedCount;
        case 2: return props.boxesNotCheckedCount;
    }
}

function setActiveTab(tabIndex) {
    tabSelected.set(tabIndex);
};

function setFilterForLatter() {
    nestBoxFilter.toggleFilterForLatter();
};

function setZoneFilter(zone) {
    nestBoxFilter.setFilterZone(zone);
}

function getZoneList() {
    api.get(import.meta.env.VITE_VUE_API_BASE_URL + 'nestbox/zones')
        .then(res => {
            state.zoneList = res.data.sort((a, b) => parseInt(a.zoneId.replace(/\D/g, '')) - parseInt(b.zoneId.replace(/\D/g, '')));
        })
}
</script>

<style scoped>
.nav-pills .nav-link {
    width: 110px;
    padding: 5px;
    color: #000000;
    border: 1px solid #ffffff;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: #000000;
    background-color: transparent;
    border: 1px solid #0000ff70;
}
</style>