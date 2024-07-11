<template>
  <div class="app-container">
    <SideMenu />
    <div class="content max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-4 text-white bg-black p-2 rounded">
        Détails du Tatouage
      </h1>

      <div v-if="tattooDetails" class="flex flex-col md:flex-row gap-4">
        <div class="w-full md:w-1/2 h-96 md:h-auto">
          <img
            :src="tattooDetails.image_url"
            alt="Tatouage"
            class="w-full h-full object-cover rounded-lg shadow-md"
          />
        </div>
        <div
          class="w-full md:w-1/2 bg-cover p-4 bg-black bg-opacity-50 rounded-lg"
          :style="{
            'background-image': 'url(' + require('@/assets/fond.png') + ')',
          }"
        >
          <h2 class="text-2xl font-bold mb-2 text-white">
            {{ tattooDetails.name }}
          </h2>
          <p class="text-white mb-2">
            Artiste : {{ tattooDetails.artist_id.username }}
          </p>
          <p class="text-white mb-2">
            Localisation : {{ tattooDetails.location }}
          </p>
          <p class="text-white mb-4">
            Description : {{ tattooDetails.description }}
          </p>
          <!-- Ajoutez ici d'autres détails si nécessaire -->
        </div>
      </div>

      <div v-else class="text-center mt-8">
        <p class="text-white bg-black p-2 rounded">
          Chargement des détails du tatouage...
        </p>
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
.app-container {
  display: flex;
}
.content {
  margin-left: 220px; /* Adjust this value based on the width of your side menu */
}
</style>
