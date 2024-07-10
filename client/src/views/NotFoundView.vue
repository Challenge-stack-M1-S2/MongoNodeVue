<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-gray-100"
  >
    <div class="text-center">
      <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-gray-600 mb-2">Page Not Found</h2>
      <p class="text-gray-500 mb-8">
        The page you are looking for does not exist.
      </p>
      <router-link to="/">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go back to Home
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFoundView",
};
</script>

<style scoped>
body {
  margin: 0;
  font-family: "Arial", sans-serif;
}
</style>
