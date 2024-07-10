<template>
  <b-card
    :title="titre"
    :img-src="imageSrc"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem; height: 600px"
    class="mb-4"
  >
    <div class="w-4/5 mx-auto mb-4">
      <div class="flex items-center justify-left py-1">
        <img src="https://cdn-icons-png.flaticon.com/512/2901/2901609.png" />
        <b-card-text class="px-4">{{ localisation }}</b-card-text>
      </div>
      <div class="flex items-center justify-left py-1">
        <img src="https://cdn-icons-png.flaticon.com/512/12308/12308225.png" />
        <b-card-text class="px-4">{{ nomArtiste }}</b-card-text>
      </div>
    </div>
    <div class="mb-3 flex flex-wrap">
      <span class="tag" v-for="(tag, index) in tags" :key="index">{{
        tag
      }}</span>
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
