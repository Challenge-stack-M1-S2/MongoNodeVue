<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <div id="app">
    <nav
      :class="{ 'bg-transparent': !scrolled, 'bg-black': scrolled }"
      class="py-4 w-full flex justify-center fixed top-0 z-10 transition-all duration-300"
    >
      <router-link to="/" class="nav-link"
        >Home</router-link
      >
      <router-link to="/admin-dashboard" class="nav-link"
        >Admin Dashboard</router-link
      >
      <router-link to="/my-bookings" class="nav-link">My Bookings</router-link>
      <router-link to="/tattoo-artist/1" class="nav-link"
        >Tattoo Artist</router-link
      >
      <router-link to="/fake-route" class="nav-link">Fake Route</router-link>
    </nav>
    <RouterView />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20; // Change 20 to adjust scroll threshold
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff; /* Text color when navbar turns black */
}

.nav-link {
  margin: 0 15px;
  color: #ffffff; /* Default link color */
  text-decoration: none;
  font-weight: bold;
  font-size: 16px; /* Adjust font size as needed */
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #42b983; /* Hover color */
}

.bg-transparent {
  background-color: transparent !important;
}

.bg-black {
  background-color: #000000 !important; /* Black background color when scrolled */
}
</style>
