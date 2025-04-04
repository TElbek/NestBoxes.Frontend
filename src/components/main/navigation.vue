<template>
  <nav class="navbar navbar-expand-lg mt-1 mb-1">
    <div class="navbar-header">
      <router-link aria-current="page" to="/" active-class="empty" class="ms-1">
        <img v-if="usersettings.darkMode" class="site-logo" src="@/assets/nestbox_dark.png" width="60">
        <img v-else class="site-logo" src="@/assets/nestbox.png" width="60">
      </router-link>
    </div>
    <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar" aria-label="Toggle navigation" v-if="authenticate.isLoggedIn">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
      <div class="offcanvas-body">
        <a class="h4 d-lg-none" href="#">Navigation</a>
        <ul class="navbar-nav justify-content-start flex-grow-1 pe-3">
          <li class="nav-item" v-for="route in visibleRoutes"
            :data-bs-dismiss="[!hasChildren(route) ? 'offcanvas' : '']" :class="[hasChildren(route) ? 'dropdown' : '']">
            <router-link class="nav-link" :to="route.path" v-if="!hasChildren(route)">{{
              route.meta.title }}</router-link>

            <template v-if="hasChildren(route)">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                {{ route.meta.title }}
              </a>
              <ul class="dropdown-menu">
                <li v-for="child in route.children" data-bs-dismiss="offcanvas">
                  <router-link class="dropdown-item" :to="child.path">{{ child.meta.title }}</router-link>
                </li>
              </ul>
            </template>
          </li>
        </ul>
        <div class="form-check form-switch mt-2 d-none">
          <input class="form-check-input" type="checkbox" role="switch" id="switchDarkMode" v-model="darkMode">
          <label class="form-check-label" for="switchDarkMode">Mørkt tema</label>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthenticateStore } from '@/stores/authenticate.js';
import { useUserSettingsStore } from '@/stores/usersettings.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const authenticate = useAuthenticateStore();
const usersettings = useUserSettingsStore();

const visibleRoutes = computed(() => {
  return router.options.routes.filter((route) =>
    (route.meta.showInNavBar == true || hasChildren(route)) &&
    (route.meta.requiresAuth && authenticate.isLoggedIn || !route.meta.requiresAuth))
});

const darkMode = computed({
  get() {
    return usersettings.darkMode;
  },
  set(val) {
    usersettings.setDarkMode(val)
  }
})

function hasChildren(route) {
  return route.children != undefined && route.children.length > 0;
}
</script>

<style scoped>
a {
  text-decoration: none;
}

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

.router-link-active {
  font-weight: 700;
}

.offcanvas {
  --bs-offcanvas-width: 300px;
}

@media only screen and (max-width: 992px) {
  .dropdown-menu {
    --bs-dropdown-padding-y: 0px;
    --bs-dropdown-border-width: 0px
  }
}
</style>