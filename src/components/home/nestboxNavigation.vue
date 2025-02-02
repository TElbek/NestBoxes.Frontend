<template>
    <ul class="nav nav-pills" id="myTab" role="tablist">
        <li class="nav-item px-1 d-none d-md-block" role="presentation" v-for="status in state.statusses">
            <button class="nav-link status-item-grid" id="check-tab" data-bs-toggle="tab" data-bs-target="#check"
                type="button" role="tab" aria-controls="check" aria-selected="true" @click="setActiveTab(status.tab)"
                :class="[status.tab == tabSelected.index ? 'active' : '']">
                <div>{{ status.caption }}</div>
                <div>{{ countForTab(status.tab) }}</div>
            </button>
        </li>

        <li class="nav-item dropdown px-0 d-md-none">
            <a class="nav-link active dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-expanded="false">
                <span class="me-3">{{ selectedCaption }}</span>
                <span> {{ countForTab(tabSelected.index) }}</span>
            </a>
            <ul class="dropdown-menu">
                <li v-for="status in state.statusses" class="dropdown-item status-item-grid"
                    @click="setActiveTab(status.tab)">
                    <div>{{ status.caption }}</div>
                    <div> {{ countForTab(status.tab) }}</div>
                </li>
            </ul>
        </li>

        <li class="nav-item px-1" role="presentation">
            <button class="nav-link" type="button" :class="[nestBoxFilter.filterForLatter ? 'active' : '']" role="tab"
                aria-controls="unknown" aria-selected="false" @click="setFilterForLatter()"
                style="width:60px">Stige</button>
        </li>

        <div class="dropdown dropdown-days-ahead">
            <a class="btn dropdown-toggle" href="#" role="button" id="daysAheadMenuLink" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ daysAheadCaption }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="daysAheadMenuLink">
                <li><a class="dropdown-item" v-for="days in state.daysAheadList" @click="setDaysAhead(days)">{{ days
                        }}</a></li>
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
    ],
    sortModes: [
        { caption: 'Boks', value: 0 },
        { caption: 'Zone', value: 1 }
    ],
});

const selectedCaption = computed(() => {
    return state.statusses[tabSelected.index].caption;
});

const daysAheadCaption = computed(() => {
    return nestBoxFilter.daysAhead + ' ' + (nestBoxFilter.daysAhead > 1 ? 'Dage' : 'Dag');
});

const sortModeCaption = computed(() => {
    return state.sortModes.filter((item) => item.value == nestBoxFilter.sortMode)[0].caption;
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

function setSortMode(sortMode) {
    nestBoxFilter.setSortMode(sortMode.value);
}
</script>

<style scoped>
.dropdown-item {
    cursor: pointer;
}

.nav-pills .nav-link {
    width: 110px;
    color: #000000;
}

.nav-pills .nav-link {
    border: 1px solid #cfcfcf80;
}

.nav-pills .nav-link.active,
.nav-pills .show>.nav-link {
    color: #000000;
    background-color: #cfcfcf80;
}

.btn {
    --bs-btn-padding-y: 0.33rem
}

.status-item-grid {
    display: grid;
    grid-template-columns: 1fr auto;
}

.dropdown-days-ahead {
    position: relative;
    top:2px;
}
</style>