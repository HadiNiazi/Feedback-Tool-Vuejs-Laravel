import { createRouter, createWebHistory } from "vue-router";

import App from '../components/App.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

import Home from '../components/Home.vue';



const routes = [

    {
        path: '/',
        component: App
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
        path: '/home',
        name: 'home',
        component: Home
    },

];

const router = createRouter({

    history: createWebHistory(),
    routes

});

export default router;
