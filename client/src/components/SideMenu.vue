<template>
  <div class="inset-y-0 left-0 w-64 shadow-lg z-50">
    <div
      class="sticky top-0 p-4"
      :style="{
        'background-image':
          'url(' + require('@/assets/sidemenu-banner2.png') + ')',
      }"
      style="height: 911px"
    >
      <nav class="h-full">
        <ul class="h-full flex flex-column justify-center">
          <div>
            <li class="my-4">
              <router-link
                to="/"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3388/3388840.png"
                  class="fas fa-star mr-2"
                />
                Accueil
              </router-link>
            </li>
          </div>
          <div>
            <hr class="my-8 bg-black border-0" style="height: 1px" />
            <li v-if="!isUserTokenAbsent" class="mb-4">
              <router-link
                to="/seances"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5764/5764103.png"
                  class="fas fa-star mr-2"
                />
                Mes Séances
              </router-link>
            </li>
            <li v-if="!isUserTokenAbsent" class="mb-4">
              <router-link
                to="/my-bookings"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/16702/16702410.png"
                  class="fas fa-star mr-2"
                />
                Mes réservations
              </router-link>
            </li>
            <li class="mb-4">
              <router-link
                to="/tattoo-artist/:id"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4481/4481871.png"
                  class="fas fa-star mr-2"
                />
                Mes tattoos
              </router-link>
            </li>

            <hr class="my-8 bg-black border-0" style="height: 1px" />
          </div>
          <div>
            <li v-if="isUserTokenAbsent" class="mb-4">
              <router-link
                to="/login-form"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/12765/12765311.png"
                  class="fas fa-star mr-2"
                />
                Login
              </router-link>
            </li>
            <li v-else class="mb-4">
              <router-link
                to="/"
                @click="logout"
                class="flex items-center text-gray-700 hover:text-black"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3726/3726291.png"
                  class="fas fa-star mr-2"
                />
                Se Déconnecter
              </router-link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SideMenu",
  data() {
    return {
      dataFragment: null,
    };
  },
  computed: {
    isUserTokenAbsent() {
      return !localStorage.getItem("userToken");
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("userToken");
      this.$router.push("/"); // Redirect to login after logout
    },
    fetchData() {
      const userToken = localStorage.getItem("userToken");

      if (!userToken) {
        console.error("User token not found");
        return;
      }

      axios
        .get("http://localhost:8081/api/test/admin", {
          headers: {
            "x-access-token": `${userToken}`,
          },
        })
        .then((response) => {
          this.dataFragment = response.data; // assuming the fragment is in the response data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
  },
  mounted() {
    this.fetchData(); // Fetch data when the component is mounted
  },
};
</script>

<style scoped>
/* Vos styles pour SideMenu.vue */
img {
  height: 30px;
}
</style>
