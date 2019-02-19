<template lang="pug">

section#app.section
  .container
    figure.image.is-48x48
      img(alt='Vue logo' src='./assets/logo.png')
    Auth(v-if='!token')
    Certificates(v-else)

</template>

<script>
import { mapState } from 'vuex'

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

</style>
