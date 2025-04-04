<script setup>
import { RouterView } from 'vue-router';
import navigation from '@/components/main/navigation.vue';
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

.form-check-label {
  font-weight: bolder;
}

a {
    text-decoration: none;
    color: var(--bs-emphasis-color);
}
</style>