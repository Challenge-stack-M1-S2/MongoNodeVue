<template>
  <b-card
    :title="titre"
    tag="article"
    class="max-w-xs h-72 mb-4"
    style="height: 38rem"
  >
    <img :src="imageSrc" alt="Card Image" class="w-full h-300px object-cover" />
    <div class="p-4">
      <div class="flex items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2901/2901609.png"
          alt="Location"
          class="h-4"
        />
        <span class="ml-2">{{ localisation }}</span>
      </div>
      <div class="flex items-center mb-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/12308/12308225.png"
          alt="Artist"
          class="h-4"
        />
        <span class="ml-2">{{ nomArtiste }}</span>
      </div>
      <div class="flex flex-wrap">
        <span
          v-for="(tag, index) in tags"
          :key="index"
          class="bg-gray-200 rounded-full px-3 py-1 text-sm mr-2 mb-2"
          >{{ tag }}</span
        >
      </div>
    </div>
    <b-button href="#" variant="primary">Go somewhere</b-button>
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
</style>
