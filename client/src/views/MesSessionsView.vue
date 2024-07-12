<template>
  <div class="flex justify-start">
    <SideMenu class="w-1/4 h-full" />
    <div class="p-4 w-3/4">
      <h1 class="h1">Mes Séances</h1>
      
      <!-- Bouton Ajouter Session -->
      <button @click="openAddSessionModal" class="button-primary mb-4">
        Ajouter une session
      </button>

      <!-- Modal pour confirmer la suppression -->
      <Modal2 :isOpen="isDeleteModalOpen" :sessionId="sessionToDelete" @close="closeDeleteModal" @delete-confirmed="handleDeleteConfirmed"></Modal2>
      
      <!-- Modal pour ajouter une session -->
      <Modal :isOpen="isAddSessionModalOpen" @close="closeAddSessionModal" @submit="addSession"></Modal>

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
              <button @click="editSession(session._id)" class="button-edit">
                Modifier
              </button>
              <button @click="openDeleteModal(session._id)" class="button-delete">
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
import Modal2 from '../components/SessionPopUps/DeleteSession.vue';
import Modal from '../components/SessionPopUps/NewSessionPop.vue';

const sessions = ref([]);
const isDeleteModalOpen = ref(false);
const sessionToDelete = ref(null);

const isAddSessionModalOpen = ref(false);

const openAddSessionModal = () => {
  isAddSessionModalOpen.value = true;
};

const closeAddSessionModal = () => {
  isAddSessionModalOpen.value = false;
};

const openDeleteModal = (sessionId) => {
  sessionToDelete.value = sessionId;
  isDeleteModalOpen.value = true;
};

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false;
  sessionToDelete.value = null;
};

const addSession = async (sessionData) => {
  try {
    closeAddSessionModal();
    await fetchSessions();
  } catch (error) {
    console.error('Error adding session:', error);
  }
};

const handleDeleteConfirmed = async () => {
  try {
    await fetchSessions();
  } catch (error) {
    console.error('Error fetching sessions:', error);
  }
};

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
};

// Fonction pour récupérer les sessions depuis l'API
const fetchSessions = async () => {
  try {
    const token = localStorage.getItem('userToken');
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

// Fonction pour modifier une session
const editSession = async (sessionId) => {
  try {
    await axios.put(`http://localhost:8081/api/sessions/${sessionId}`);
    // Après la modification, recharger la liste des sessions
    await fetchSessions();
  } catch (error) {
    console.error('Error editing session:', error);
  }
};

onMounted(fetchSessions);
</script>


<script>
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {
    SideMenu,
  }
};
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
