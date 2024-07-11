<template>
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Mes Réservations</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(reservation) in reservations"
          :key="reservation._id"
          class="border p-4 rounded-md bg-white shadow-md"
        >
          <h2 class="text-xl font-semibold text-black mb-2">{{ reservation.session_id }}</h2>
          <p class="text-black mb-2">{{ reservation.status }}</p>
          <p class="text-black"><strong>Début:</strong> {{ reservation.start_datetime }}</p>
          <p class="text-black"><strong>Fin:</strong> {{ reservation.end_datetime }}</p>
          <p class="text-black"><strong>Location:</strong> {{ reservation.location }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MyReservations',
  data() {
    return {
      reservations: []
    };
  },
  async mounted() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8081/api/myAppointments', {
          headers: {
            'x-access-token': token
          }
        });
        console.log(response);
        console.log(response.data); // Vérifiez la structure des données reçues
        
        this.reservations = response.data.data; // Assurez-vous que votre API retourne les données correctement
      } catch (error) {
        console.error('Error fetching reservations:', error);
        // Gestion de l'erreur
      }
    }
  }
};
</script>

`<style scoped>
.main-title {
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.text-center {
  text-align: center;
}
.text-black {
  color: black;
}
</style>