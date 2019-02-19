import { certificates as API } from '@/API'

const ADD_CERTIFICATES = 'IRPSUCertify_ADD_CERTIFICATES'
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
    [REMOVE_CERTIFICATES] (state, number) {
      let index = state.certificates.findIndex(item => item.number === number)
      state.certificates.splice(index, 1)
    }
  },
  actions: {
    find ({commit, dispatch}, number) {
      return dispatch(
        'apiWrapper',
        {cb: API.find, params: [number], auth: true},
        {root: true}
      ).then(res => {
        commit(ADD_CERTIFICATES, res.data)
      })
    },
    add ({commit, dispatch}, {number, name, soname, phname, email, birthday}) {
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
        commit(ADD_CERTIFICATES, res)
      })
    }
  }
}
