<template lang="pug">

.auth.content
  .title Авторизация
  .field
    p.control.has-icons-left.has-icons-right
      input.input(
        type='email'
        v-model='email'
        placeholder='Email'
      )
      span.icon.is-small.is-left
        i.fas.fa-envelope
      //- span.icon.is-small.is-right
      //-   i.fas.fa-check
  .field
    p.control.has-icons-left
      input.input(
        type='password'
        v-model='pass'
        placeholder='Password'
      )
      span.icon.is-small.is-left
        i.fas.fa-lock
  .field
    p.control
      button.button.is-success(@click=`signin({
        email,
        pass,
        clientId,
        clientSecret
      })`)
        | Login

</template>


<script>
import { mapActions } from 'vuex'

export default {
  name: 'Auth',
  data () {
    return {
      email: 'candidate_api_manager',
      pass: 'Us3oUs3M5M',
      clientId: 'candidate_app',
      clientSecret: 'vuejsispower'
    }
  },
  methods: {
    ...mapActions('session', {
      signin: 'signin'
    })
  }
}
</script>


<style lang="sass">
@import '../assets/styles/variables.sass'

</style>
