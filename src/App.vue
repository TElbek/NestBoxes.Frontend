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

a {
    text-decoration: none;
    color: var(--bs-emphasis-color);
}

.btn-outline-secondary {
  border: 1px solid var(--bs-border-color-translucent);
}

.btn-outline-secondary:hover {
  border: 1px solid var(--bs-border-color-translucent);
  background-color: inherit;
  color: inherit;
}

.dropdown-menu {
  --bs-dropdown-link-active-bg: var(--bs-white);
}

.bg-nestbox-light,
.bg-nestbox-light:focus
{
  background-color: #00000010;
}

.scroll {
    height: 81vh;
    overflow-y: auto;
    scrollbar-width: 0px;
    overflow-x: hidden;
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.1rem;
}

.form-check-label {
  font-weight: bold;
}

.repair {
    text-align: center;
    height: 27px;
    width: 20px;
    border-radius: 5px;
    display: inline-block;
    box-shadow: inset -2px -2px 3px #00000040;
    font-family: Segoe UI Symbol;
}

.small-repair {
    color: black;
    background-color: yellow;
}

.large-repair {
    color: black;
    background-color: pink;
}

.replace-repair {
    color: white;
    background-color: red;
}
</style>