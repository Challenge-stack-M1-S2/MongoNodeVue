<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Mes Réservations</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="reservation in reservations"
          :key="reservation._id"
          class="border p-4 rounded-md bg-white shadow-md"
        >
          <h2 class="text-xl font-semibold text-black mb-2"></h2>
          <p class="text-black mb-2" v-if="reservation.status == 'reserved'">
            Réservé
          </p>
          <p class="text-black mb-2" v-else>Terminé</p>
          <p class="text-black" v-if="reservation.session_id">
            <strong>Début:</strong>
            {{ formatDateTime(reservation.session_id.start_datetime) }}
          </p>
          <p class="text-black" v-if="reservation.session_id">
            <strong>Fin:</strong>
            {{ formatDateTime(reservation.session_id.end_datetime) }}
          </p>
          <p
            class="text-black"
            v-if="reservation.session_id && reservation.session_id.location"
          >
            <strong>Location:</strong>
            {{ reservation.session_id.location.formattedAddress }}
          </p>
          <p class="text-black" v-else>
            <strong>Location:</strong> Information de localisation manquante
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SideMenu from "@/components/SideMenu.vue";

export default {
  name: "MyReservations",
  components: {
    SideMenu,
  },
  data() {
    return {
      reservations: [],
    };
  },
  async mounted() {
    await this.fetchReservations();
  },
  methods: {
    async fetchReservations() {
      try {
        const token = localStorage.getItem("userToken");
        const response = await axios.get(
          "http://localhost:8081/api/myAppointments",
          {
            headers: {
              "x-access-token": token,
            },
          }
        );

        this.reservations = response.data.data;
        console.log(this.reservations);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        // Handle error
      }
    },
    formatDateTime(datetime) {
      if (!datetime) return "";
      const date = new Date(datetime);
      return date.toLocaleDateString() + " à " + date.toLocaleTimeString();
    },
  },
};
</script>

<style scoped>
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
