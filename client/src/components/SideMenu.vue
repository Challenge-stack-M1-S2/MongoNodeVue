<template>
  <!-- Side menu -->
  <div
    class="sticky inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
    style="height: 910px"
  >
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Filters</h2>

      <!-- Département Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Département</label
        >
        <input
          type="text"
          v-model="departement"
          class="mt-1 p-2 block w-full border rounded-md"
          placeholder="Enter département"
        />
      </div>

      <!-- Tags Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700">Tags</label>
        <input
          type="text"
          v-model="tagSearch"
          @keydown.enter.prevent="addTag"
          class="mt-1 p-2 block w-full border rounded-md"
          placeholder="Search and add tags"
        />
        <div class="mt-2 flex flex-wrap">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="bg-blue-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {{ tag }}
            <button @click="removeTag(index)" class="ml-1 text-red-500">
              ×
            </button>
          </span>
        </div>
      </div>

      <!-- Tattoo Artist Filter -->
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700"
          >Tattoo Artist</label
        >
        <input
          type="text"
          v-model="artistSearch"
          @keydown.enter.prevent="addArtist"
          class="mt-1 p-2 block w-full border rounded-md"
          placeholder="Search and add artist"
        />
        <div class="mt-2 flex flex-wrap">
          <span
            v-for="(artist, index) in artists"
            :key="index"
            class="bg-green-500 text-white rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >
            {{ artist }}
            <button @click="removeArtist(index)" class="ml-1 text-red-500">
              ×
            </button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      departement: "",
      tagSearch: "",
      tags: [],
      artistSearch: "",
      artists: [],
    };
  },
  methods: {
    addTag() {
      if (this.tagSearch && !this.tags.includes(this.tagSearch)) {
        this.tags.push(this.tagSearch);
        this.tagSearch = "";
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    addArtist() {
      if (this.artistSearch && !this.artists.includes(this.artistSearch)) {
        this.artists.push(this.artistSearch);
        this.artistSearch = "";
      }
    },
    removeArtist(index) {
      this.artists.splice(index, 1);
    },
  },
};
</script>

<style scoped>
/* Style Tailwind peut être ajouté selon vos préférences */
</style>
