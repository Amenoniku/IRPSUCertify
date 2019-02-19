import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Modules
import app from './app'
import certificates from './certificates'
import session from './session'

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
