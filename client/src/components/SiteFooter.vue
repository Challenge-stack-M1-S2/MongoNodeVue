<template>
  <footer class="bg-gray-800 text-white p-4 text-center">
    <p>&copy; 2024 Inked Legends. All Rights Reserved.</p>
    <nav>
      <ul class="flex justify-center space-x-4">
        <li><router-link to="/" class="hover:text-gray-400">Home</router-link></li>
        <li><router-link to="/about" class="hover:text-gray-400">About</router-link></li>
        <li><router-link to="/contact" class="hover:text-gray-400">Contact</router-link></li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter'
}
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
