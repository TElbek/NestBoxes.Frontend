<script setup>
import { RouterView } from 'vue-router'
import navigation from '@/components/main/navigation.vue'
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

.bg-nestbox-light {
  background-color: #cfcfcf80;
}

.bg-nestbox-light:focus {
  background-color: #cfcfcf80;
}

.card {
  --bs-card-border-color: rgba(0,0,0,0.12);
  --bs-card-border-radius: 5px 0px;
}
</style>