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
      button.button.is-success
        | Login

</template>


<script>
// import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'Auth',
  data () {
    return {
      email: '',
      pass: ''
    }
  }
}
</script>


<style lang="sass">
@import '../assets/styles/variables.sass'

</style>
