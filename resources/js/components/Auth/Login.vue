<template>
    <div class="app-container">
      <div class="login-container">
        <form class="login-form">
          <h2 class="login-heading">Welcome Back!</h2>

          <!-- Display validation errors -->
          <div v-if="errors.length">
            <ul>
                <li v-for="error in errors" :key="error" class="error-message">{{ error }}</li>
            </ul>
          </div>

          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" placeholder="Enter your email" required>

          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Enter your password" required>

          <button type="submit" @click.prevent="login">Login</button>
        </form>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';

  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
      };
    },
    methods: {

        async login() {
            try {

               // Fetch CSRF token
                await axios.get('/sanctum/csrf-cookie');

                const response = await axios.post('/login', {
                    email: this.email,
                    password: this.password,
                });

                if (response.status === 200) {
                    this.successMessage = response.data.message; // Set the success message
                    this.email = '';
                    this.password = '';

                    localStorage.setItem('auth_token', response.data.token);

                    this.$router.push({ name: 'dashboard' });
                }


            } catch (error) {
                if (error.response) {
                    if (error.response.status === 422) {
                        // Validation error, update the errors variable
                        this.errors = Object.values(error.response.data.errors).flat();
                    }
                } else {
                    this.errors = error;
                }
            }
        },




    //   async login() {

    //     try {
    //     const response = await axios.post('/login', {
    //         email: this.email,
    //         password: this.password,
    //     });


    //     if (response.status === 200) {

    //         this.successMessage = response.data.message; // Set the success message
    //         this.email = '';
    //         this.password = '';

    //         localStorage.setItem('auth_token', 'Bearer '+ response.data.token);
    //         // axios.defaults.headers.common["Authorization"] = token;
    //         // this.$store.dispatch('setToken', response.data.token);

    //         this.$router.push({ name: 'dashboard' });
    //     }

    //     } catch (error) {

    //         if (error.response) {

    //             if (error.response.status === 422) {
    //             // Validation error, update the errors variable
    //                 this.errors = Object.values(error.response.data.errors).flat();
    //             }

    //         }
    //         else {
    //             this.errors = error;
    //         }

    //     }


    //   },
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

  .error-message {
    color: #ff0000;
    margin-top: 5px;
}
  </style>
