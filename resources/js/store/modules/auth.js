const state = {
    token: null,
    demo: 'Yes it is demo'
  };

  const mutations = {
    SET_TOKEN(state, token) {
      state.token = token;
    },
  };

  const actions = {
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
  };

  const getters = {
    getToken: state => state.token,
  };

  export default {
    state,
    mutations,
    actions,
    getters,
  };
