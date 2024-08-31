<template>
  <nav class="navbar navbar-expand-lg sticky-top mb-2 mt-1" :class="[mode == 'staging' ? 'border border-secondary rounded shadow' : '']">
    <div class="navbar-header">
      <router-link aria-current="page" to="/" active-class="empty" class="ms-1">
        <img class="site-logo" src="@/assets/nestbox.png" width="80">
      </router-link>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
      @click="toggleVisible()" v-if="authenticate.isLoggedIn">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="!state.visible ? 'collapse' : ''"
      v-if="authenticate.isLoggedIn">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/" @click="toggleVisible()">Redekasse</router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" id="export-dropdown" role="button" data-bs-toggle="dropdown"
            aria-expanded="false">
            Eksport
          </a>
          <ul class="dropdown-menu" aria-labelledby="export-dropdown">
            <li>
              <router-link class="nav-link text-nowrap" to="/export/records">Redekasse Status</router-link>
            </li>
            <li>
              <router-link class="nav-link text-nowrap" to="/export/checkme">Udestående Redekassetjek</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/logout" @click="toggleVisible()">Log Ud</router-link>
        </li>
      </ul>
      <ul class="navbar-nav ms-auto" v-if="isNotProduction">
        <div class="nav-link me-2 d-none d-md-block nestbox-tooltip" :title="`Build: ${mode.toUpperCase()} API-url: ${apiUrl.toUpperCase()}`" data-bs-toggle="tooltip" data-bs-placement="top">Info</div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, computed, reactive } from 'vue';
import { useAuthenticateStore } from '@/stores/authenticate.js';
import { Tooltip } from 'bootstrap';

const authenticate = useAuthenticateStore();

const state = reactive({
  visible: false
});

function toggleVisible() {
  state.visible = !state.visible;
}

onMounted(() => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
  })
});

const apiUrl = computed(() => import.meta.env.VITE_VUE_API_BASE_URL);
const isNotProduction = computed(() => mode.value != 'production');
const mode = computed(() => import.meta.env.MODE);
</script>

<style scoped>
.navbar {
  --bs-navbar-padding-y: 0px;
}


.navbar-toggler:focus,
.navbar-toggler:active,
.navbar-toggler-icon:focus {
  outline: none;
  box-shadow: none;
}

.site-logo {
  object-fit: cover;
}

.bg-white {
  background-color: white;
}

.empty {
  border-bottom: 0px solid rgba(0, 0, 0, 0.4);
}

.router-link-active {
  font-weight: 700;
}

.nestbox-tooltip {
  --bs-tooltip-bg: var(--bs-secondary);
}
</style>