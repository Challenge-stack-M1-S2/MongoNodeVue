<template>
  <div class="flex">
    <SideMenu />
    <div class="w-5/6 p-4">
      <img
        class="rounded-3xl"
        :src="banner"
        alt=""
        style="box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.6)"
      />

      <h1 class="h1 pt-4">Réserver un flash</h1>
      <div class="block mb-4">
        <div class="flex">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Rechercher un tatouage par nom d'artiste, localisation, tags ou encore description"
            class="border p-2 rounded-l-md w-full text-black"
          />
          <button class="border p-2 rounded-r-md bg-gray-200">🔍</button>
        </div>

        <div class="flex flex-col mt-2" style="width: 30%">
          <p class="font-bold text-gray-800 text-left py-2">Tags :</p>
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
        <div class="flex mt-4 justify-start" style="width: 100%">
          <div class="relative mr-4" style="width: 30%">
            <input
              type="text"
              v-model="filters.location"
              @focus="showLocationSuggestions = true"
              @input="updateLocationSuggestions"
              placeholder="Lieu"
              class="text-gray-800 border p-2 rounded-md w-full"
            />
           
            <ul
              v-if="showLocationSuggestions && filters.location.length > 0"
              class="suggestions-list text-black"
            >
              <li
                v-for="(suggestion, index) in locationSuggestions"
                :key="index"
                @click="applyLocationFilter(suggestion)"
                class="cursor-pointer p-4 hover:bg-gray-200"
              >
                {{ suggestion }}
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

          <div class="relative" style="width: 30%">
            <input
              type="text"
              v-model="filters.artist"
              @focus="showArtistSuggestions = true"
              @input="updateArtistSuggestions"
              placeholder="Tatoueur"
              class="text-gray-800 border p-2 rounded-md w-full"
            />
           
            <ul
              v-if="showArtistSuggestions && filters.artist"
              class="absolute w-full bg-white border text-black mt-1 z-10 text-lg"
            >
              <li
                v-for="(artist, index) in artistSuggestions"
                :key="index"
                @mousedown.prevent="handleArtistClick(artist)"
                class="cursor-pointer p-4 hover:bg-gray-200"
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
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-content-around"
      >
        <Card
          v-for="(card, index) in filteredCards"
          :key="index"
          :titre="card.titre"
          :image-src="card.imageSrc"
          :localisation="card.localisation"
          :nom-artiste="card.nomArtiste"
          :tags="card.tags"
          :id="card.id"
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
import banner from "@/assets/banner2.png";

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

const searchQuery = ref("");
const locationSuggestions = ref([]);
const artistSuggestions = ref([]);
const showLocationSuggestions = ref(false);
const showArtistSuggestions = ref(false);

onMounted(async () => {
  try {
    const response = await axios.get("http://localhost:8081/api/tattoos");
    console.log(response.data);
    const fetchedCards = response.data.map((tattoo) => ({
      titre: tattoo.description,
      imageSrc: tattoo.image_url,
      localisation: tattoo.artist_id.base_location || "Unknown",
      nomArtiste: tattoo.artist_id.username || "Unknown",
      tags: [tattoo.style_id.style_name],
      id: tattoo._id,
      available: tattoo.hasAvailableSessions,
    }));
    cards.value = fetchedCards;

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
  const uniqueSuggestions = new Set(
    cards.value
      .map((card) => card.localisation)
      .filter((location) => {
        return (
          location &&
          location.toLowerCase().includes(query) &&
          !filters.value.locations.includes(location)
        );
      })
  );
  locationSuggestions.value = Array.from(uniqueSuggestions);
};

const updateArtistSuggestions = () => {
  const query = filters.value.artist.toLowerCase();
  const uniqueSuggestions = new Set(
    cards.value
      .map((card) => card.nomArtiste)
      .filter((artist) => {
        return (
          artist &&
          artist.toLowerCase().includes(query) &&
          !filters.value.artists.includes(artist)
        );
      })
  );
  artistSuggestions.value = Array.from(uniqueSuggestions);
};

const applyLocationFilter = (location) => {
  if (!filters.value.locations.includes(location)) {
    filters.value.locations.push(location);
    filters.value.location = "";
    showLocationSuggestions.value = false;
  }
};

const handleLocationRemove = (locationToRemove) => {
  filters.value.locations = filters.value.locations.filter(
    (location) => location !== locationToRemove
  );
};

const handleArtistClick = (selectedArtist) => {
  if (!filters.value.artists.includes(selectedArtist)) {
    filters.value.artists.push(selectedArtist);
    filters.value.artist = "";
  }
};

const handleArtistRemove = (artistToRemove) => {
  filters.value.artists = filters.value.artists.filter(
    (artist) => artist !== artistToRemove
  );
};

const filteredCards = computed(() => {
  const searchLower = searchQuery.value.toLowerCase();

  if (
    selectedTags.value.length === 0 &&
    filters.value.locations.length === 0 &&
    filters.value.artists.length === 0 &&
    searchQuery.value.trim() === ""
  ) {
    // Retourner seulement les cartes disponibles si aucun filtre n'est appliqué
    return cards.value.filter((card) => card.available);
  }

  return cards.value.filter((card) => {
    if (!card.available) {
      return false;
    }

    const matchesSearch =
      card.titre.toLowerCase().includes(searchLower) ||
      card.localisation.toLowerCase().includes(searchLower) ||
      card.nomArtiste.toLowerCase().includes(searchLower) ||
      card.tags.some((tag) => tag.toLowerCase().includes(searchLower));

    const matchesTags =
      selectedTags.value.length === 0 ||
      selectedTags.value.some((tag) => card.tags.includes(tag));

    const matchesLocations =
      filters.value.locations.length === 0 ||
      filters.value.locations.includes(card.localisation);

    const matchesArtists =
      filters.value.artists.length === 0 ||
      filters.value.artists.includes(card.nomArtiste);

    return matchesSearch && matchesTags && matchesLocations && matchesArtists;
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
  font-size: 1.2rem;
  padding: 0.75rem;
}

li:hover {
  background-color: #f0f0f0;
}

.suggestions-list {
  position: absolute;
  background-color: white;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  z-index: 1000;
}
.suggestions-list li {
  padding: 10px;
  cursor: pointer;
}
.suggestions-list li:hover {
  background-color: #f0f0f0;
}
</style>
