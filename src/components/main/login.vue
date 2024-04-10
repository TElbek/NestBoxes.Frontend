<template>
    <div class="center-container">
        <form class="border rounded shadow-sm">
            <div class="mb-3">
                <input type="text" class="form-control" placeholder="Brugernavn" name="uname" v-model="state.username"
                    ref="username" v-focus />
            </div>
            <div class="mb-3">
                <input type="password" class="form-control" placeholder="Kodeord" name="pwd" v-model="state.password"
                    ref="pwd" />
            </div>
            <div class="btn-grid mb-3">
                <button class="btn btn-sm btn-success" :disabled="!canLogin" @click="login">Login</button>
                <button class="btn btn-sm btn-dark" @click="goBack">Fortryd</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, computed } from 'vue';

const state = reactive({
    username: '',
    password: ''
});

const canLogin = computed(() => {
    return state.username.length > 0 &&
        state.password.length > 0;
});

function login() {

}

function goBack() {
}
</script>

<style scoped>
form {
    padding: 15px;
    margin: 5px;
}

.btn-grid {
    display: grid;
    grid-template-columns: repeat(2, auto);
    gap: 20px;
}

.btn {
    width: 100%;
}

.center-container {
    width: 250px;
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