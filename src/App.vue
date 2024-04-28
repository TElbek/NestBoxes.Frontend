<script setup>
import { reactive } from 'vue';
import { RouterView } from 'vue-router'
import navigation from '@/components/main/navigation.vue'

const state = reactive({
    title: ''
});

function setTitle(title) {
    state.title = title;
};
</script>

<template>
  <div class="container-fluid">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  color: rgba(0,0,0, .75);
}

@media only screen and (max-width: 1600px) {
  body {
    width: 100%;
  }
}

@media only screen and (min-width: 1600px) {
  body {
    width: 90%;
    margin: auto;
  }
}

hr {
  border: none;
  height: 1px;
  background-color: #00000060;
  margin: 0rem;
}

.my-shadow {
  box-shadow: 0 0 3px #00000020;
}

.form-check-label {
  font-weight: bolder;
}
</style>