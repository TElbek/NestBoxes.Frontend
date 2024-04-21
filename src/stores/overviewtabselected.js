import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTabSelectedStore = defineStore('tabIndex', () => {
  const index = ref(0)
  function set(value) {
    index.value = value;
  }

  return { index, set }
},
{
    persist: true,
})
