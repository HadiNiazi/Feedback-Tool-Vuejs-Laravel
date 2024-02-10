import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
    demo: 'Yes it is demo',
    isAuthenticated: false
  },
  mutations: {

    setAuthenticationStatus(state, isAuthenticated) {
      state.isAuthenticated = isAuthenticated;
    },

    clearAuthentication(state) {
        state.token = null;
        state.isAuthenticated = false;
        // Clear any other user-related state as needed
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
          console.error('Failed to fetch authentication status:', error);
          throw error; // Rethrow error to handle it in the component
        }
      },

      logout({ commit }) {

        // Clear any authentication-related state
        commit('clearAuthentication');
        // Optionally, perform any other cleanup tasks (e.g., clear local storage)
        localStorage.removeItem('auth_token'); // Example: Clear token from local storage
      }

  },
  getters: {
    getToken: state => state.token,
  }
});
