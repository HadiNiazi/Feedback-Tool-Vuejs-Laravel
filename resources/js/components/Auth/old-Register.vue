<template>
    <div class="container">
     <div class="row">
         <div class="col-md-6 col-md-offset-3 login-container">
             <h3>Create an Account</h3>

             <!-- Error message for password mismatch -->
            <p v-if="passwordMismatch" class="error-message">Passwords do not match.</p>

            <!-- Display validation errors -->
            <div v-if="errors.length">
            <ul>
                <li v-for="error in errors" :key="error" class="error-message">{{ error }}</li>
            </ul>
            </div>

            <div v-if="successMessage" class="success-message">
                {{ successMessage }}
            </div>

             <form>
                 <div class="form-group">
                    <label for="name">Name:</label>
                    <input type="name" id="name" class="form-control" v-model="name" placeholder="Enter your name" required>
                 </div>

                 <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                 </div>

                 <div class="form-group">
                    <label for="password">Password:</label>
                    <input type="password" id="password" class="form-control" v-model="password" placeholder="Choose a password" required>
                 </div>

                 <div class="form-group">
                    <label for="passwordConfirmation">Confirm Password:</label>
                    <input type="password" id="passwordConfirmation" class="form-control" v-model="passwordConfirmation" placeholder="Confirm your password" required>
                 </div>

                 <button type="submit" @click.prevent="register" class="btn btn-primary btn-login">Register</button>
             </form>
         </div>
     </div>
 </div>
 </template>


<script>

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
        const response = await axios.post('/api/register', {
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
  .login-container {
    margin-top: 50px;
    max-width: 400px;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
.login-container h3 {
    margin-bottom: 20px;
    text-align: center;
}
.form-group {
    margin-bottom: 20px;
}
.form-group label {
    font-weight: bold;
}
.btn-login {
    width: 100%;
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
