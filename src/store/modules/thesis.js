const state = {
  thesisList: []
}

const mutations = {
  set_thesisList: (state, thesisList) => {
    state.thesisList = thesisList
  },
  delete_thesisList: (state) => {
    state.thesisList = []
  }
}

const actions = {
  setThesisList({ commit }, thesisList) {
    return new Promise((resovle, reject) => {
      commit('set_thesisList', thesisList)
      resovle()
    }).catch(console.error())
  },
  deleteThesisList({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_thesisList')
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
