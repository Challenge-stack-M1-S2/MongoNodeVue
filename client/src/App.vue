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

<style scoped>
#app {
  font-family: Neue Plak, -apple-system, blinkmacsystemfont, roboto,
    Helvetica Neue, helvetica, tahoma, arial, sans-serif;
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
