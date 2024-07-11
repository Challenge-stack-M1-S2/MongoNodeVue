<template>
  <div>
    <h1>Liste des Tatouages</h1>
    <ul>
      <li v-for="tattoo in tattoos" :key="tattoo.id">
        <router-link :to="{ name: 'TattooDetailsPage', params: { id: tattoo.id.toString() }}">
          <img :src="tattoo.imageUrl" :alt="tattoo.name" />
        </router-link>
        <p>{{ tattoo.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tattoos: [
        { id: 1, name: 'Tatouage 1', imageUrl: require('../assets/banner.png') },
        { id: 2, name: 'Tatouage 2', imageUrl: require('../assets/banner.png') },
        { id: 3, name: 'Tatouage 3', imageUrl: require('../assets/banner.png') },
      ]
    }
  }
}
</script>

<style scoped>
*{
  color: black;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
img {
  cursor: pointer;
  width: 100px;
  height: 100px;
}
</style>
