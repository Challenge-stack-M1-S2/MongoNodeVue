<template>
  <b-card
    tag="article"
    class="max-w-xs h-72 mb-4 font-bold text-gray-800"
    style="height: 38rem"
  >
    <img :src="imageSrc" alt="Card Image" class="w-full h-300px object-cover" />
    <h2 class="ml-2 fs-5">{{ titre }}</h2>
    <div class="pl-0 pr-4 pt-4 pb-4">
      <div class="flex items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2901/2901609.png"
          alt="Location"
          class="h-4"
        />
        <span class="ml-2">{{ localisation }}</span>
      </div>
      <div class="flex jsutify-center items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/12308/12308225.png"
          alt="Artist"
          class="h-4"
        />
        <span
          class="ml-2 px-2 rounded-md"
          style="background-color: #eeeafb; color: #585163"
          >{{ nomArtiste }}</span
        >
      </div>
      <div class="flex justify-start flex-wrap pt-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/81/81275.png"
          alt="Artist"
          class="h-4"
        />
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="bg-gray-200 px-3 py-1 text-sm ml-2 mr-2 mb-2"
          >{{ tag }}</span
        >
      </div>
    </div>
    <div class="button-container">
      <b-button
        :to="{ name: 'TattooDetailsPage', params: { id: id } }"
        variant="dark"
        class="details-button"
      >
        Voir détails
      </b-button>
    </div>
  </b-card>
</template>

<script>
export default {
  props: {
    titre: String,
    imageSrc: String,
    localisation: String,
    nomArtiste: String,
    tags: Array,
    id: String,
  },
};
</script>

<style scoped>
img {
  height: 30px;
}

.h-300px {
  height: 300px !important;
}

.tag {
  display: inline-block;
  background-color: #8b5a2b;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 14px;
  margin-right: 8px;
  margin-bottom: 8px;
}

.button-container {
  display: flex;
  justify-content: center;
  padding: 1rem;
}

.details-button {
  background-color: #000000 !important;
  color: #ffffff !important;
}
</style>
