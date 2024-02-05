<template>
    <div class="app-container">
      <div class="login-container">
        <form class="login-form">
          <h2 class="login-heading">Welcome Back!</h2>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="username" placeholder="Enter your username" required>

          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required>

          <button type="submit" @click.prevent="login">Login</button>
        </form>
      </div>
    </div>
  </template>

  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        // Add your login logic here
        console.log('Logging in with:', this.username, this.password);
      },
    },
  };
  </script>

  <style scoped>
  .app-container {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background: linear-gradient(to right, #A17EB8, #7441db);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .login-container {
    text-align: center;
  }

  .login-form {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 300px;
  }

  .login-heading {
    color: #5d44f7;
  }

  label {
    display: block;
    text-align: left;
    margin: 15px 0 5px 0;
    color: #555555;
  }

  input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
    box-sizing: border-box;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
  }

  button {
    background-color: #5d44f7;
    color: #ffffff;
    padding: 12px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #7441db;
  }
  </style>
