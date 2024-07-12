<template>
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="fixed inset-0 bg-black opacity-50 z-40"></div>
      <div class="bg-white p-6 rounded-lg shadow-lg z-50 w-1/3">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold">Modifier un Tatouage</h2>
          <button @click="close" class="text-gray-600 hover:text-gray-800">&times;</button>
        </div>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="edit_image_url" class="block text-gray-700">URL de l'image</label>
            <input v-model="editedTattoo.image_url" type="text" id="edit_image_url" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4">
            <label for="edit_description" class="block text-gray-700">Description</label>
            <textarea v-model="editedTattoo.description" id="edit_description" rows="4" class="w-full p-2 border rounded"></textarea>
          </div>
          <div class="mb-4">
            <label for="edit_price" class="block text-gray-700">Prix</label>
            <input v-model.number="editedTattoo.price" type="number" id="edit_price" class="w-full p-2 border rounded">
          </div>
          <div class="mb-4">
            <label for="edit_style" class="block text-gray-700">Style</label>
            <select v-model="editedTattoo.style_id" id="edit_style" class="w-full p-2 border rounded">
              <option v-for="style in styles" :key="style._id" :value="style._id">{{ style.style_name }}</option>
            </select>
          </div>
          <div class="flex justify-end">
            <button type="button" @click="close" class="mr-2 bg-gray-500 hover:bg-gray-700 text-white py-2 px-4 rounded">Annuler</button>
            <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      isOpen: {
        type: Boolean,
        required: true
      },
      tattoo: {
        type: Object,
        required: true
      },
      styles: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        editedTattoo: {
          _id: '',
          image_url: '',
          description: '',
          price: 0,
          style_id: ''
        }
      };
    },
    watch: {
      tattoo: {
        handler(newVal) {
          if (newVal) {
            this.editedTattoo = {
              _id: newVal._id,
              image_url: newVal.image_url,
              description: newVal.description,
              price: newVal.price,
              style_id: newVal.style_id ? newVal.style_id._id : ''
            };
          }
        },
        immediate: true
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      async submitForm() {
        try {
          const token = localStorage.getItem('userToken');
          const response = await axios.put(`http://localhost:8081/api/tattoos/${this.editedTattoo._id}`, this.editedTattoo, {
            headers: {
              'x-access-token': token
            }
          });
          console.log(response);
          this.close();
          this.$emit('submit');
        } catch (error) {
          console.error('Error updating tattoo:', error);
        }
      }
    }
  };
  </script>