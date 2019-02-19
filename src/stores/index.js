import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Modules
import app from './stores/app'
import certificates from './stores/certificates'
import session from './stores/session'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    certificates,
    session,
  },
  plugins: [
    createPersistedState({
      storage: window.localStorage,
      key: 'IRPSUCertifyLocalStorage',
      paths: ['session']
    })
  ]
})
