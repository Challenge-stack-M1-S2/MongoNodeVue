<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Liste des Tatouages</h1>
      <!-- Bouton Ajouter Session -->
      <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
        Ajouter un tatouage
      </button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="tattoo in tattoos"
          :key="tattoo._id"
          class="border p-4 rounded-md bg-white shadow-md"
        >
          <router-link :to="{ name: 'TattooDetailsPage', params: { id: tattoo._id.toString() }}">
            <img :src="tattoo.image_url" :alt="tattoo.description" class="mx-auto w-48 h-48 object-cover mb-2"/>
          </router-link>
          <p class="text-black"><strong>Description:</strong> {{ tattoo.description }}</p>
          <p class="text-black"><strong>Artist:</strong> {{ tattoo.artist_id.username }}</p>
          <p class="text-black"><strong>Style:</strong> {{ tattoo.style_id.style_name }}</p>
          <p class="text-black"><strong>Price:</strong> {{ tattoo.price }}</p>
          <!-- Boutons de gestion -->
          <div class="mt-4 flex">
            <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Modifier
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Supprimer
            </button>
          </div>
          <div class="mt-4 flex">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
              Créer une séance
            </button>
          </div>
        </div>
      </div>
    </div>
    <SiteFooter/>
  </div>
</template>

<script>
import axios from 'axios';
import SideMenu from '@/components/SideMenu.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  components: {
    SideMenu,
    SiteFooter
  },
  data() {
    return {
      tattoos: [],
      errorMessage: '',
    }
  },
  async mounted() {
    await this.fetchTattoos();
  },
  methods: {
    async fetchTattoos() {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8081/api/myTattoos', {
          headers: {
            'x-access-token': token
          }
        });

        if (response.data && response.data.data && Array.isArray(response.data.data)) {
          this.tattoos = response.data.data;
        } else {
          this.errorMessage = 'Invalid response data format';
        }
      } catch (error) {
        console.error('Error fetching tattoos:', error);
        this.errorMessage = error.response ? error.response.data.message : error.message;
      }
    }
  }
}
</script>

<style scoped>
* {
  color: black;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
.error-message {
  color: red;
}
</style>