// const state = {
//     token: null,
//     demo: 'Yes it is demo',
//     isAuthenticated: false
//   };

//   const mutations = {

//     // SET_TOKEN(state, token) {
//     //   state.token = token;
//     // },

//     setAuthenticationStatus(state, isAuthenticated) {
//         state.isAuthenticated = isAuthenticated;
//     }

//   };

//   const actions = {

//     // setToken({ commit }, token) {
//     //   commit('SET_TOKEN', token);
//     // },

//     async checkAuthentication({ commit }) {
//         try {
//           const response = await axios.get('/api/auth-check');
//           commit('setAuthenticationStatus', response.data.authenticated);
//         } catch (error) {
//           console.error('Failed to fetch authentication status:', error);
//         }
//     }

//   };

//   const getters = {
//     getToken: state => state.token,
//   };

//   export default {
//     state,
//     mutations,
//     actions,
//     getters,
//   };
