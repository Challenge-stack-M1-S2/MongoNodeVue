<template>
    <div class="map-sessions-view flex">
      <SideMenu class="side-menu" />
      <div class="content w-5/6 p-4">
        <img
          class="rounded-3xl"
          :src="test"
          alt=""
          style="box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.6)"
        />
        
        <h1 class="text-6xl font-bold text-gray-800 my-4">Tous les Tattoos</h1>
        <div class="block mb-4">
          <div class="flex mb-4">
            <input
              type="text"
              v-model="artistQuery"
              placeholder="Rechercher par artiste"
              class="border p-2 rounded-l-md w-full text-black"
            />
          </div>
          <div class="flex mb-4">
            <input
              type="text"
              v-model="styleQuery"
              placeholder="Rechercher par style"
              class="border p-2 rounded-l-md w-full text-black"
            />
          </div>
          <div class="flex mb-4">
            <input
              type="text"
              v-model="locationQuery"
              placeholder="Rechercher par localisation"
              class="border p-2 rounded-l-md w-full text-black"
            />
          </div>
          <div class="flex">
            <button @click="searchTattoos" class="border p-2 rounded-r-md bg-gray-200">🔍 Rechercher</button>
          </div>
        </div>
        <div class="cards-container">
          <div v-if="cards.length === 0" class="no-results">No results found</div>
          <div v-for="tattoo in cards" :key="tattoo._id" class="card">
            <img :src="tattoo.image_url" alt="Tattoo image" class="card-image" />
            <div class="card-content">
              <h2 class="card-title">{{ tattoo.description }}</h2>
              <p class="card-location">Location: {{ tattoo.artist_id.base_location || 'Unknown' }}</p>
              <p class="card-artist">Artist: {{ tattoo.artist_id.username || 'Unknown' }}</p>
              <p class="card-artist">Style: {{ tattoo.style_id.style_name || 'Unknown' }}</p>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SideMenu from "@/components/SideMenu.vue";
  import axios from 'axios';
  
  export default {
    components: {
      SideMenu,
    },
    data() {
      return {
        artistQuery: '',
        styleQuery: '',
        locationQuery: '',
        test: '', // Define 'test' or remove its usage if not needed
        cards: [], // To store the fetched card data
      };
    },
    async mounted() {
      await this.searchTattoos(); // Fetch initial data on page load
    },
    methods: {
      async searchTattoos() {
        try {
          const params = {};
          if (this.artistQuery) params.artist = this.artistQuery;
          if (this.styleQuery) params.style = this.styleQuery;
          if (this.locationQuery) params.location = this.locationQuery;
  
          const response = await axios.get('http://localhost:8081/api/tattoos/filter', {
            params
          });
          this.cards = response.data.data;
        } catch (error) {
          console.error('Error fetching tattoos:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Adjust card width as needed */
    gap: 16px;
  }
  
  .card {
    border: 1px solid #ccc;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 16px;
  }
  
  .card-image {
    width: 100%;
    height: auto;
  }
  
  .card-content {
    padding: 16px;
  }
  
  .card-title {
    font-size: 1.2em; /* Adjust card title font size */
    margin-bottom: 8px;
  }
  
  .card-location,
  .card-artist {
    margin-bottom: 8px;
    font-size: 0.9em; /* Adjust location and artist font size */
  }
  
  .card-tags {
    display: flex;
    flex-wrap: wrap;
  }
  
  .card-tag {
    background-color: #f0f0f0;
    border-radius: 4px;
    padding: 4px 8px;
    margin: 2px;
    font-size: 0.8em; /* Adjust tag font size */
  }
  </style>
  