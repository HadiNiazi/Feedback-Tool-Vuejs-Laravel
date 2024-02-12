<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="mt-5">
            <div class="card">
              <div class="card-header">
                Login
              </div>
              <div class="card-body">

                <!-- Display errors -->
                <div v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error" class="text-danger">{{ error }}</li>
                  </ul>
                </div>

                <form>
                  <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                  </div>
                  <div class="mb-3">
                    <label class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="password" placeholder="Enter your password" required>
                  </div>

                  <button type="submit" @click.prevent="login" class="btn btn-primary btn-login">Login</button>
                </form>
              </div>
            </div>
          </div>
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

          await axios.get('/sanctum/csrf-cookie');
          const response = await axios.post('/api/login', {
            email: this.email,
            password: this.password,
          });
          if (response.status === 200) {
            this.successMessage = response.data.message; // Set the success message
            this.email = '';
            this.password = '';

            this.$store.dispatch('setAuthToken', response.data.token)

            this.$router.push({
              name: 'dashboard'
            });
          }
        } catch (error) {
          if (error.response) {
            if (error.response.status === 422) {
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
