<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <nav>
      <router-link to="/admin-dashboard" class="nav-link"
        >Admin dash board</router-link
      >
      <router-link to="/my-bookings" class="nav-link">My bookings</router-link>
      <router-link to="/tattoo-artist/1" class="nav-link"
        >Tattoo artist</router-link
      >
      <router-link to="/fake-route" class="nav-link">Fake route</router-link>
    </nav>
    <HelloWorld></HelloWorld>
    <RouterView />
    <!-- Ensure this is correctly placed -->
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "App",
  components: HelloWorld,
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav {
  margin-bottom: 20px;
}
.nav-link {
  margin-right: 15px;
}
</style>
