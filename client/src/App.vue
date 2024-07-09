<template>
  <div id="app">
    <nav>
      <router-link to="/admin-dashboard" class="nav-link"
        >Admin Dashboard</router-link
      >
      <router-link to="/my-bookings" class="nav-link">My Bookings</router-link>
      <router-link to="/tattoo-artist/1" class="nav-link"
        >Tattoo Artist</router-link
      >
      <router-link to="/fake-route" class="nav-link">Fake Route</router-link>
    </nav>
    <HelloWorld></HelloWorld>
    <RouterView />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0px;
}

nav {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  background-color: #35495e;
  padding: 10px 0;
}

.nav-link {
  margin: 0 15px;
  color: #42b983;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fff;
}
</style>
