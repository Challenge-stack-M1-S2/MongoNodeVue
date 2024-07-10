<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin">
      <h2>Login</h2>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
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
      errorMessage: ''
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
        console.log(token)

        // Obtenir les informations utilisateur
        const userInfoResponse = await axios.get('http://localhost:8081/api/user/info', {
          headers: { 'x-access-token': token }
        });

        // Stocker l'ID de l'utilisateur
        localStorage.setItem('userId', userInfoResponse.data._id);
        // console.log(localStorage.setItem('userId', userInfoResponse.data._id))

        // Rediriger l'utilisateur vers le tableau de bord
        this.$router.push('/my-bookings');
      } catch (error) {
        console.error('Error during login:', error);
        
        this.errorMessage = error.response ? error.response.data.message : error.message;
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
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
