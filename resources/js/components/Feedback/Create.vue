<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8"> <!-- Adjust this to fit your layout -->
          <div class="mt-5">

            <router-link to="/feedbacks" class="btn btn-info mb-3 text-white">Go to Feedbacks</router-link> &nbsp;
            <router-link to="/dashboard" class="btn btn-info mb-3 text-white">Go to My Feedbacks</router-link>

            <div class="card">
              <div class="card-header">
                Create Feedback
              </div>
              <div class="card-body">

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
                    <label for="name">Title:</label>
                    <input type="text" class="form-control" v-model="title" placeholder="Enter your title" required>
                  </div>

                  <div class="mb-3">
                    <label for="name">Category:</label>
                    <select v-model="category" class="form-control">
                        <option value="" selected>Choose option</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
                    </select>
                  </div>

                  <div class="mb-3">
                    <label for="description">Description:</label>
                    <textarea v-model="description" class="form-control" style="resize: none;" cols="10" rows="5" placeholder="Enter description here..."></textarea>
                  </div>

                  <button type="submit" @click.prevent="submit" class="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>


<script>

import router from '../../router/index.js';

  export default {
    data() {
      return {
        title: '',
        category: '',
        description: '',
        categories: [],
        errors: [],
        successMessage: ''
      };
    },
    methods: {
      async submit() {

        try {

            this.clearErrors();

        const response = await axios.post('/api/feedbacks/store', {
            title: this.title,
            description: this.description,
            category: this.category
        });

        if (response.status === 201) {
            this.successMessage = response.data.message; // Set the success message
            this.title = '';
            this.description = '';
            this.category = '';
        }

        // Handle the response, e.g., redirect on successful login
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

      async loadCategories() {

        try {
            const response = await axios.get('/api/feedbacks/categories');

            if (response.status === 201) {
                this.categories = response.data.categories; // Set the success message
            }

        // Handle the response, e.g., redirect on successful login
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

     clearErrors() {
        this.successMessage = '';
        this.errors = '';
     }

    },

    created() {
        this.loadCategories();
    }

  };
</script>
