<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Mes Réservations</h1>
      <div class="timeline">
        <div
          v-for="reservation in sortedReservations"
          :key="reservation._id"
          class="timeline-item"
          :class="{
            'timeline-item-reserved': reservation.status === 'reserved',
            'timeline-item-completed': reservation.status === 'finished',
          }"
        >
          <div class="timeline-content">
            <h2
              class="text-xl font-semibold mb-2"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'not-reserved-text': reservation.status !== 'reserved',
              }"
            >
              {{ reservation.status === "reserved" ? "Réservé" : "Terminé" }}
            </h2>
            <p
              v-if="reservation.session_id"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'not-reserved-text': reservation.status !== 'reserved',
              }"
            >
              <strong>Début:</strong>
              {{ formatDateTime(reservation.session_id.start_datetime) }}
            </p>
            <p
              v-if="reservation.session_id"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'not-reserved-text': reservation.status !== 'reserved',
              }"
            >
              <strong>Fin:</strong>
              {{ formatDateTime(reservation.session_id.end_datetime) }}
            </p>
            <p
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'not-reserved-text': reservation.status !== 'reserved',
              }"
              v-if="reservation.session_id && reservation.session_id.location"
            >
              <strong>Location:</strong>
              {{ reservation.session_id.location.formattedAddress }}
            </p>
            <p
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'not-reserved-text': reservation.status !== 'reserved',
              }"
              v-else
            >
              <strong>Location:</strong> Information de localisation manquante
            </p>
          </div>
          <!-- Image centrée horizontalement et verticalement -->
          <img
            v-if="reservation.status === 'finished'"
            src="https://cdn-icons-png.flaticon.com/512/4303/4303945.png"
            alt="Image terminé"
            class="timeline-image"
          />
          <img
            v-else-if="reservation.status === 'reserved'"
            src="https://cdn-icons-png.flaticon.com/512/5497/5497297.png"
            alt="Image réservé"
            class="timeline-image"
          />
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
      // URLs des images pour chaque statut
      reservationFinishedImage: "chemin/vers/image_finished.jpg",
      reservationReservedImage: "chemin/vers/image_reserved.jpg",
    };
  },
  computed: {
    sortedReservations() {
      // Tri des réservations: finished d'abord, puis reserved, puis le reste
      return this.reservations.slice().sort((a, b) => {
        if (a.status === "finished" && b.status !== "finished") {
          return -1; // a avant b
        } else if (a.status !== "finished" && b.status === "finished") {
          return 1; // b avant a
        } else if (a.status === "reserved" && b.status !== "reserved") {
          return -1; // a avant b
        } else if (a.status !== "reserved" && b.status === "reserved") {
          return 1; // b avant a
        } else {
          return 0; // maintient l'ordre actuel
        }
      });
    },
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
        // Gestion de l'erreur
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
.timeline {
  position: relative;
  padding: 20px 0;
}
.timeline-item {
  position: relative;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  background-color: #0b5ed7;
  display: flex; /* Permet à l'image d'être centrée verticalement */
  align-items: center; /* Centre l'image verticalement */
  justify-content: center; /* Centre l'image horizontalement */
  position: relative; /* Assure que l'image est positionnée correctement */
}
.timeline-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background-color: #ccc;
  transform: translateX(-50%);
}
.timeline-item:last-child {
  margin-bottom: 0;
}
.timeline-item .timeline-content {
  padding-left: 20px;
  flex: 1; /* Permet à la timeline-content de prendre tout l'espace restant */
}
.timeline-image {
  max-width: 100%;
  height: 50px;
  display: block;
  position: absolute; /* Positionne l'image au centre */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Assure que l'image est au-dessus du contenu */
}
.timeline-item-reserved {
  background-color: #ffedcc; /* Light orange */
}
.timeline-item-completed {
  background-color: #0b5ed7; /* Light green */
}

.reserved-text {
  color: #000;
}

.not-reserved-text {
  color: #fff;
}
</style>
