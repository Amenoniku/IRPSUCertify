import { session as API } from '@/API'

const UPDATE_TOKEN = 'IRPSUCertify_UPDATE_TOKEN'

export default {
  namespaced: true,
  state: {
    token: undefined,
    refreshToken: undefined
  },
  mutations: {
    [UPDATE_TOKEN] (state, {token, refreshToken}) {
      state.token = token
      state.refreshToken = refreshToken
    },
  },
  actions: {
    signin ({commit, dispatch}, {email, pass, clientId, clientSecret}) {
      return dispatch(
        'apiWrapper',
        {cb: API.signin, params: [email, pass, clientId, clientSecret]},
        {root: true}
      ).then(res => {
        let token = res.access_token
        let refreshToken = res.refresh_token
        commit(UPDATE_TOKEN, {token, refreshToken})
      })
    }
  }
}
