<template>
    <ul class="nav nav-pills" id="myTab" role="tablist">
        <div class="btn-group d-none d-lg-block">
            <div v-for="status in state.statusses" class="btn btn-sm btn-status" @click="setActiveTab(status.tab)"
                :class="[status.tab == tabSelected.index ? 'btn-secondary' : 'btn-outline-secondary']">
                <span>{{ status.caption }} {{ countForTab(status.tab) }}</span>
            </div>
        </div>

        <div class="d-lg-none dropdown">
            <button class="btn btn-sm btn-status btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ selectedCaption }} {{ countForTab(tabSelected.index) }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="status in state.statusses" class="dropdown-item status-item-grid"
                    @click="setActiveTab(status.tab)">
                    <div>{{ status.caption }}</div>
                    <div> {{ countForTab(status.tab) }}</div>
                </li>
            </ul>
        </div>

        <div class="btn btn-sm ms-2"
            :class="[nestBoxFilter.filterForLatter ? 'btn-secondary' : 'btn-outline-secondary']"
            @click="setFilterForLatter()">
            Stige
        </div>

        <div class="dropdown ms-2">
            <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                {{ daysAheadCaption }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li v-for="days in state.daysAheadList" class="dropdown-item" @click="setDaysAhead(days)">
                    {{ days }}
                </li>
            </ul>
        </div>
    </ul>
</template>

<script setup>
import { reactive, computed } from 'vue';
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
    daysAheadList: [1, 2, 3, 5, 8, 13, 21, 34],
    statusses: [
        { caption: 'Tjekkes', tab: 0 },
        { caption: 'OK', tab: 1 },
        { caption: 'Ukendt', tab: 2 }
    ]
});

const selectedCaption = computed(() => {
    return state.statusses[tabSelected.index].caption;
});

const daysAheadCaption = computed(() => {
    return nestBoxFilter.daysAhead + ' ' + (nestBoxFilter.daysAhead > 1 ? 'Dage' : 'Dag');
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

function setDaysAhead(value) {
    nestBoxFilter.daysAhead = value;
}
</script>

<style scoped>
.status-item-grid {
    display: grid;
    grid-template-columns: 1fr auto;
}

.btn-status {
    width: 100px;
}

.btn-outline-secondary:hover {
    background-color: white;
    color: black;
}

.btn-outline-secondary {
    border-color: rgba(0,0,0,0.2);
}
</style>