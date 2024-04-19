import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAuthenticateStore = defineStore('authenticate', () => {

    const isLoggedIn = ref(false);
    const jwtToken = ref(null);
    
    function setIsLoggedIn() {
        isLoggedIn.value = true;
    }

    function setJwtToken(token) {
        jwtToken.value = token;
    }

    return { isLoggedIn, setIsLoggedIn, jwtToken, setJwtToken };
});