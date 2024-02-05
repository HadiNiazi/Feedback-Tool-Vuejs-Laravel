import { createRouter, createWebHistory } from "vue-router";

import App from '../components/App.vue';
import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

import Home from '../components/Home.vue';
import Dashboard from '../components/Dashboard.vue';



const routes = [

    {
        path: '/',
        component: App
    },


    {
        path: '/api/register',
        name: 'register',
        component: Register
    },

    {
        path: '/api/login',
        name: 'login',
        component: Login
    },

    {
        path: '/api/home',
        name: 'home',
        component: Home
    },

    {
        path: '/api/dashboard',
        name: 'dashboard',
        component: Dashboard
    },

];

const router = createRouter({

    history: createWebHistory(),
    routes

});

export default router;
