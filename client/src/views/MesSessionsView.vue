<template>
  <div class="flex justify-start">
    <SideMenu class="w-1/4 h-full" />
    <div class="p-4">
      <h1 class="text-2xl text-black font-bold mb-4">Mes Sessions</h1>

      <!-- Bouton Ajouter Session -->
      <!-- <button @click="openModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded">
        Ajouter une session
      </button> -->

      <!-- Modal pour ajouter une session -->
      <Modal :isOpen="isModalOpen" @close="closeModal" @submit="addSession"></Modal>

      <!-- Liste des Sessions -->
      <ul>
        <li v-for="session in sessions" :key="session._id" class="mb-4 p-4 border rounded flex justify-between">
          <!-- Div pour les détails et les boutons -->
          <div class="w-2/3 pl-4 flex flex-col justify-between">
            <div>
              <h2 class="text-lg font-semibold">{{ session.tattoo_id.description }}</h2>
              <p class="text-gray-700">{{ session.location.formattedAddress }}</p>
              <div class="mt-2">
                <p class="text-sm text-gray-500">Début: {{ formatDate(session.start_datetime) }}</p>
                <p class="text-sm text-gray-500">Fin: {{ formatDate(session.end_datetime) }}</p>
                <p :class="session.status === 'available' ? 'text-green-500' : 'text-red-500'">
                  {{ session.status === 'available' ? 'Libre' : 'Réservé' }}
                </p>
              </div>
            </div>
            
            <!-- Boutons de gestion -->
            <div class="mt-4 flex">
              <button @click="editSession(session._id)" class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 mr-2 rounded">
                Modifier
              </button>
              <button @click="deleteSession(session._id)" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Supprimer
              </button>
            </div>
          </div>
          <!-- Div pour l'image -->
          <div class="w-1/6 flex items-center justify-end">
            <img :src="session.tattoo_id.image_url" alt="Tattoo Image" class="h-full object-cover rounded">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Modal from '../components/NewSessionPop.vue';
import SideMenu from '@/components/SideMenu.vue';

const token = localStorage.getItem('userToken');

const sessions = ref([]);
const isModalOpen = ref(false);

// const openModal = () => {
//   isModalOpen.value = true;
// };

const closeModal = () => {
  isModalOpen.value = false;
};

const addSession = async (sessionData) => {
  try {
    const response = await axios.post('http://localhost:8081/api/sessions', sessionData, {
      headers: {
        'x-access-token': token
      }
    });
    console.log(response);
    // Après l'ajout, recharger la liste des sessions
    await fetchSessions();
  } catch (error) {
    console.error('Error adding session:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Fonction pour récupérer les sessions depuis l'API
const fetchSessions = async () => {
  try {
    const response = await axios.get('http://localhost:8081/api/mySessions', {
      headers: {
        'x-access-token': token
      }
    });
    sessions.value = response.data.data;
  } catch (error) {
    console.error('Error fetching sessions:', error);
  }
};

// Fonction pour supprimer une session
const deleteSession = async (sessionId) => {
  try {
    await axios.delete(`http://localhost:8081/api/sessions/${sessionId}`, {
      headers: {
        'x-access-token': token
      }
    });
    // Après la suppression, recharger la liste des sessions
    await fetchSessions();
  } catch (error) {
    console.error('Error deleting session:', error);
  }
};

// Fonction pour modifier une session
const editSession = async (sessionId, sessionData) => {
  try {
    await axios.put(`http://localhost:8081/api/sessions/${sessionId}`, sessionData, {
      headers: {
        'x-access-token': token
      }
    });
    // Après la modification, recharger la liste des sessions
    await fetchSessions();
  } catch (error) {
    console.error('Error editing session:', error);
  }
};

onMounted(fetchSessions);
</script>

<style scoped>
/* Ajoutez vos styles spécifiques pour cette vue ici */
</style>
