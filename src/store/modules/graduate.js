const state = {
  graduate: {},
  graduateList: [],
  graduateCard: {},
  graduateApply: {},
  schoolList: [],
  majorList: [],
  graduateListInYear: [],
  graduateListForAll: [],
  city: {},
  district: [],
  citys: []
}

const mutations = {
  set_graduate: (state, graduate) => {
    state.graduate = graduate
  },
  set_city: (state, city) => {
    state.city = city
  },
  set_citys: (state, citys) => {
    state.citys = citys
  },
  set_district: (state, district) => {
    state.district = district
  },
  set_graduateList: (state, graduateList) => {
    state.graduateList = graduateList
  },
  set_graduateListInYear: (state, graduateListInYear) => {
    state.graduateListInYear = graduateListInYear
  },
  set_graduateListForAll: (state, graduateListForAll) => {
    state.graduateListForAll = graduateListForAll
  },
  set_schoolList: (state, schoolList) => {
    state.schoolList = schoolList
  },
  set_majorList: (state, majorList) => {
    state.majorList = majorList
  },
  set_graduateCard: (state, graduateCard) => {
    state.graduateCard = graduateCard
  },
  dele_graduateCertify: (state) => {
    state.graduateList = []
    state.graduateCard = {}
  },
  set_graduateApply: (state, graduateApply) => {
    state.graduateApply = graduateApply
  },
  dele_graduateApply: (state) => {
    state.graduateApply = {}
  }
}

const actions = {
  setGraduate({ commit }, graduate) {
    return new Promise((resovle, reject) => {
      commit('set_graduate', graduate)
      resovle()
    }).catch(console.error())
  },
  setCity({ commit }, city) {
    return new Promise((resovle, reject) => {
      commit('set_city', city)
      resovle()
    }).catch(console.error())
  },
  setCitys({ commit }, citys) {
    return new Promise((resovle, reject) => {
      commit('set_citys', citys)
      resovle()
    }).catch(console.error())
  },
  setDistrict({ commit }, district) {
    return new Promise((resovle, reject) => {
      commit('set_district', district)
      resovle()
    }).catch(console.error())
  },
  setGraduateList({ commit }, graduateList) {
    return new Promise((resovle, reject) => {
      commit('set_graduateList', graduateList)
      resovle()
    }).catch(console.error())
  },
  setSchoolList({ commit }, schoolList) {
    return new Promise((resovle, reject) => {
      commit('set_schoolList', schoolList)
      resovle()
    }).catch(console.error())
  },
  setGraduateListForAll({ commit }, graduateListForAll) {
    return new Promise((resovle, reject) => {
      commit('set_graduateListForAll', graduateListForAll)
      resovle()
    }).catch(console.error())
  },
  setMajorList({ commit }, majorList) {
    return new Promise((resovle, reject) => {
      commit('set_majorList', majorList)
      resovle()
    }).catch(console.error())
  },
  setGraduateCard({ commit }, graduateCard) {
    return new Promise((resovle, reject) => {
      commit('set_graduateCard', graduateCard)
      resovle()
    }).catch(console.error())
  },
  clearGraduateCertify({ commit }) {
    return new Promise((resovle, reject) => {
      commit('dele_graduateCertify')
      resovle()
    }).catch(console.error())
  },
  setGraduateApply({ commit }, graduateApply) {
    return new Promise((resovle, reject) => {
      commit('set_graduateApply', graduateApply)
      resovle()
    }).catch(console.error())
  },
  clearGraduateApply({ commit }) {
    return new Promise((resovle, reject) => {
      commit('dele_graduateApply')
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
