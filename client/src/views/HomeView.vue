<template>
  <div class="flex">
    <SideMenu class="w-1/4" />
    <div class="w-3/4 p-4">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">Réserver un flash</h1>
      <div class="block mb-4">
        <div class="flex">
          <input
            type="text"
            placeholder="Rechercher un tatouage"
            class="border p-2 rounded-l-md w-full"
          />
          <button class="border p-2 rounded-r-md bg-gray-200">🔍</button>
        </div>
        <div class="flex mt-4">
          <div class="relative w-full">
            <input
              type="text"
              v-model="filters.location"
              @focus="showLocationSuggestions = true"
              @input="updateLocationSuggestions"
              placeholder="LIEU"
              class="ml-2 text-gray-800 border p-2 rounded-md bg-gray-200 w-full"
            />
            <ul
              v-if="showLocationSuggestions && filters.location"
              class="absolute w-full bg-white border mt-1 z-10"
            >
              <li
                v-for="(location, index) in filteredLocations"
                :key="index"
                @mousedown.prevent="handleLocationClick(location)"
                class="cursor-pointer p-2 hover:bg-gray-200"
              >
                {{ location }}
              </li>
            </ul>
            <div class="flex flex-wrap mt-2">
              <span
                v-for="(location, index) in filters.locations"
                :key="index"
                class="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 flex items-center"
              >
                {{ location }}
                <button
                  @click="handleLocationRemove(location)"
                  class="ml-1 text-red-500"
                  style="
                    width: 20px;
                    border-radius: 100%;
                    background-color: #fff;
                    color: black;
                  "
                >
                  ×
                </button>
              </span>
            </div>
          </div>
          <div class="relative w-full">
            <input
              type="text"
              v-model="filters.artist"
              @focus="showArtistSuggestions = true"
              @input="updateArtistSuggestions"
              placeholder="TATOUEUR"
              class="ml-2 text-gray-800 border p-2 rounded-md bg-gray-200 w-full"
            />
            <ul
              v-if="showArtistSuggestions && filters.artist"
              class="absolute w-full bg-white border mt-1 z-10"
            >
              <li
                v-for="(artist, index) in filteredArtists"
                :key="index"
                @mousedown.prevent="handleArtistClick(artist)"
                class="cursor-pointer p-2 hover:bg-gray-200"
              >
                {{ artist }}
              </li>
            </ul>
            <div class="flex flex-wrap mt-2">
              <span
                v-for="(artist, index) in filters.artists"
                :key="index"
                class="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2 flex items-center"
              >
                {{ artist }}
                <button
                  @click="handleArtistRemove(artist)"
                  class="ml-1 text-red-500"
                  style="
                    width: 20px;
                    border-radius: 100%;
                    background-color: #fff;
                    color: black;
                  "
                >
                  ×
                </button>
              </span>
            </div>
          </div>
        </div>
        <div class="flex mt-4">
          <select
            v-model="selectedTag"
            @change="addTag"
            class="border p-2 rounded-l-md w-full"
          >
            <option
              v-for="tag in availableTags"
              :key="tag"
              :value="tag"
              class="text-black"
            >
              {{ tag }}
            </option>
          </select>
        </div>
        <div class="mt-2 flex flex-wrap">
          <span
            v-for="(tag, index) in selectedTags"
            :key="index"
            class="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {{ tag }}
            <button
              @click="removeTag(index)"
              class="ml-1 text-red-500"
              style="
                width: 20px;
                border-radius: 100%;
                background-color: #fff;
                color: black;
              "
            >
              ×
            </button>
          </span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card
          v-for="(card, index) in filteredCards"
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
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Card from "@/components/CardComponent.vue";
import SideMenu from "@/components/SideMenu.vue";

const cards = ref([]);
const selectedTags = ref([]);
const selectedTag = ref("");
const availableTags = ref([]);

const filters = ref({
  location: "",
  artist: "",
  locations: [],
  artists: [],
});

const locationSuggestions = ref([]);
const artistSuggestions = ref([]);
const showLocationSuggestions = ref(false);
const showArtistSuggestions = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/tattoos");
    const fetchedCards = response.data.map((tattoo) => ({
      titre: tattoo.description,
      imageSrc: tattoo.image_url,
      localisation: tattoo.location || "Unknown",
      nomArtiste: tattoo.artist_id.username || "Unknown",
      tags: [tattoo.style_id.style_name],
    }));
    cards.value = fetchedCards;

    // Extract all unique tags, locations, and artists from the cards
    const tagsSet = new Set();
    const locationsSet = new Set();
    const artistsSet = new Set();
    fetchedCards.forEach((card) => {
      card.tags.forEach((tag) => tagsSet.add(tag));
      if (card.localisation) locationsSet.add(card.localisation);
      if (card.nomArtiste) artistsSet.add(card.nomArtiste);
    });
    availableTags.value = Array.from(tagsSet);
    locationSuggestions.value = Array.from(locationsSet);
    artistSuggestions.value = Array.from(artistsSet);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

const addTag = () => {
  if (selectedTag.value && !selectedTags.value.includes(selectedTag.value)) {
    selectedTags.value.push(selectedTag.value);
    selectedTag.value = "";
    updateAvailableTags();
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
  updateAvailableTags();
};

const updateAvailableTags = () => {
  const tagsSet = new Set();
  cards.value.forEach((card) => {
    card.tags.forEach((tag) => {
      if (!selectedTags.value.includes(tag)) {
        tagsSet.add(tag);
      }
    });
  });
  availableTags.value = Array.from(tagsSet);
};

const updateLocationSuggestions = () => {
  const query = filters.value.location.toLowerCase();
  locationSuggestions.value = cards.value
    .map((card) => card.localisation)
    .filter((location) => location && location.toLowerCase().includes(query));
};

const updateArtistSuggestions = () => {
  const query = filters.value.artist.toLowerCase();
  artistSuggestions.value = cards.value
    .map((card) => card.nomArtiste)
    .filter((artist) => artist && artist.toLowerCase().includes(query));
};

const handleLocationClick = (selectedLocation) => {
  filters.value.locations.push(selectedLocation);
  filters.value.location = "";
  showLocationSuggestions.value = false;
};

const handleArtistClick = (selectedArtist) => {
  filters.value.artists.push(selectedArtist);
  filters.value.artist = "";
  showArtistSuggestions.value = false;
};

const handleLocationRemove = (locationToRemove) => {
  filters.value.locations = filters.value.locations.filter(
    (location) => location !== locationToRemove
  );
};

const handleArtistRemove = (artistToRemove) => {
  filters.value.artists = filters.value.artists.filter(
    (artist) => artist !== artistToRemove
  );
};

const filteredCards = computed(() => {
  if (
    selectedTags.value.length === 0 &&
    filters.value.locations.length === 0 &&
    filters.value.artists.length === 0
  ) {
    return cards.value;
  }
  return cards.value.filter((card) => {
    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => card.tags.includes(tag));
    const matchesLocations =
      filters.value.locations.length === 0 ||
      filters.value.locations.includes(card.localisation);
    const matchesArtists =
      filters.value.artists.length === 0 ||
      filters.value.artists.includes(card.nomArtiste);
    return matchesTags && matchesLocations && matchesArtists;
  });
});
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
li {
  cursor: pointer;
}
li:hover {
  background-color: #f0f0f0;
}
</style>
