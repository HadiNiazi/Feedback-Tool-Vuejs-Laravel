<template>
   <div class="container">
    <div class="row">
        <div class="col-md-6 col-md-offset-3 login-container">
            <h3>Login</h3>

            <!-- Display errors -->
            <div v-if="errors.length">
                <ul>
                    <li v-for="error in errors" :key="error" class="error-message">{{ error }}</li>
                </ul>
            </div>

            <form>
                <div class="form-group">
                    <label for="email">Email address:</label>
                    <input type="email" class="form-control" id="email" v-model="email" placeholder="Enter your email" required>
                </div>
                <div class="form-group">
                    <label for="pwd">Password:</label>
                    <input type="password" class="form-control" id="pwd" v-model="password" placeholder="Enter your password" required>
                </div>
                <button type="submit" @click.prevent="login" class="btn btn-primary btn-login">Login</button>
            </form>
        </div>
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

                const response = await axios.post('/api/login', {
                    email: this.email,
                    password: this.password,
                });

                if (response.status === 200) {
                    this.successMessage = response.data.message; // Set the success message
                    this.email = '';
                    this.password = '';

                    this.$store.dispatch('checkAuthentication')

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

    },
  };




</script>

 <style>

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
  </style>
