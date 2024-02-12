import { createRouter, createWebHistory } from "vue-router";

import Login from '../components/Auth/Login.vue';
import Register from '../components/Auth/Register.vue';

import Home from '../components/Home.vue';
// import Dashboard from '../components/Dashboard.vue';
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
        component: Feedbacks,
        meta: { requiresAuth: true },
    },

    {
        path: '/feedbacks/create',
        name: 'feedbacks.create',
        component: FeedbackCreate,
        meta: { requiresAuth: true },
    },

    {
        path: '/feedbacks/show/:id',
        name: 'feedbacks.show',
        component: FeedbackShow,
        meta: { requiresAuth: true },
    },

    // {
    //     path: '/feedbacks',
    //     name: 'feedbacks',
    //     component: Feedbacks,
    //     meta: { requiresAuth: true },
    // }

];

const router = createRouter({

    history: createWebHistory(),
    routes,
    linkActiveClass: 'active'

});


router.beforeEach((to, from, next) => {

    const isAuthenticated = store.state.isAuthenticated;

    if (to.meta.requiresAuth && !isAuthenticated) {

      next('/login');

    }
    // else if ((to.name === 'login' || to.name === 'register') && isAuthenticated ) {

    //   next('/dashboard');

    // }
    else {

        console.log(isAuthenticated)

      next();
    }
});


export default router;
