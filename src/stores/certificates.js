import { certificates as API } from '@/API'

const ADD_CERTIFICATES = 'IRPSUCertify_ADD_CERTIFICATES'
const UPDATE_CERTIFICATE = 'IRPSUCertify_UPDATE_CERTIFICATE'
const REMOVE_CERTIFICATES = 'IRPSUCertify_REMOVE_CERTIFICATES'

export default {
  namespaced: true,
  state: {
    certificates: []
  },
  mutations: {
    [ADD_CERTIFICATES] (state, item) {
      state.certificates.push(item)
    },
    [UPDATE_CERTIFICATE] (state, {number, name, soname, phname, birthday}) {
      let index = state.certificates.findIndex(item => item.number === number)
      state.certificates[index].name = name
      state.certificates[index].soname = soname
      state.certificates[index].phname = phname
      state.certificates[index].birthday = birthday
    },
    [REMOVE_CERTIFICATES] (state, number) {
      let index = state.certificates.findIndex(item => item.number === number)
      state.certificates.splice(index, 1)
    }
  },
  actions: {
    find ({commit, dispatch, state}, number) {
      if (state.certificates.some(item => item.number == number)) return
      else return dispatch(
        'apiWrapper',
        {cb: API.find, params: [number], auth: true},
        {root: true}
      ).then(res => {
        if (res.data.exist) commit(ADD_CERTIFICATES, res.data)
      })
    },
    add ({commit, dispatch}, {name, soname, phname, email, birthday}) {
      let number = '9905' + Math.round(Math.random() * 999999)
      return dispatch(
        'apiWrapper',
        {
          cb: API.add,
          params: [number, name, soname, phname, email, birthday],
          auth: true
        },
        {root: true}
      ).then(res => {
        console.log(res)
        commit(ADD_CERTIFICATES, res.data)
      })
    },
    update ({commit, dispatch}, {number, name, soname, phname, birthday}) {
      commit(UPDATE_CERTIFICATE, {number, name, soname, phname, birthday})
      return dispatch(
        'apiWrapper',
        {
          cb: API.update,
          params: [number, name, soname, phname, birthday],
          auth: true
        },
        {root: true}
      ).then(res => {
        commit(UPDATE_CERTIFICATE, {number, name, soname, phname, birthday})
      })
    },
    remove ({commit, dispatch}, number) {
      return dispatch(
        'apiWrapper',
        {cb: API.remove, params: [number], auth: true},
        {root: true}
      ).then(res => {
        commit(REMOVE_CERTIFICATES, number)
      })
    },
    activate ({commit, dispatch, state}, number) {
      return dispatch(
        'apiWrapper',
        {cb: API.activate, params: [number], auth: true},
        {root: true}
      ).then(res => {
        console.log(res)
        // if (res.data.exist) commit(ADD_CERTIFICATES, res.data)
      })
    }
  }
}
