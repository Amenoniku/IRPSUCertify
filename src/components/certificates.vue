<template lang="pug">

.certificates
  .title Сертификаты
  //- add Certificate
  .content
    .field.has-addons
      .control
        input.input(
          type='text'
          v-model='sNumber'
          placeholder='Номер сиртификата')
      .control
        a.button.is-primary
          i.fas.fa-search
  //- list of Certificates
  .content
    .columns
      .column(v-for='item in 5')
        .box
          p.title.is-5 Narrow column {{ item }}
          p.subtitle This column is only 200px wide.

  .content
    a.button.is-primary Добавить сертификат

</template>


<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Certificates',
  data () {
    return {
      sNumber: ''
    }
  }
}
</script>


<style scoped lang="sass">
@import '../assets/styles/variables.sass'

@mixin n-columns($min-width, $last-equal: false, $max-cols: 5)
  .columns
    display: flex
    flex-wrap: wrap
    .column
      flex: 1 0 $min-width

      @if $last-equal
        @for $i from 2 through $max-cols
          $screen-width: ($min-width*$i)
          $column-width: (100%/$i)
          @media (min-width: $screen-width)
            max-width: calc(#{$column-width})

        $column-width: (100%/$max-cols)
        @media (min-width: $min-width*$max-cols)
            min-width: calc(#{$column-width})

@include n-columns(200px, true, 5)


</style>
