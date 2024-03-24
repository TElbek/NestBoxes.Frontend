<script setup>
import { RouterView } from 'vue-router'
import navigation from '@/components/main/navigation.vue'
</script>

<template>
  <div>
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
    width: 80%;
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
</style>