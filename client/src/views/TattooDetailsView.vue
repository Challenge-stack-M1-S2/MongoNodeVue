<template>
    <b-container>
      <h2 class="main-title text-center text-black">Détails du Tatouage</h2>
      <b-row>
        <b-col cols="12" md="6" class="mb-4">
          <b-img :src="tattooArtist.photoUrl" fluid alt="Photo du tatoueur" />
          <h4 class="text-center text-black">{{ tattooArtist.firstName }} {{ tattooArtist.lastName }}</h4>
          <h5 class="text-center text-black">{{ tattooArtist.description }}</h5>
          <p class="text-center text-black">Localisation : {{ tattooArtist.location }}</p>
        </b-col>
        <b-col v-for="(item, index) in images" :key="index" cols="12" md="4" class="mb-4">
          <b-img :src="item.url" fluid alt="Image" />
          <h5 class="text-center text-black">{{ item.title }}</h5>
        </b-col>
      </b-row>
    </b-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        tattooArtist: {
          photoUrl: '',
          firstName: '',
          lastName: '',
          description: '',
          location: ''
        },
        images: []
      };
    },
    created() {
      const tattooId = this.$route.params.id;
      this.fetchTattooById(tattooId);
    },
    methods: {
      async fetchTattooById(id) {
        try {
          const response = await axios.get(`http://localhost:8081/api/tattoos/${id}`);
          this.tattooArtist = response.data.tattooArtist;
          this.images = response.data.images;
        } catch (error) {
          console.error('Error fetching tattoo details:', error);
        }
      }
    }
  };
  </script>
  
  <style>
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
  