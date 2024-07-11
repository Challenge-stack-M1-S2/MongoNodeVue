<template>
  <div class="app-container">
    <SideMenu />
    <div
      class="content max-w-4xl mx-auto px-4 py-8 flex flex-col justify-center items-center min-h-screen"
    >
      <h1
        class="w-full text-4xl font-extrabold mb-4 text-white bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded shadow-2xl"
      >
        Détails du Tatouage
      </h1>

      <div
        v-if="tattooDetails"
        class="flex flex-col md:flex-row gap-4 w-full max-w-4xl"
      >
        <div class="w-full md:w-1/2 h-96 md:h-auto">
          <img
            :src="tattooDetails.image_url"
            alt="Tatouage"
            class="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div
          class="w-full md:w-1/2 bg-cover p-6 bg-gray-900 bg-opacity-75 rounded-lg shadow-2xl flex flex-col justify-center"
          :style="{
            'background-image': 'url(' + require('@/assets/fond.png') + ')',
          }"
        >
          <h2 class="text-3xl font-bold mb-3 text-white">
            {{ tattooDetails.name }}
          </h2>
          <div class="flex items-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4268/4268181.png"
              alt="Artiste"
              class="h-4 icon"
            />
            <p
              class="text-lg px-2 bg-white font-semibold rounded-md ml-2"
              style="color: #1e2735"
            >
              {{ tattooDetails.artist_id.username }}
            </p>
          </div>

          <div class="flex items-center mb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4032/4032810.png"
              alt="Location"
              class="h-4 icon"
            />
            <p class="text-lg text-white pl-2">
              {{ tattooDetails.artist_id.base_location }}
            </p>
          </div>
          <p class="text-lg text-white my-4">
            {{ tattooDetails.description }}
          </p>

          <!-- Ajoutez ici d'autres détails si nécessaire -->
          <div class="flex justify-center">
            <button
              class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              @click="openModal"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center mt-8">
        <p
          class="text-lg text-white bg-gradient-to-r from-gray-800 to-gray-900 p-3 rounded shadow-2xl"
        >
          Chargement des détails du tatouage...
        </p>
      </div>
    </div>

    <!-- Modal for booking -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          Réserver une session
        </h3>
        <label for="session" class="block mb-2 font-semibold text-gray-800"
          >Sélectionner une date :</label
        >
        <select
          id="session"
          v-model="selectedSession"
          class="w-full p-2 border rounded mb-4 text-black"
        >
          <option
            v-for="session in availableSessions"
            :key="session._id"
            :value="session"
            class="text-black"
          >
            {{ formatSession(session) }}
          </option>
        </select>
        <div class="flex justify-end">
          <button
            @click="closeModal"
            class="bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2 hover:bg-gray-700"
          >
            Annuler
          </button>
          <button
            @click="bookSession"
            class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideMenu from "@/components/SideMenu.vue";

export default {
  components: {
    SideMenu,
  },
  props: ["id"],
  data() {
    return {
      tattooDetails: null,
      sessions: null,
      showModal: false,
      selectedSession: null,
    };
  },
  created() {
    this.fetchTattooDetails();
  },
  computed: {
    availableSessions() {
      return this.sessions
        ? this.sessions.filter((session) => session.status === "available")
        : [];
    },
  },
  methods: {
    fetchTattooDetails() {
      axios
        .get(`http://localhost:8081/api/tattoos/${this.id}`, {
          headers: {
            "x-access-token": localStorage.getItem("userToken"),
          },
        })
        .then((response) => {
          this.tattooDetails = response.data.tattoo;
          this.sessions = response.data.sessions;
        })
        .catch((error) => {
          console.error("Error fetching tattoo details:", error);
        });
    },
    openModal() {
      if (localStorage.getItem("userToken")) {
        this.showModal = true;
      } else {
        this.$router.push("/login-form");
      }
    },
    closeModal() {
      this.showModal = false;
      this.selectedSession = null;
    },
    bookSession() {
      if (this.selectedSession) {
        axios
          .post(
            `http://localhost:8081/api/appointments`,
            {
              session_id: this.selectedSession._id,
            },
            {
              headers: {
                "x-access-token": localStorage.getItem("userToken"),
              },
            }
          )
          .then(() => {
            alert("Réservation confirmée!");
            this.closeModal();
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error booking session:", error);
            alert("Erreur lors de la réservation, veuillez réessayer.");
          });
      }
    },
    formatSession(session) {
      const start = new Date(session.start_datetime);
      return `${start.toLocaleDateString()} à ${start.toLocaleTimeString()} - ${
        session.location.formattedAddress
      }`;
    },
  },
};
</script>

<style scoped>
.app-container {
  display: flex;
}
.content {
  margin-left: 220px; /* Adjust this value based on the width of your side menu */
  min-height: calc(
    100vh - 64px
  ); /* Adjust 64px based on your header/footer height if any */
}
.icon {
  height: 35px;
}
</style>
