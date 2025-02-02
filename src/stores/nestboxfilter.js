import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNestboxFilterStore = defineStore('nestboxFilter', () => {

    const filterForLatter = ref(false);
    const daysAhead = ref(1);
    const searchValue = ref('');

    function toggleFilterForLatter() {
        filterForLatter.value = !filterForLatter.value;
    }

    function setDaysAhead(value) {
        daysAhead.value = value;
    }

    function setSearchValue(value) {
        searchValue.value = value;
    }

    return { toggleFilterForLatter, filterForLatter, daysAhead, setDaysAhead, searchValue, setSearchValue};
},
{
    persist: true,
});