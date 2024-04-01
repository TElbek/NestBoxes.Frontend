<template>
    <div class="mb-3 btn-group btn-group-sm" role="group">
        <button class="btn btn-sm" :class="[nestBoxFilter.filterForLatter ? 'btn-primary' : 'btn-outline-secondary']"
            @click="setFilterForLatter">Stige</button>

        <button class="btn btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
            :class="[nestBoxFilter.filterZone != null ? 'btn-primary' : 'btn-outline-secondary']">
            Zone {{ nestBoxFilter.filterZone }}
        </button>
        <ul class="dropdown-menu" style="overflow-y: scroll; max-height: 300px;">
            <li><a class="dropdown-item" @click="setZoneFilter(null)">Alle</a></li>
            <template v-for="zone in state.zoneList">
                <li><a class="dropdown-item" @click="setZoneFilter(zone.zoneId)">{{zone.zoneId}}</a></li>                
            </template>
        </ul>

        <button class="btn btn-sm" :class="[tabSelected.index == 0 ? 'btn-secondary' : 'btn-outline-secondary']"
            @click="setActiveTab(0)">Tjekkes ({{ boxesForCheckingCount }})</button>

        <button class="btn btn-sm" :class="[tabSelected.index == 1 ? 'btn-secondary' : 'btn-outline-secondary']"
            @click="setActiveTab(1)">OK
            ({{ boxesCheckedCount }})</button>

        <button class="btn btn-sm" :class="[tabSelected.index == 2 ? 'btn-secondary' : 'btn-outline-secondary']"
            @click="setActiveTab(2)">Ukendt
            ({{ boxesNotCheckedCount }})</button>
    </div>
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
            state.zoneList = res.data.sort((a, b) => parseInt(a.zoneId.replace(/\D/g, '')) -  parseInt(b.zoneId.replace(/\D/g, '')));
        })
}
</script>

<style scoped>
.btn-outline-secondary:hover {
    background-color: transparent;
    color: black;
}

.dropdown-toggle {
    --bs-btn-border-radius: var(--bs-border-radius-sm) 0 0 var(--bs-border-radius-sm);
    border-width: var(--bs-border-width) var(--bs-border-width) var(--bs-border-width) 0;
}

.dropdown-item {
    padding: 0px var(--bs-dropdown-item-padding-x);    
}
</style>