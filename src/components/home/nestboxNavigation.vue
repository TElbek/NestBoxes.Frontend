<template>
    <ul class="nav nav-pills" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
            <button class="flex-sm-fill text-sm-center nav-link active" id="check-tab" data-bs-toggle="tab"
                data-bs-target="#check" type="button" role="tab" aria-controls="check" aria-selected="true"
                @click="setActiveTab(0)">Tjekkes ({{ boxesForCheckingCount }})</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="flex-sm-fill text-sm-center nav-link" id="ok-tab" data-bs-toggle="tab"
                data-bs-target="#ok" type="button" role="tab" aria-controls="ok" aria-selected="false"
                @click="setActiveTab(1)">OK ({{ boxesCheckedCount }})</button>
        </li>
        <li class="nav-item" role="presentation">
            <button class="nav-link" id="unknown-tab" data-bs-toggle="tab" data-bs-target="#unknown" type="button"
                role="tab" aria-controls="unknown" aria-selected="false" @click="setActiveTab(2)">Ukendt ({{ boxesNotCheckedCount }})</button>
        </li>

        <li class="nav-item" role="presentation">
            <button class="nav-link" type="button"
                :class="[nestBoxFilter.filterForLatter ? 'border border-success' : '']"
                role="tab" aria-controls="unknown" aria-selected="false" @click="setFilterForLatter()">Stige</button>
        </li>

        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-expanded="false" :class="[nestBoxFilter.hasZoneValue ? 'border border-success' : '']">Zone {{ nestBoxFilter.filterZone }}</a>
            <ul class="dropdown-menu" style="max-height:300px; overflow-y: auto;">
                <li><a class="dropdown-item" @click="setZoneFilter(null)">Alle</a></li>
                <li v-for="zone in state.zoneList">
                    <a class="dropdown-item" @click="setZoneFilter(zone.zoneId)">{{ zone.zoneId }}</a>
                </li>
            </ul>
        </li>
    </ul>
</template>

<script setup>
import api from '@/api';
import { onMounted, reactive } from 'vue';
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
    zoneList: []
});

onMounted(() => {
    getZoneList();
});

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
    button {
        width: 150px;
    }
</style>