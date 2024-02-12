<template>

    <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary  bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Feedback App</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/feedbacks" class="nav-link">My Feedbacks</router-link>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <router-link to="/dashboard" v-if="isAuthenticated" class="btn btn-outline-success" type="submit"><span class="glyphicon glyphicon-home"></span> Dashboard</router-link> &nbsp;
        <router-link to="/logout" v-if="isAuthenticated" @click="logout" class="btn btn-outline-danger" type="submit"><span class="glyphicon glyphicon-log-out"></span> Logout</router-link>  &nbsp;
        <router-link to="/login" v-if="!isAuthenticated" class="btn btn-outline-primary" type="submit"><span class="glyphicon glyphicon-log-in"></span> Login</router-link>  &nbsp;
        <router-link to="/register" v-if="!isAuthenticated" class="btn btn-outline-info" type="submit"><span class="glyphicon glyphicon-user"></span> Sign Up</router-link>  &nbsp;
      </form>
    </div>
  </div>
</nav>


<div class="container">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
import axios from '../store/axios.js';
// import auth from '@/utils/auth';

export default {

    data() {
        return {
            // isLogin: false
        }
    },

    created () {

    },

    mounted() {

    // Set the default authorization header for Axios
    // if (authToken) {
    // axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    // console.log('inside set')
    // }

    // console.log(authToken)

    // console.log('checking')



        this.$store.dispatch('checkAuthentication')
        // .then(isAuthenticated => {
        //     this.isLogin = isAuthenticated;
        //     console.log('Authentication status:', isAuthenticated);
        // })
        // .catch(error => {
        //     console.error('Error fetching authentication status:', error);
        // });

        // console.log('state status is '+ this.$store.state.isAuthenticated)

        // console.log(this.$store.state.isAuthenticated);

        // console.log(this.$store.actions.dispatch('checkAuthentication'))
        // return this.$store.state.demo;
        // console.log(this.$store.dispatch('checkAuthentication'));
    },

    methods: {

        async logout() {
            try {

                await axios.post('/api/logout');
                this.$store.dispatch('logout');
                this.$router.push('/login');

            } catch (error) {
                console.error('Logout failed:', error);
            }
        },

    },

    computed: {
        isAuthenticated() {
            return this.$store.state.isAuthenticated;
        }
    },

}
</script>
