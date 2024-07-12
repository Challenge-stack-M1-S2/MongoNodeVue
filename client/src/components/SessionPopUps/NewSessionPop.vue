<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
    <div class="bg-white p-6 rounded-lg shadow-lg z-50 w-1/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Ajouter une session</h2>
        <button @click="close" class="text-gray-600 hover:text-gray-800">&times;</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="tattoo_id" class="block text-gray-700">Tattoo</label>
          <select v-model="tattoo_id" id="tattoo_id" class="w-full p-2 border rounded">
            <option v-for="tattoo in tattoos" :key="tattoo._id" :value="tattoo._id">
              {{ tattoo.style_id.style_name }}
            </option>
          </select>
        </div>
        <div class="mb-4">
          <label for="address" class="block text-gray-700">Adresse</label>
          <input v-model="address" type="text" id="address" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="start_datetime" class="block text-gray-700">Date de début</label>
          <input v-model="startDatetime" type="datetime-local" id="start_datetime" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="end_datetime" class="block text-gray-700">Date de fin</label>
          <input v-model="endDatetime" type="datetime-local" id="end_datetime" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="status" class="block text-gray-700">Statut</label>
          <select v-model="status" id="status" class="w-full p-2 border rounded">
            <option value="available">Disponible</option>
            <option value="unavailable">Indisponible</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Annuler</button>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      tattoos: [],
      tattoo_id: '',
      address: '',
      longitude: '',
      latitude: '',
      startDatetime: '',
      endDatetime: '',
      status: 'available',
      errorMessage: ''
    };
  },
  methods: {
    close() {
      this.$emit('close');
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
    async submitForm() {
      const sessionData = {
        tattoo_id: this.tattoo_id,
        address: this.address,
        location: {
          type: 'Point',
          coordinates: [parseFloat(this.longitude), parseFloat(this.latitude)],
          formattedAddress: this.address
        },
        start_datetime: new Date(this.startDatetime).toISOString(),
        end_datetime: new Date(this.endDatetime).toISOString(),
        status: this.status
      };
      
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.post('http://localhost:8081/api/sessions', sessionData, {
          headers: {
            'x-access-token': token
          }
        });
        console.log(response);
        this.close();
        // Emit event to inform parent component about the update
        this.$emit('submit', sessionData);
      } catch (error) {
        console.error('Error adding session:', error);
        this.errorMessage = error.response ? error.response.data.message : error.message;
      }
    }
  },
  mounted() {
    this.fetchTattoos();
  }
};
</script>

<style scoped>
/* Styles pour le modal */
</style>
