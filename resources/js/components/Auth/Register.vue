<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="mt-5">
            <div class="card">
              <div class="card-header">
                Create an account
              </div>
              <div class="card-body">

                <!-- Error message for password mismatch -->
                <p v-if="passwordMismatch" class="text-danger">
                    <ul>
                        <li>Passwords do not match.</li>
                    </ul>
                </p>

                <!-- Display validation errors -->
                <div v-if="errors.length">
                    <ul>
                        <li v-for="error in errors" :key="error" class="text-danger">{{ error }}</li>
                    </ul>
                </div>

                <div v-if="successMessage" class="alert alert-success fade show" role="alert">
                    <strong>Good job!</strong> {{ successMessage }}
                </div>

                <form>

                  <div class="mb-3">
                    <label for="name">Name:</label>
                    <input type="name" id="name" class="form-control" v-model="name" placeholder="Enter your name" required>
                  </div>

                  <div class="mb-3">
                    <label for="email">Email:</label>
                    <input type="email" id="email" class="form-control" v-model="email" placeholder="Enter your email" required>
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                  </div>

                  <div class="mb-3">
                    <label for="password">Password:</label>
                    <input type="password" id="password" class="form-control" v-model="password" placeholder="Choose a password" required>
                  </div>

                  <div class="mb-3">
                    <label for="password_confirmation">Confirm Password:</label>
                    <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation" placeholder="Confirm your password" required>
                  </div>

                  <button type="submit" @click.prevent="register" class="btn btn-primary btn-login">Register</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


<script>

  export default {
    data() {
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        passwordMismatch: false,
        errors: [],
        successMessage: ''
      };
    },
    methods: {
      async register() {
        if (this.password !== this.password_confirmation) {

            this.passwordMismatch = true;

          return;
        }

        this.passwordMismatch = false;

        try {
        const response = await axios.post('/api/register', {
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
        });

        if (response.status === 201) {
            this.successMessage = response.data.message;
            this.name = '';
            this.email = '';
            this.password = '';
            this.password_confirmation = '';

            this.$router.push({ name: 'home' });
        }

        } catch (error) {

            if (error.response) {

                if (error.response.status === 422) {
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
