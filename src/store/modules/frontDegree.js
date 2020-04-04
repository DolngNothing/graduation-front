const state = {
  frontDegree: {}
}

const mutations = {
  set_frontDegree: (state, frontDegree) => {
    state.frontDegree = frontDegree
  },
  delete_frontDegree: (state) => {
    state.frontDegree = {}
  }
}

const actions = {
  setFrontDegree({ commit }, frontDegree) {
    return new Promise((resovle, reject) => {
      commit('set_frontDegree', frontDegree)
      resovle()
    }).catch(console.error())
  },
  deleteFrontDegree({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_frontDegree')
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
