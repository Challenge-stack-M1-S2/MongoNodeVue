<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Se connecter</h2>
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Connection</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:8081/api/auth/signin', {
          username: this.username,
          password: this.password
        });

        // Stocker le token JWT
        const token = response.data.accessToken;
        localStorage.setItem('userToken', token);

        // Vérifier si l'utilisateur est un admin et rediriger en conséquence
        await this.checkAdminStatus();
      } catch (error) {
        console.error('Error during login:', error);

        this.errorMessage = error.response ? error.response.data.message : error.message;
      }
    },
    async checkAdminStatus() {
      try {
        const token = localStorage.getItem('userToken');
        const response = await axios.get('http://localhost:8081/api/test/admin', {
          headers: {
            'x-access-token': token
          }
        });

        // Rediriger selon le statut d'admin
        if (response.data.message === "User is an admin!") {
          localStorage.setItem("admin", "true")
          this.$router.push('/tattoo-artist');
        } else {
          this.$router.push('/my-bookings');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);

        // Rediriger vers /my-bookings en cas d'erreur ou si l'utilisateur n'est pas admin
        this.$router.push('/my-bookings');
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

form {
  width: 300px;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: black;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: #333;
  background-color: #f9f9f9;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #007BFF;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
