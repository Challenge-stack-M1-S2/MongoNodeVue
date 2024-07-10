<template>
  <div class="sticky inset-y-0 left-0 w-64 bg-white shadow-lg z-50">
    <div class="p-4">
      <h2 class="text-xl font-bold mb-4">Mon Compte</h2>
      <nav>
        <ul>
          <li class="mb-4">
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
          <li class="mb-4">
            <router-link
              to="/avis"
              class="flex items-center text-gray-700 hover:text-black"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5764/5764103.png"
                class="fas fa-star mr-2"
              />
              Mes Avis
            </router-link>
          </li>
          <li class="mb-4">
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
                src="https://cdn-icons-png.flaticon.com/512/16702/16702410.png"
                class="fas fa-star mr-2"
              />
              Mes tattoos
            </router-link>
          </li>
          <li class="mb-4">
            <router-link
              to="/login-form"
              class="flex items-center text-gray-700 hover:text-black"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/16702/16702410.png"
                class="fas fa-star mr-2"
              />
              Login
            </router-link>
          </li>
          <hr style="width: 50%; text-align: left; margin-left: 0" />
          <li class="mb-4">
            <router-link
              to="/logout"
              class="flex items-center text-gray-700 hover:text-black"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/3726/3726291.png"
                class="fas fa-star mr-2"
              />
              Se Déconnecter
            </router-link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideMenu",
};
</script>

<style scoped>
img {
  height: 30px;
}
</style>
