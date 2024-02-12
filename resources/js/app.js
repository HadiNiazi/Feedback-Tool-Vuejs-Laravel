import './bootstrap';


import { createApp } from 'vue';

import App from './components/App.vue';

import router from './router/index.js';

import store from './store/index.js';

const app = createApp(App);


// app.provide('store', store);

// axios.defaults.headers.common["Authorization"] = 'Bearer '+ localStorage.getItem('auth_token');


app.use(router);
app.use(store);

app.mount('#app');
