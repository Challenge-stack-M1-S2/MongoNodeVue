<template>
  <div class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-4">Détails du Tatouage</h1>

    <div
      v-if="tattooDetails"
      class="flex flex-col md:flex-row gap-4"
      :style="{
        'background-image': 'url(' + require('@/assets/fond.png') + ')',
        objectFit: 'cover',
      }"
    >
      <div class="w-full md:w-1/2">
        <img
          :src="tattooDetails.image_url"
          alt="Tatouage"
          class="rounded-lg shadow-md"
        />
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl font-bold mb-2">{{ tattooDetails.name }}</h2>
        <p class="text-gray-700 mb-2">
          Artiste : {{ tattooDetails.artist_id.username }}
        </p>
        <p class="text-gray-700 mb-2">
          Localisation : {{ tattooDetails.location }}
        </p>
        <p class="text-gray-700 mb-4">
          Description : {{ tattooDetails.description }}
        </p>
        <!-- Ajoutez ici d'autres détails si nécessaire -->
      </div>
    </div>

    <div v-else class="text-center mt-8">
      <p class="text-gray-700">Chargement des détails du tatouage...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["id"],
  data() {
    return {
      tattooDetails: null,
    };
  },
  created() {
    this.fetchTattooDetails();
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
        })
        .catch((error) => {
          console.error("Error fetching tattoo details:", error);
        });
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques au composant */
</style>
