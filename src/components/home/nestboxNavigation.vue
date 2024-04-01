<template>
    <div class="mb-3 btn-group btn-group-sm" role="group">
        <button class="btn btn-sm dropdown-toggle btn-outline-secondary" data-bs-toggle="dropdown" aria-expanded="false">
            Zone
        </button>
        <ul class="dropdown-menu">
            <li><a class="dropdown-item">1</a></li>
            <li><a class="dropdown-item">2</a></li>
            <li><a class="dropdown-item">3</a></li>
        </ul>

        <button class="btn btn-sm" :class="[nestBoxFilter.filterForLatter ? 'btn-primary' : 'btn-outline-secondary']"
            @click="setFilterForLatter">Stige</button>

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
import { reactive } from 'vue';
import { useTabSelectedStore } from '@/stores/overviewtabselected.js';
import { useNestboxFilterStore } from '@/stores/nestboxfilter.js'

const tabSelected = useTabSelectedStore();
const nestBoxFilter = useNestboxFilterStore();

const props = defineProps({
    boxesForCheckingCount: 0,
    boxesCheckedCount: 0,
    boxesNotCheckedCount: 0,
    uniqueZoneList: []
});

const state = reactive({
    searchValue: ''
});

function setActiveTab(tabIndex) {
    tabSelected.set(tabIndex);
};

function setFilterForLatter() {
    nestBoxFilter.toggleFilterForLatter();
};

function setSearchValue() {
    nestBoxFilter.setFilterString(state.searchValue);
}
</script>

<style scoped>
.btn-outline-secondary:hover {
    background-color: transparent;
    color: black;
}
</style>