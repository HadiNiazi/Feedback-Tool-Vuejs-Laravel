<template>
    <div class="app-container">
      <div class="register-container">

        <form class="register-form">
          <h2 class="register-heading">Create an Account</h2>

          <!-- Error message for password mismatch -->
          <!-- Display validation errors -->
          <div v-if="errors.length">
            <ul>
                <li v-for="error in errors" :key="error" class="error-message">{{ error }}</li>
            </ul>
          </div>

          <div v-if="successMessage" class="success-message">
            {{ successMessage }}
          </div>

          <p v-if="passwordMismatch" class="error-message">Passwords do not match.</p>

          <label for="name">Name:</label>
          <input type="name" id="name" v-model="name" placeholder="Enter your name" required>

          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" placeholder="Enter your email" required>

          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" placeholder="Choose a password" required>

          <label for="passwordConfirmation">Confirm Password:</label>
          <input type="password" id="passwordConfirmation" v-model="passwordConfirmation" placeholder="Confirm your password" required>

          <button type="submit" @click.prevent="register">Register</button>
        </form>
      </div>
    </div>
  </template>

<script>
import axios from 'axios';
import router from '../../router/index.js';

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        passwordMismatch: false,
        errors: [],
        successMessage: ''
      };
    },
    methods: {
      async register() {
        if (this.password !== this.passwordConfirmation) {

            this.passwordMismatch = true;

          return;
        }

        // Reset the error message if passwords match
        this.passwordMismatch = false;

        // Add your registration logic here

        try {
        const response = await axios.post('/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.passwordConfirmation
        });

        console.log(response)

        if (response.status === 201) {
            this.successMessage = response.data.message; // Set the success message
            this.name = '';
            this.email = '';
            this.password = '';
            this.passwordConfirmation = '';

            this.$router.push({ name: 'home' });
        }

        // Handle the response, e.g., redirect on successful login
        console.log(response.data);
        } catch (error) {

            if (error.response) {

                if (error.response.status === 422) {
                // Validation error, update the errors variable
                    this.errors = Object.values(error.response.data.errors).flat();
                }

            }
            else {
                this.errors = error;
            }

        }


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

  .register-container {
    text-align: center;
  }

  .register-form {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 40px;
    width: 300px;
  }

  .register-heading {
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

    .success-message {
    background-color: #d4edda;
    color: #155724;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #c3e6cb;
    border-radius: 4px;
    }
  </style>
