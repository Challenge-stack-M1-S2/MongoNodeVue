<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1>Liste des Tatouages</h1>
      <ul>
        <li v-for="tattoo in tattoos" :key="tattoo._id">
          <router-link :to="{ name: 'TattooDetailsPage', params: { id: tattoo._id.toString() }}">
            <img :src="tattoo.image_url" :alt="tattoo.description" />
          </router-link>
          <p>{{ tattoo.description }}</p>
          <p>Artist: {{ tattoo.artist_id.username }}</p>
          <p>Style: {{ tattoo.style_id.style_name }}</p>
          <p>Price: {{ tattoo.price }}</p>
        </li>
      </ul>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import SideMenu from '@/components/SideMenu.vue';

export default {
  components: {
    SideMenu
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
img {
  cursor: pointer;
  width: 100px;
  height: 100px;
}
.error-message {
  color: red;
}
</style>
