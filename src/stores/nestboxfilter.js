import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNestboxFilterStore = defineStore('nestboxFilter', () => {

    const filterForLatter = ref(false);
    const filterString = ref('');
    
    function toggleFilterForLatter(value) {
        filterForLatter.value = !filterForLatter.value;
    }

    function setFilterString(value) {
        filterString = value;
    }
  
    return { toggleFilterForLatter, setFilterString, filterForLatter, filterString };
});