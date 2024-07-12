<template>
  <div class="flex h-screen">
    <SideMenu class="w-1/4 h-full" />
    <div class="w-3/4 p-4">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Mes Réservations</h1>
      <div class="timeline">
        <div
          v-for="reservation in sortedReservations"
          :key="reservation._id"
          class="timeline-item"
          :class="{
            'timeline-item-reserved': reservation.status === 'reserved',
            'timeline-item-completed': reservation.status === 'finished',
            'timeline-item-cancelled': reservation.status === 'cancelled',
          }"
        >
          <div class="timeline-content">
            <h2
              class="text-xl font-semibold mb-2"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'completed-text': reservation.status === 'finished',
                'cancelled-text': reservation.status === 'cancelled',
              }"
            >
              {{
                reservation.status === "reserved"
                  ? "Réservé"
                  : reservation.status === "finished"
                  ? "Terminé"
                  : "Annulé"
              }}
            </h2>
            <p
              v-if="reservation.session_id"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'completed-text': reservation.status === 'finished',
                'cancelled-text': reservation.status === 'cancelled',
              }"
            >
              <strong>Début:</strong>
              {{ formatDateTime(reservation.session_id.start_datetime) }}
            </p>
            <p
              v-if="reservation.session_id"
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'completed-text': reservation.status === 'finished',
                'cancelled-text': reservation.status === 'cancelled',
              }"
            >
              <strong>Fin:</strong>
              {{ formatDateTime(reservation.session_id.end_datetime) }}
            </p>
            <p
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'completed-text': reservation.status === 'finished',
                'cancelled-text': reservation.status === 'cancelled',
              }"
              v-if="reservation.session_id && reservation.session_id.location"
            >
              <strong>Location:</strong>
              {{ reservation.session_id.location.formattedAddress }}
            </p>
            <p
              :class="{
                'reserved-text': reservation.status === 'reserved',
                'completed-text': reservation.status === 'finished',
                'cancelled-text': reservation.status === 'cancelled',
              }"
              v-else
            >
              <strong>Location:</strong> Information de localisation manquante
            </p>

            <!-- Boutons de modification et suppression -->
            <div
              v-if="reservation.status === 'reserved'"
              class="action-buttons"
            >
              <button
                @click="editReservation(reservation._id)"
                class="btn-edit"
              >
                Modifier
              </button>
              <button
                @click="deleteReservation(reservation._id)"
                class="btn-delete"
              >
                Supprimer
              </button>
            </div>
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
          <img
            v-else
            src="https://cdn-icons-png.flaticon.com/512/7817/7817018.png"
            alt="Image annulé"
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
    };
  },
  computed: {
    sortedReservations() {
      return this.reservations.slice().sort((a, b) => {
        if (a.status === "finished" && b.status !== "finished") {
          return -1;
        } else if (a.status !== "finished" && b.status === "finished") {
          return 1;
        } else if (a.status === "reserved" && b.status !== "reserved") {
          return -1;
        } else if (a.status !== "reserved" && b.status === "reserved") {
          return 1;
        } else {
          return 0;
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
      }
    },
    formatDateTime(datetime) {
      if (!datetime) return "";
      const date = new Date(datetime);
      return date.toLocaleDateString() + " à " + date.toLocaleTimeString();
    },
    async deleteReservation(id) {
      try {
        await axios
          .put(
            `http://localhost:8081/api/appointments/${id}/cancel`,
            {},
            {
              headers: {
                "x-access-token": localStorage.getItem("userToken"),
              },
            }
          )
          .then(() => {
            this.$router.push("/my-bookings");
          });
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #f44336;
}
.timeline-item:before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  width: 4px;
  height: 100%;
  background-color: #ccc;
  transform: translateX(-50%);
}
.timeline-item-reserved:before {
  background-color: grey;
}
.timeline-item-completed:before {
  background-color: green;
}
.timeline-item-cancelled:before {
  background-color: red;
}
.timeline-item:last-child {
  margin-bottom: 0;
}
.timeline-item .timeline-content {
  padding-left: 20px;
  flex: 1;
}
.timeline-image {
  max-width: 100%;
  height: 50px;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.timeline-item-reserved {
  background-color: #ffedcc;
}
.timeline-item-completed {
  background-color: #0b5ed7;
}
.timeline-item-cancelled {
  background-color: #ffcccc;
}
.reserved-text {
  color: #000;
}
.completed-text {
  color: #fff;
}
.cancelled-text {
  color: #fff;
}
.action-buttons {
  margin-top: 10px;
}
.btn-edit,
.btn-delete {
  margin-right: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-edit {
  background-color: #4caf50;
  color: white;
}
.btn-delete {
  background-color: #f44336;
  color: white;
}
</style>
