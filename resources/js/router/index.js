import { createRouter, createWebHistory } from "vue-router";

import App from '../components/App.vue';
import Login from '../components/Auth/Login.vue';
// import Logout from '../components/Auth/Logout.vue';
import Register from '../components/Auth/Register.vue';

import Home from '../components/Home.vue';
import Dashboard from '../components/Dashboard.vue';
import NotFound from '../components/Errors/404.vue';

import FeedbackShow from '../components/Feedback/Show.vue';
import FeedbackCreate from '../components/Feedback/Create.vue';
import Feedbacks from '../components/Feedback/Index.vue';

import store from '../store/index.js';


const routes = [

    {
        path: '/:any',
        component: NotFound
    },

    {
        path: '/',
        component: Home
    },

    {
        path: '/register',
        name: 'register',
        component: Register
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard
    },

    {
        path: '/feedbacks/create',
        name: 'feedbacks.create',
        component: FeedbackCreate
    },

    {
        path: '/feedbacks/show/:id',
        name: 'feedbacks.show',
        component: FeedbackShow
    },

    {
        path: '/feedbacks',
        name: 'feedbacks',
        component: Feedbacks
    },

    // {
    //     path: '/logout',
    //     name: 'logout',
    //     component: Logout
    // },

];

const router = createRouter({

    history: createWebHistory(),
    routes,

});


// router.beforeEach((to, from, next) => {
//     const isAuthenticated = store.state.isAuthenticated;

//     console.log(isAuthenticated)
//     // Check if the route requires authentication and user is not logged in
//     if (to.meta.requiresAuth && !isAuthenticated) {
//       // Redirect to login page
//       next('/login');
//     } else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) {
//       // Redirect to dashboard if user is already logged in and trying to access login or register page
//       next('/dashboard');
//     } else {
//       // Continue navigation
//       next();
//     }
//   });


export default router;
