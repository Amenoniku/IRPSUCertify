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
        a.button.is-primary(@click='find(sNumber)')
          i.fas.fa-search
  //- list of Certificates
  .content
    .columns(v-if='certificates.length')
      .column(v-for='item in certificates')
        .box
          .content
            span
              strong Тип сертификата: 
              | {{ item.cert_group_name }}
            br
            span
              strong Номер: 
              | {{ item.number }}
            br
            span
              strong Имя: 
              | {{ item.name }}
            br
            span
              strong Фамилия: 
              | {{ item.phname }}
            br
            span
              strong Отчество: 
              | {{ item.soname }}
            br
            span
              strong Состояние: 
              | {{ item.actual === 1 ? 'Активированный' : 'Неактивированный' }}
          .buttons.has-addons.is-centered(v-if='item.actual !== 1')
            a.button.is-primary(@click='edit(item)')
              span.icon.is-small
                i.fas.fa-edit
            a.button.is-primary(title='Активировать' @click='activate(item.number)')
              span.icon.is-small
                i.fas.fa-chart-line
            a.button.is-primary(@click='remove(item.number)')
              span.icon.is-small
                i.fas.fa-trash-alt

    .subtitle(v-else) Нет добавленных или найденных сертификатов
  .content
    a.button.is-primary(@click='openAddCertfy') Добавить сертификат

  AddCertify(ref='addCertify')

</template>


<script>
import { mapActions, mapState } from 'vuex'

import AddCertify from './addCertify'

export default {
  name: 'Certificates',
  components: {
    AddCertify
  },
  data () {
    return {
      sNumber: '9905000001'
    }
  },
  computed: {
    ...mapState('certificates', {
      certificates: state => state.certificates
    })
  },
  methods: {
    edit (item) {

    },
    openAddCertfy () {
      this.$refs.addCertify.toggle()
    },
    ...mapActions('certificates', {
      find: 'find',
      remove: 'remove',
      activate: 'activate'
    })
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

@include n-columns(300px, true, 5)

.unactive
  transform: rotate(180deg)

</style>
