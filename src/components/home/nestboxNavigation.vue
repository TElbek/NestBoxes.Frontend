<template>
    <ul class="nav nav-pills" id="myTab" role="tablist">
        <li class="nav-item px-1 d-none d-lg-block" role="presentation">
            <button class="nav-link active" id="check-tab" data-bs-toggle="tab" data-bs-target="#check" type="button"
                role="tab" aria-controls="check" aria-selected="true" @click="setActiveTab(0)">Tjekkes ({{
                    boxesForCheckingCount }})</button>
        </li>
        <li class="nav-item px-1" role="presentation">
            <button class="nav-link d-none d-lg-block" id="ok-tab" data-bs-toggle="tab" data-bs-target="#ok"
                type="button" role="tab" aria-controls="ok" aria-selected="false" @click="setActiveTab(1)">OK ({{
                    boxesCheckedCount }})</button>
        </li>
        <li class="nav-item px-1" role="presentation">
            <button class="nav-link d-none d-lg-block" id="unknown-tab" data-bs-toggle="tab" data-bs-target="#unknown"
                type="button" role="tab" aria-controls="unknown" aria-selected="false" @click="setActiveTab(2)">Ukendt
                ({{
                    boxesNotCheckedCount }})</button>
        </li>

        <li class="nav-item dropdown px-1 d-lg-none">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                {{ selectedCaption }}
            </a>
            <ul class="dropdown-menu">
                <li v-for="status in statusses" class="dropdown-item" @click="setActiveTab(status.tab)">{{
                    status.caption }} ({{ status.count }})</li>
            </ul>
        </li>

        <li class="nav-item px-1" role="presentation">
            <button class="nav-link" type="button" :class="[nestBoxFilter.filterForLatter ? 'active' : '']" role="tab"
                aria-controls="unknown" aria-selected="false" @click="setFilterForLatter()">Stige</button>
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

const statusses = [
    { caption: 'Tjekkes', tab: 0, count: props.boxesForCheckingCount },
    { caption: 'OK', tab: 1, count: props.boxesCheckedCount },
    { caption: 'Ukendt', tab: 2, count: props.boxesNotCheckedCount },
]

const state = reactive({
    zoneList: []
});

onMounted(() => {
    getZoneList();
});

const selectedCaption = computed(() => {
    return statusses[tabSelected.index].caption + ': ' + statusses[tabSelected.index].count;
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
.nav-pills .nav-link {
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