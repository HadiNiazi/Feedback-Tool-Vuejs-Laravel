<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8"> <!-- Adjust this to fit your layout -->
          <div class="mt-5">

            <router-link to="/feedbacks/create" class="btn btn-info mb-3">Add New Feedback</router-link>

            <div class="card">
              <div class="card-header">
                Feedbacks
              </div>
              <div class="card-body">

               <table class="table">
                <thead class="text-center text-black">
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>User</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="text-center">

                    <tr v-if="feedbacks.length > 0" v-for="feedback in feedbacks" :key="feedback.id">
                        <td>{{ truncateText(feedback.title) }}</td>
                        <td>{{ feedback.category ? feedback.category.name: '' }}</td>
                        <td>{{ feedback.user ? feedback.user.name: '' }}</td>
                        <td><router-link :to="'feedbacks/show/' +feedback.id" style="text-decoration: none;">Leave comment</router-link></td>
                        <!-- Add more columns here if needed -->
                    </tr>

                    <tr v-else>
                        <td colspan="4" class="text-danger text-bold"><b>No feedback found.</b></td>
                    </tr>

                </tbody>
               </table>


               <nav class="pagination-container" v-if="feedbacks.length > 0">
                    <ul class="pagination">
                        <li v-if="pagination.prev_page_url">
                            <a @click.prevent="fetchPaginatedData(pagination.prev_page_url)" href="#" style="text-decoration: none;">Previous</a> &nbsp;
                        </li>
                        <li v-else>
                            <span>Previous</span> &nbsp;
                        </li>
                        <li v-if="pagination.next_page_url">
                            <a @click.prevent="fetchPaginatedData(pagination.next_page_url)" href="#" style="text-decoration: none;">Next</a> &nbsp;
                        </li>
                        <li v-else>
                            <span>Next</span> &nbsp;
                        </li>
                    </ul>
               </nav>

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
        feedbacks: [],
        pagination: '',
      };
    },

    created() {
    },

    mounted() {

        this.loadFeedbacks();
        console.group(this.feedbacks)
        this.fetchPaginatedData('/api/feedbacks/my');
    },


    methods: {

        async loadFeedbacks() {

            try {
                const response = await axios.get('/api/feedbacks/my');

                if (response.status === 200) {
                    this.feedbacks = response.data.feedbacks; // Set the success message
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

        fetchPaginatedData(url) {
          axios.get(url)
            .then(response => {
                this.feedbacks = response.data.data;
                this.pagination = response.data;

              console.log(this.pagination)
            })
            .catch(error => {
              console.error('There was an error!', error);
            });
        },

        truncateText(str) {
            // Check if the str length exceeds 20 characters
            if (str.length > 15) {
                return str.substring(0, 15) + '...';
            }
            else {
                return str;
            }
        }
    }

  };
</script>

<style scoped>
.pagination-container {
  display: flex;
  justify-content: flex-end;
}
</style>

