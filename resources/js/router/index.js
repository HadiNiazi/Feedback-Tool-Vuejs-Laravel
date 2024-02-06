import { createRouter, createWebHistory } from "vue-router";

import App from '../components/App.vue';
import Login from '../components/Auth/Login.vue';
// import Logout from '../components/Auth/Logout.vue';
import Register from '../components/Auth/Register.vue';

import Home from '../components/Home.vue';
import Dashboard from '../components/Dashboard.vue';
import NotFound from '../components/Errors/404.vue';


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

export default router;
