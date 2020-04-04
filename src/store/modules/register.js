const state = {
  register: {}
}

const mutations = {
  set_register: (state, register) => {
    state.register = register
  },
  delete_register: (state) => {
    state.register = {}
  }
}

const actions = {
  setRegister({ commit }, register) {
    return new Promise((resovle, reject) => {
      commit('set_register', register)
      resovle()
    }).catch(console.error())
  },
  deleteRegister({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_register')
      resovle()
    }).catch(console.error())
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
