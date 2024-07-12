<template>
  <div
    class="sticky inset-y-0 left-0 w-64 shadow-lg z-50 p-4 w-1/6 flex flex-column justify-start"
    :style="{
      'background-image':
        'url(' + require('@/assets/sidemenu-banner2.png') + ')',
    }"
    style="height: 919px"
  >
    <nav class="w-full h-screen flex flex-col justify-center">
      <!-- Logo Section -->
      <div class="flex justify-center">
        <img :src="logo" alt="Inked Legends Logo" class="h-16" />
      </div>
      <!-- Navigation Section -->
      <ul class="flex flex-col justify-start">
        <li class="mt-4">
          <router-link
            to="/"
            class="flex items-center text-gray-700 hover:text-black"
            exact-active-class="router-link-exact-active"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3388/3388840.png"
              class="h-4 w-4 mr-2"
            />
            Accueil
          </router-link>
        </li>
        <hr class="my-4 bg-black border-0" style="height: 1px" />
        <li v-if="isAdmin" class="mb-4">
          <router-link
            to="/mes-sessions"
            class="flex items-center text-gray-700 hover:text-black"
            exact-active-class="router-link-exact-active"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/5764/5764103.png"
              class="h-4 w-4 mr-2"
            />
            Mes Séances
          </router-link>
        </li>
        <li v-if="isAdmin" class="mb-4">
          <router-link
            to="/tattoo-artist"
            class="flex items-center text-gray-700 hover:text-black"
            exact-active-class="router-link-exact-active"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4481/4481871.png"
              class="h-4 w-4 mr-2"
            />
            Mes tattoos
          </router-link>
        </li>
        <li v-if="isUserTokenPresent && !isAdmin" class="mb-4">
          <router-link
            to="/my-bookings"
            class="flex items-center text-gray-700 hover:text-black"
            exact-active-class="router-link-exact-active"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/16702/16702410.png"
              class="h-4 w-4 mr-2"
            />
            Mes réservations
          </router-link>
        </li>
        <li class="mb-4">
          <router-link
            to="/map-box"
            class="flex items-center text-gray-700 hover:text-black"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3082/3082383.png"
              class="h-4 w-4 mr-2"
            />
            Ma map
          </router-link>
        </li>
        <hr class="my-4 bg-black border-0" style="height: 1px" />
        <li v-if="!isUserTokenPresent" class="mb-4">
          <router-link
            to="/login-form"
            class="flex items-center text-gray-700 hover:text-black"
            exact-active-class="router-link-exact-active"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/12765/12765311.png"
              class="h-4 w-4 mr-2"
            />
            Connexion
          </router-link>
        </li>
        <li v-else class="mb-4">
          <a
            href="#"
            @click.prevent="logout"
            class="flex items-center text-gray-700 hover:text-black"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/3726/3726291.png"
              class="h-4 w-4 mr-2"
            />
            Se Déconnecter
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import logo from "@/assets/LogoBlack.png";

export default {
  name: "SideMenu",
  computed: {
    isUserTokenPresent() {
      return !!localStorage.getItem("userToken");
    },
    isAdmin() {
      return localStorage.getItem("admin") === "true";
    },
  },
  data() {
    return {
      logo: logo, // Utilisation de l'importation du logo
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("admin");
      window.location.reload(); // Force page reload
    },
  },
};
</script>

<style scoped>
nav .router-link-exact-active {
  background-color: #f0f0f0;
}
</style>
