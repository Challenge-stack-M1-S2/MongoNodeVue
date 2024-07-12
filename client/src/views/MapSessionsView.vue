<template>
  <div class="map-sessions-view flex">
    <SideMenu class="side-menu" />
    <div class="content w-5/6">
      <h1 class="h1 pt-4">Toutes les Séances</h1>
      <div class="search-bar">
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Rechercher une session..."
        />
        <button @click="searchSessions">Rechercher</button>
      </div>
      <MapBox :searchQuery="searchQuery" />
    </div>
  </div>
</template>

<script>
import MapBox from "../components/MapBox.vue";
import "../../node_modules/mapbox-gl/dist/mapbox-gl.css";
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {
    MapBox,
    SideMenu,
  },
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    searchSessions() {
      console.log("Rechercher:", this.searchQuery);
    },
  },
};
</script>

<style scoped>
.map-sessions-view {
  display: flex;
}

.side-menu {
  background-color: #f8f8f8;
  padding: 20px;
}

.content {
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-title {
  margin-top: 20px;
  font-size: 24px;
  font-weight: bold;
}

.search-bar {
  margin: 20px 0;
  display: flex;
}

.search-bar input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
}

.search-bar button {
  padding: 10px 15px;
  margin-left: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.search-bar button:hover {
  background-color: #0056b3;
}
</style>