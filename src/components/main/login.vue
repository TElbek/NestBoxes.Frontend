<template>
    <div class="center-container">
        <form @submit.prevent="login" method="post">
            <div>
                <input type="text" placeholder="brugernavn" name="uname" required v-model="state.username" ref="username" v-focus/>
                <input type="password" placeholder="kodeord" name="pwd" required v-model="state.password" ref="pwd"/>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
    username: '',
    password: ''
 });

function login() {
}
</script>

<style scoped>
    form {
        padding: 10px;
    }

    form {
        border: 1px solid #efefef;
        border-radius: 3px;
    }

    input[type="text"],
    input[type="password"] {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0px;
        display: inline-block;
        border: 1px solid #efefef;
        box-sizing: border-box;
    }

    button {
        background-color: #afafaf;
        color: black;
        padding: 14px 20px;
        max-width: 8px 0px;
        border: none;
        cursor: pointer;
        width: 100%;
        border-radius: 3px;
    }

    button:hover {
        opacity: 0.8;
        font-weight: bold;
    }

    .center-container {
        width: 270px;
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