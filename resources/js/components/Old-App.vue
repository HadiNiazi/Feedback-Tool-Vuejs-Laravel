<template>
    <div>
        <nav class="navbar navbar-inverse">
            <div class="container-fluid">
                <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="#">Feedback App</a>
                </div>
                <div class="collapse navbar-collapse" id="myNavbar">
                <ul class="nav navbar-nav">
                    <li class="active"><a href="#">Home</a></li>
                    <li><a href="#">Page 1</a></li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li v-if="isAuthenticated"><router-link to="/dashboard"></router-link></li>
                    <li v-if="isAuthenticated"><a @click="logout"></a></li>
                    <li v-if="!isAuthenticated"><router-link to="/login"></router-link></li>
                    <li v-if="!isAuthenticated"><router-link to="/register"></router-link></li>
                </ul>
                </div>
            </div>
        </nav>

        <div class="container">
            <router-view></router-view>
        </div>
    </div>
    </template>



<script>
import axios from 'axios';
// import auth from '@/utils/auth';

export default {

    data() {
        return {
            isLogin: false
        }
    },

    created () {
        axios.defaults.headers.common["Authorization"] = 'Bearer '+ localStorage.getItem('auth_token');
    },

    mounted() {

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

        logout() {
            this.$store.dispatch('logout');

            this.$router.push('/login');

            // this.$store.dispatch('logout')
            // .then(isAuthenticated => {
            //     this.isLogin = isAuthenticated;
            //     console.log('Logout status:', isAuthenticated);
            // })
            // .catch(error => {
            //     console.error('Logout status:', error);
            // });

        // Optionally, redirect to login page or perform other actions after logout
        }

        // async logout() {
        //     try {
        //     await axios.post('/api/logout');
        //     // Clear local storage, update state, etc.
        //     // auth.logout();
        //     this.isLogin = false;
        //     this.isAuthenticated = false
        //     console.log('Logged out successfully');
        //     this.$router.push('/login'); // Redirect to login page
        //     } catch (error) {
        //         console.error('Logout failed:', error);
        //     }
        // },

    },

    computed: {
        isAuthenticated() {
            // return this.$store.state.demo;

            return this.$store.state.isAuthenticated;
        }
    },

}
</script>


<style>
</style>
