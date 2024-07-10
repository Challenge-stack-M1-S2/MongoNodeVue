<template>
  <b-container>
    <h2 class="main-title text-center text-black">Mes Réservations</h2>
    <b-row>
      <b-col v-for="(reservation, index) in reservations" :key="index" cols="12" md="6" lg="4" class="mb-4">
        <b-card>
          <template #header>
            <h5>{{ reservation.title }}</h5>
          </template>
          <p>{{ reservation.description }}</p>
          <p><strong>Date:</strong> {{ reservation.date }}</p>
          <p><strong>Location:</strong> {{ reservation.location }}</p>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
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

<style>
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
