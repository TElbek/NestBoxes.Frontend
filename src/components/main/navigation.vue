<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-white mb-2">
        <div class="navbar-header">
          <router-link aria-current="page" to="/" active-class="empty">
            <img class="site-logo" src="@/assets/nestbox.png" width="80">
          </router-link>
        </div>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
            @click="toggleVisible()">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" :class="!state.visible ? 'collapse' : ''">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-for="route in navBarRoutes">
            <router-link class="nav-link" aria-current="page" :to="routeName(route.name)" @click="toggleVisible()">{{
              route.meta.short }}</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">          
          <li class="nav-item">
            <a href="#" class="nav-link">Login</a>
          </li>
        </ul>
      </div>
    </nav>
</template>

<script setup>
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter();

const state = reactive({
    visible: false
});

function toggleVisible() {
    state.visible = !state.visible;
}

function routeName(name) {
  return "/" + (name != 'home' ? name : "");
};

const navBarRoutes = computed(() => {
    return router.options.routes.filter((item) => item.meta.showInNavBar == true);
});

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

.router-link-active
{
  font-weight: 700;
}
</style>