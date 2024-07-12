<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div class="bg-white p-6 rounded-lg shadow-lg z-50 w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Confirmer la suppression</h2>
          <button @click="close" class="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <p class="mb-4">Êtes-vous sûr de vouloir supprimer cette session ?</p>
        <div class="flex justify-end">
          <button @click="close" class="mr-2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Non, annuler</button>
          <button @click="confirmDelete" class="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded">Oui, supprimer</button>
        </div>
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
      },
      sessionId: {
        type: String,
        required: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async confirmDelete() {
        try {
            const token = localStorage.getItem('userToken');
          await axios.delete(`http://localhost:8081/api/sessions/${this.sessionId}`,{
          headers: {
            'x-access-token': token
          }
        });
          this.$emit('delete-confirmed');
          this.close();
        } catch (error) {
          console.error('Error deleting session:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Styles pour le modal */
  </style>
  