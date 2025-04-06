import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserSettingsStore = defineStore('usersettings', () => {
  const darkMode = ref(false)
  function setDarkMode(value) {
    darkMode.value = value;
  }

  return { darkMode, setDarkMode }
},
{
    persist: true,
})
