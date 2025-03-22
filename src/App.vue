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

function mode() {
  return import.meta.env.MODE;
}
</script>

<template>
  <div class="container-fluid">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<style>
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

.form-check-label {
  font-weight: bolder;
}

.bg-nestbox-light {
  background-color: #cfcfcf80;
}

.bg-nestbox-light:focus {
  background-color: #cfcfcf80;
}
</style>