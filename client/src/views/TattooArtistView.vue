<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="h1">Liste des Tatouages</h1>
      <!-- Bouton Ajouter Tatouage -->
      <button @click="openModal" class="button-primary mb-4">
        Ajouter un tatouage
      </button>
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="tattoo in tattoos" :key="tattoo._id" class="border p-4 rounded-md bg-white shadow-md">
          <router-link :to="{ name: 'TattooDetailsPage', params: { id: tattoo._id.toString() }}">
            <img :src="tattoo.image_url" :alt="tattoo.description" class="mx-auto w-48 h-48 object-cover mb-2"/>
          </router-link>
          <p class="text-black"><strong>Description:</strong> {{ tattoo.description }}</p>
          <p class="text-black"><strong>Artiste:</strong> {{ tattoo.artist_id.username }}</p>
          <p class="text-black"><strong>Style:</strong> {{ tattoo.style_id.style_name }}</p>
          <p class="text-black"><strong>Prix:</strong> {{ tattoo.price }}</p>
          <!-- Boutons de gestion -->
          <div class="mt-4 flex">
            <button @click="openEditModal(tattoo)" class="button-edit">
              Modifier
            </button>
            <!-- Bouton Supprimer Tatouage -->
            <button @click="deleteTattoo(tattoo._id)" class="button-delete">
              Supprimer
            </button>
          </div>
        </div>
      </div>

      <EditTattoo :isOpen="isEditModalOpen" @close="closeEditModal" @submit="handleEditSubmit" :tattoo="selectedTattoo" :styles="styles"></EditTattoo>

      <!-- Modal pour ajouter un tatouage -->
      <NewTattoo :isOpen="isModalOpen" @close="closeModal" @submit="addTattoo" :styles="styles"></NewTattoo>
    </div>
    <SiteFooter/>
  </div>
</template>

<script>
import axios from 'axios';
import SideMenu from '@/components/SideMenu.vue';
import NewTattoo from '../components/NewTattoo.vue';
import EditTattoo from '../components/EditTattoo.vue';
import SiteFooter from '@/components/SiteFooter.vue';

export default {
  components: {
    SideMenu,
    NewTattoo,
    EditTattoo,
    SiteFooter
  },
  data() {
    return {
      tattoos: [],
      errorMessage: '',
      isModalOpen: false,
      isEditModalOpen: false,
      selectedTattoo: null,
      styles: []
    }
  },
  async mounted() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.fetchTattoos();
      await this.fetchStyles();
    },
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
    },
    async fetchStyles() {
      try {
        const response = await axios.get('http://localhost:8081/api/styles');
        this.styles = response.data;
      } catch (error) {
        console.error('Error fetching styles:', error);
      }
    },
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },
    async addTattoo(tattooData) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post('http://localhost:8081/api/tattoos', tattooData, {
          headers: {
            'x-access-token': token
          }
        });
        console.log(response);
        this.closeModal();
        await this.fetchTattoos();
      } catch (error) {
        console.error('Error adding tattoo:', error);
      }
    },
    openEditModal(tattoo) {
      this.selectedTattoo = tattoo;
      this.isEditModalOpen = true;
    },
    closeEditModal() {
      this.isEditModalOpen = false;
      this.selectedTattoo = null;
    },
    async handleEditSubmit() {
      this.isEditModalOpen = false;
      await this.fetchTattoos();
    },
    async deleteTattoo(tattooId) {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.delete(`http://localhost:8081/api/tattoos/${tattooId}`, {
          headers: {
            'x-access-token': token
          }
        });
        console.log(response);
        await this.fetchTattoos();
      } catch (error) {
        console.error('Error deleting tattoo:', error);
      }
    }
  }
}
</script>

<style scoped>
/* Styles spécifiques pour les boutons */
.button-primary {
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-primary:hover {
  background-color: #333333;
}

.button-edit {
  background-color: #ffffff;
  color: #000000;
  border: 2px solid #000000;
  font-weight: bold;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
}

.button-edit:hover {
  background-color: #f0f0f0;
}

.button-delete {
  background-color: #ff0000;
  color: #ffffff;
  font-weight: bold;
  padding: 8px 12px;
  margin-left: 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button-delete:hover {
  background-color: #ff3333;
}
</style>
