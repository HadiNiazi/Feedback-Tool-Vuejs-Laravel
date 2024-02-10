<template>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-10">
          <!-- Adjust this to fit your layout -->
          <div class="mt-5">
            <router-link to="/dashboard" class="btn btn-info mb-3">Go Back</router-link>
            <div class="container">
              <h6 class="mt-4 mb-2">Feedback Details</h6>
              <!-- Feedback Details -->
              <div class="card mb-3">
                <div class="card-body">
                  <h6 class="card-title">{{ feedback.title }}</h6>
                  <p class="card-text">{{ feedback.description }}</p>
                </div>
              </div>
              <!-- New Comment Form -->
              <div>
                <h6 class="mt-5">Add a Comment</h6>
                <!-- Display validation errors -->
                <div v-if="errors.length">
                  <ul>
                    <li v-for="error in errors" :key="error" class="text-danger">{{ error }}</li>
                  </ul>
                </div>
                <form @submit.prevent="submitComment">
                  <div class="mb-3">
                    <textarea class="form-control" id="commentContent" ref="commentInput" @input="handleInput" v-model="newComment" placeholder="write comment here..." required></textarea>
                    <ul v-if="showSuggestions && !suggestionClicked" class="list-group">
                      <li v-for="user in filteredUsers" :key="user.id" class="list-group-item" @click="mentionUser(user)">
                        {{ user.name }}
                      </li>
                    </ul>
                  </div>
                  <button type="submit" class="btn btn-primary">Comment</button>
                </form>
              </div>
              <div>
                <h6 class="mt-5">Comments</h6>
                <div v-if="comments.length === 0">
                  <p>No comments yet.</p>
                </div>
                <div v-else>
                  <div v-for="comment in comments" :key="comment.id" class="card mb-3">
                    <div class="card-body">
                      <h6 class="card-subtitle mb-2 text-muted">{{ comment.user.name }} - {{ formatDate(comment.created_at) }}</h6>
                      <p class="card-text" v-html="highlightMentions(comment.comment)"></p>
                    </div>
                  </div>
                </div>
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
          feedbackId: '',
          feedback: {},
          newComment: '',
          comments: [],
          errors: [],
          showSuggestions: false,
          suggestionClicked: false,
          filteredUsers: [],
          users: []
        };
      },
      created() {
        this.feedbackId = this.$route.params.id;
      },
      mounted() {
        this.loadFeedbackDetails();
        this.loadFeedbackComments();
        this.loadUsers();
      },
      methods: {
        submitComment() {
          axios.post('/api/feedbacks/comments/store', {
            feedback_id: this.feedback.id,
            comment: this.newComment
          }).then(response => {
            this.comments.unshift(response.data.comment);
            this.newComment = '';
            this.suggestionClicked = false;
            this.showSuggestions = false;
          }).catch(error => {
            if (error.response) {
              if (error.response.status === 422) {
                this.errors = Object.values(error.response.data.errors).flat();
              }
            } else {
              this.errors = error;
            }
            console.error('There was an error posting the comment:', error);
          });
          this.loadFeedbackComments();
          this.newComment = '';
        },
        formatDate(dateString) {
          return new Date(dateString).toLocaleString();
        },
        loadFeedbackDetails() {
          axios.get(`/api/feedbacks/show/${this.feedbackId}`).then(response => {
            this.feedback = response.data;
            console.log(this.feedback)
          }).catch(error => {
            console.error('There was an error!', error);
          });
        },
        loadFeedbackComments() {
          axios.get(`/api/feedbacks/comments/${this.feedbackId}`).then(response => {
            this.comments = response.data;
            console.log(this.comments)
          }).catch(error => {
            console.error('There was an error!', error);
          });
        },
        loadUsers() {
          axios.get(`/api/users`).then(response => {
            this.users = response.data;
            console.log(this.users)
          }).catch(error => {
            console.error('There was an error!', error);
          });
        },
        highlightMentions(text) {
          const mentionRegex = /@(\w+)/g;
          return text.replace(mentionRegex, '<span class="mention">$&</span>');
            },
            handleInput() {
              const matches = this.newComment.match(/@([^\s@]+)/gi);
              if (matches && matches.length > 0) {
                const username = matches[0].substr(1);
                this.filteredUsers = this.users.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
                this.showSuggestions = this.filteredUsers.length > 0;
              } else {
                this.showSuggestions = false;
              }
            },
            mentionUser(user) {
              const mention = `@${user.username} `;
              this.newComment = this.newComment.replace(/@\w+\s*$/, mention);
              this.$refs.commentInput.focus();
              this.showSuggestions = false;
              this.suggestionClicked = true;
            }
        }
      };
  </script>
  <style>
    .mention {
      color: #644CC6;
      font-weight: bold;
    }
  </style>
