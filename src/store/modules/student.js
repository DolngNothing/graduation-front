const state = {
  student: {}
}

const mutations = {
  set_student: (state, student) => {
    state.student = student
  },
  delete_student: (student) => {
    state.student = {}
  }
}

const actions = {
  setStudent({ commit }, student) {
    return new Promise((resovle, reject) => {
      commit('set_student', student)
      resovle()
    }).catch(console.error())
  },
  deleteStudent({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_student')
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
