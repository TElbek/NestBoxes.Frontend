import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNestboxFilterStore = defineStore('nestboxFilter', () => {

    const filterForLatter = ref(false);
    const daysAhead = ref(1);

    function toggleFilterForLatter() {
        filterForLatter.value = !filterForLatter.value;
    }

    function setDaysAhead(value) {
        daysAhead.value = value;
    }

    return { toggleFilterForLatter, filterForLatter, daysAhead, setDaysAhead};
},
{
    persist: true,
});