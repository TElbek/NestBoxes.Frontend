import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticateStore = defineStore('authenticate', () => {

    const isLoggedIn = ref(false);
    
    function setIsLoggedIn() {
        isLoggedIn.value = true;
    }

    return { isLoggedIn, setIsLoggedIn };
});