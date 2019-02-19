import Vue from 'vue'
import App from './App.vue'
import store from './stores'

// CSS framework and FA
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
