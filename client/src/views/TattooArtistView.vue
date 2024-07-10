<template>
  <b-container>
    <h2 class="main-title text-center text-black">Tous les tattoos</h2>
    <b-row>
      <b-col v-for="(item, index) in images" :key="index" cols="12" md="4" class="mb-4">
        <b-img :src="item.src" fluid alt="Image" />
        <h5 class="text-center text-black">{{ item.title }}</h5>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { src: require('../assets/banner.png'), title: 'Titre 1' },
        { src: require('../assets/banner.png'), title: 'Titre 2' },
        { src: require('../assets/banner.png'), title: 'Titre 3' },
        { src: require('../assets/banner.png'), title: 'Titre 4' },
      ]
    }
  }
}
</script>

<style>
/* Ajoutez des styles personnalisés si nécessaire */
.main-title {
  margin-top: 2rem; /* Espace au-dessus du titre principal */
  margin-bottom: 2rem; /* Espace en dessous du titre principal */
  font-size: 2.5rem; /* Taille de la police plus grande */
}
.mb-4 {
  margin-bottom: 1.5rem; /* Ajustez la valeur selon vos besoins */
}
.text-center {
  text-align: center;
}
.text-black {
  color: black;
}
</style>

