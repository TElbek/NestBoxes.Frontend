import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import piniaPluginPersistedState from "pinia-plugin-persistedstate"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { useUserSettingsStore } from '@/stores/usersettings.js';
import { storeToRefs } from 'pinia'
import { watch } from 'vue';

const app = createApp(App)

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)

app.use(router)
app.use(pinia)

app.directive('focus', {
    mounted(el) {
      el.focus()
    }
});

app.mount('#app')

const usersettings = useUserSettingsStore();
const {darkMode} = storeToRefs(usersettings);

function setDarkMode(value) {
  document.documentElement.setAttribute("data-bs-theme", value ? 'dark' : 'light')
}

watch(darkMode, async (newdarkMode, olddarkMode) => {
  setDarkMode(newdarkMode);
}); 

setDarkMode(usersettings.darkMode);