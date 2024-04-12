import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNestboxFilterStore = defineStore('nestboxFilter', () => {

    const filterForLatter = ref(false);
    const filterZone = ref(null);
    const daysAhead = ref(1);

    function toggleFilterForLatter(value) {
        filterForLatter.value = !filterForLatter.value;
    }

    function setFilterZone(zone) {
        filterZone.value = zone;
    }

    function setDaysAhead(value) {
        daysAhead = value;
    }

    const hasZoneValue = computed(() => filterZone.value != null)
  
    return { toggleFilterForLatter, filterForLatter, setFilterZone, filterZone, hasZoneValue, daysAhead, setDaysAhead };
});