<template>
  <head>
    <link
      href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
      rel="stylesheet"
    />
  </head>
  <div id="app">
    <RouterView />
  </div>
  <div id="layout">
    <MapBox />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";


const scrolled = ref(false);

const handleScroll = () => {
  scrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<script>
  import MapBox from './components/MapBox.vue';
  import '../node_modules/mapbox-gl/dist/mapbox-gl.css';

  export default {
    components: {
      MapBox
    }
  };
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
