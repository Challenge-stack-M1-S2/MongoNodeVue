<template>
  <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
    <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
    <div class="bg-white p-6 rounded-lg shadow-lg z-50 w-1/3">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">Ajouter un Tatouage</h2>
        <button @click="close" class="text-gray-600 hover:text-gray-800">&times;</button>
      </div>
      <form @submit.prevent="submitForm">
        <div class="mb-4">
          <label for="image_url" class="block text-gray-700">URL de l'image</label>
          <input v-model="imageUrl" type="text" id="image_url" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Description</label>
          <textarea v-model="description" id="description" rows="4" class="w-full p-2 border rounded"></textarea>
        </div>
        <div class="mb-4">
          <label for="price" class="block text-gray-700">Prix</label>
          <input v-model="price" type="number" id="price" class="w-full p-2 border rounded">
        </div>
        <div class="mb-4">
          <label for="style_id" class="block text-gray-700">Style de Tatouage</label>
          <select v-model="selectedStyle" id="style_id" class="w-full p-2 border rounded">
            <option v-for="style in styles" :key="style._id" :value="style._id">{{ style.style_name }}</option>
          </select>
        </div>
        <div class="flex justify-end">
          <button type="button" @click="close" class="mr-2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Annuler</button>
          <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Ajouter</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    },
    styles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      imageUrl: '',
      description: '',
      price: 0,
      selectedStyle: '' // Champ pour stocker l'ID du style sélectionné
    };
  },
  methods: {
    close() {
      this.$emit('close');
    },
    submitForm() {
      this.$emit('submit', {
        image_url: this.imageUrl,
        description: this.description,
        price: this.price,
        style_id: this.selectedStyle // Inclut l'ID du style sélectionné dans les données soumises
      });
      this.close();
    }
  }
};
</script>
