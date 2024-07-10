<template>
  <div class="flex">
    <SideMenu class="w-1/4" />
    <div class="w-3/4 p-4">
      <h1 class="text-2xl mb-4">Réserver un flash</h1>
      <div class="flex mb-4">
        <input
          type="text"
          placeholder="Rechercher un tatouage"
          class="border p-2 rounded-l-md w-full"
        />
        <button class="border p-2 rounded-r-md bg-gray-200">🔍</button>
        <button class="ml-2 border p-2 rounded-md bg-gray-200">LIEU</button>
        <button class="ml-2 border p-2 rounded-md bg-gray-200">TATOUEUR</button>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="(card, index) in cards"
          :key="index"
          :titre="card.titre"
          :image-src="card.imageSrc"
          :localisation="card.localisation"
          :nom-artiste="card.nomArtiste"
          :tags="card.tags"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Card from "@/components/CardComponent.vue";
import SideMenu from "@/components/SideMenu.vue";
// import banner from "@/assets/banner2.png";

const cards = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/tattoos");
    cards.value = response.data.map((tattoo) => ({
      titre: tattoo.description,
      imageSrc: tattoo.image_url,
      localisation: "Unknown",
      nomArtiste: tattoo.artist_id.username,
      tags: [tattoo.style_id.style_name],
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
