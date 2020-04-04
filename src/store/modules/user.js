const state = {
  user: {}
}

const mutations = {
  set_user: (state, user) => {
    state.user = user
  },
  delete_user: (state) => {
    state.user = {}
  },
  set_city: (state, city) => {
    state.city = city
  },
  set_district: (state, district) => {
    state.city = district
  }
}

const actions = {
  login({ commit }, user) {
    return new Promise((resovle, reject) => {
      commit('set_user', user)
      resovle()
    }).catch(console.error())
  },
  logout({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_user')
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
