<template>
    <div>
      <h1>Détail du Tatouage</h1>
      <p>Vous regardez le tatouage avec l'ID: {{ id }}</p>
      <!-- Vous pouvez ajouter plus de détails ici en fonction des données -->
    </div>
  </template>
  
  <script>
  export default {
    props: ['id'], // Recevez l'ID comme prop
    data() {
      return {
        // Vous pouvez définir d'autres données ici, par exemple les détails du tatouage
      };
    },
    created() {
      // Vous pouvez faire un appel API ici pour récupérer plus de détails sur le tatouage en utilisant l'ID
      console.log(`Fetching details for tattoo with ID: ${this.id}`);
    }
  }
  </script>
  
<style scoped>
*{
  color: black;
}
</style>