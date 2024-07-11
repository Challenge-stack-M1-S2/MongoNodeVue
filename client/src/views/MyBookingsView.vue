<template>
    <div class="w-3/4 p-4 overflow-y-auto">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Mes Réservations</h1>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="(reservation, index) in reservations"
          :key="index"
          class="border p-4 rounded-md bg-white shadow-md"
        >
          <h2 class="text-xl font-semibold text-black mb-2">{{ reservation.title }}</h2>
          <p class="text-black mb-2">{{ reservation.description }}</p>
          <p class="text-black"><strong>Date:</strong> {{ reservation.date }}</p>
          <p class="text-black"><strong>Location:</strong> {{ reservation.location }}</p>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'MyReservations',
  data() {
    return {
      reservations: [
        {
          title: 'Reservation 1',
          description: 'Description for reservation 1',
          date: '2024-07-12',
          location: 'Location 1'
        },
        {
          title: 'Reservation 2',
          description: 'Description for reservation 2',
          date: '2024-07-13',
          location: 'Location 2'
        },
        {
          title: 'Reservation 3',
          description: 'Description for reservation 3',
          date: '2024-07-14',
          location: 'Location 3'
        },
        // Ajoutez autant de fausses réservations que nécessaire
      ]
    };
  }
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
