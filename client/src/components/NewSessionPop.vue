<!-- Modal.vue -->
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
              <option value="available">available</option>
              <option value="unavailable">unavailable</option>
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
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        address: '',
        startDatetime: '',
        endDatetime: '',
        status: 'available'
      };
    },
    methods: {
      close() {
        this.$emit('close');
      },
      submitForm() {
        this.$emit('submit', {
          address: this.address,
          start_datetime: this.startDatetime,
          end_datetime: this.endDatetime,
          status: this.status
        });
        this.close();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le modal */
  </style>
  