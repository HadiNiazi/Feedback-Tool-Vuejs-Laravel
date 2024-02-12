import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: localStorage.getItem('authToken') || '',
    isAuthenticated: false
  },
  mutations: {

    setAuthenticationStatus(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },

    clearAuthentication(state) {
        state.token = null;
        state.isAuthenticated = false;

        // localStorage.removeItem('auth_token');
    },

    setToken (state, token) {
        state.token = token;
        localStorage.setItem('auth_token', token);
    }

  },
  actions: {

    async checkAuthentication({ commit }) {
        try {
          const response = await axios.get('/api/auth-check');
          const isAuthenticated = response.data.authenticated;
          commit('setAuthenticationStatus', isAuthenticated);
          return isAuthenticated; // Return authentication status
        } catch (error) {
        //   console.error('Failed to fetch authentication status:', error);
        //   throw error; // Rethrow error to handle it in the component
        }
    },

    setAuthToken({ commit }, token) {
        commit('setToken', token);
        commit('setAuthenticationStatus', true);
    },

    logout({ commit }) {

        commit('clearAuthentication');
        // Optionally, perform any other cleanup tasks (e.g., clear local storage)
        localStorage.removeItem('auth_token'); // Example: Clear token from local storage
        delete axios.defaults.headers.common['Authorization']
    }

  },
  getters: {
    getToken: state => state.token,
    getAuthenticatedStatus: state => state.isAuthenticated,
  }
});
