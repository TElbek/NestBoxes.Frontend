<template>
    <div class="center-container">
        <form class="border rounded shadow-sm" @submit.prevent="login">
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Brugernavn" name="uname" v-model="state.username"
                    ref="username" v-focus />
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="Kodeord" name="pwd" v-model="state.password"
                    ref="pwd" />
            </div>
            <div class="mb-2">
                <button type="submit" class="btn btn-sm btn-success" :disabled="!canLogin">Login</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import api from '@/api';
import { reactive, computed } from 'vue';
import { useAuthenticateStore } from '@/stores/authenticate.js';
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();
const authenticate = useAuthenticateStore();

const state = reactive({
    username: '',
    password: ''
});

const canLogin = computed(() => {
    return state.username.length > 0 && state.password.length > 0;
});

function login() {
    const auth = { username: state.username, password: state.password };
    api.post('auth/login', auth)
        .then(function (response) {
            authenticate.setJwtToken(response.data.accessToken);
        })
        .finally(() => {
            router.replace(route.query.redirect);
        });
}

function goBack() {
    router.replace("/");
}
</script>

<style scoped>
form {
    padding: 15px;
    margin: 5px;
}

.btn {
    width: 100%;
}

.center-container {
    width: 350px;
    height: 40%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
</style>