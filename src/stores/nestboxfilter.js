import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNestboxFilterStore = defineStore('nestboxFilter', () => {

    const filterForLatter = ref(false);
    const filterZone = ref(null);
    
    function toggleFilterForLatter(value) {
        filterForLatter.value = !filterForLatter.value;
    }

    function setFilterZone(zone) {
        filterZone.value = zone;
    }

    const hasZoneValue = computed(() => filterZone.value != null)
  
    return { toggleFilterForLatter, filterForLatter, setFilterZone, filterZone, hasZoneValue };
});