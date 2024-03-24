<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-white">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            @click="toggleVisible()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="!state.visible ? 'collapse' : ''">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="item in state.navigationData">
            <router-link class="nav-link" aria-current="page" :to="routeName(item.attributes.name)" @click="toggleVisible()">{{
              item.attributes.caption }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">            
          </li>
        </ul>
      </div>
    </nav>
</template>

<script setup>
import { reactive } from 'vue';

const state = reactive({
    navigationData: [{id:1, attributes: {name:'', caption: 'Hjem'}}],
    visible: false
});

function toggleVisible() {
    state.visible = !state.visible;
}

function routeName(name) {
  return "/" + (name != undefined ? name : "");
};
</script>

<style scoped>
.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  outline: none;
  box-shadow: none;
}

.site-logo {
  height: 80%;
  width: 80%;
  object-fit: cover;
}

.bg-white {
  background-color: white;
}

.empty {
  border-bottom: 0px solid rgba(0, 0, 0, 0.4);
}

.router-link-active
{
  font-weight: 700;
}
</style>