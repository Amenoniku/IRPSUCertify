<template lang="pug">

section#app.section
  .container
    figure.image.is-48x48.logo
      img(alt='Vue logo' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Vue.js_Logo.svg')
    a.signout.button(v-if='token' @click='signout') Выход
    Auth(v-if='!token')
    Certificates(v-else)

</template>

<script>
import { mapState, mapActions } from 'vuex'

import Auth from '@/components/auth'
import Certificates from '@/components/certificates'

export default {
  name: 'app',
  components: {
    Auth,
    Certificates
  },
  computed: {
    ...mapState('session', {
      token: state => state.token
    })
  },
  methods: {
    ...mapActions('session', {
      signout: 'signout'
    })
  }
}

</script>

<style lang="sass">
@import './assets/styles/index'

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  figure
    float: left
    animation: spin 30s linear infinite 
    animation-delay: 5000ms
  .signout
    float: right


@keyframes spin
  0%
    transform: rotate(0deg)
  5%
    transform: rotate(360deg)
  100%
    transform: rotate(360deg)

</style>
