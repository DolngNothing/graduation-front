const state = {
  courseGrade: [],
  CE: {}
}

const mutations = {
  set_courseGrade: (state, courseGrade) => {
    state.courseGrade = courseGrade
  },
  delete_courseGrade: (state) => {
    state.courseGrade = []
  },
  set_CE: (state, CE) => {
    state.CE = CE
  },
  delete_CE: (state) => {
    state.CE = {}
  }
}

const actions = {
  setCoureGrade({ commit }, courseGrade) {
    return new Promise((resovle, reject) => {
      commit('set_courseGrade', courseGrade)
      resovle()
    }).catch(console.error())
  },
  deleteCourseGrade({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_courseGrade')
      resovle()
    }).catch(console.error())
  },
  setCE({ commit }, CE) {
    return new Promise((resovle, reject) => {
      commit('set_CE', CE)
      resovle()
    }).catch(console.error())
  },
  deleteCE({ commit }) {
    return new Promise((resovle, reject) => {
      commit('delete_CE')
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
