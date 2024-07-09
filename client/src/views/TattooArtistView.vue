<template>
  <b-container>
    <b-row>
      <b-col v-for="(image, index) in images" :key="index" cols="12" md="4">
        <b-img :src="image" fluid alt="Image" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      images: [
        require('../assets/banner.png'),
        require('../assets/banner.png'),
        require('../assets/banner.png'),
        require('../assets/banner.png'),
      ]
    }
  }
}
</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
</style>

