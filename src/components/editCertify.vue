<template lang=pug>

Modal.a-signin(
  title="Редактировать сертификат"
  actionTitle="Сохранить"
  ref="modal"
  @action="updateWrap"
)
  FormInput(
    type='text'
    v-model='name'
    name='name'
    placeholder='Имя'
    :warn='nameWarn'
  )
  FormInput(
    type='text'
    v-model='soname'
    name='soname'
    placeholder='Фамилия'
    :warn='sonameWarn'
  )
  FormInput(
    type='text'
    v-model='phname'
    name='phname'
    placeholder='Отчество'
    :warn='phnameWarn'
  )
  FormInput(
    type='date'
    v-model='birthday'
    name='birthday'
    :label='birthday'
    placeholder='дата рождения ребёнка ДД.ММ.ГГГГ'
    :warn='birthdayWarn'
  )

</template>


<script>
import moment from 'moment'
import { mapActions } from 'vuex'

import Modal from './modal'
import FormInput from './form-input'

export default {
  name: 'Signin',
  components: {
    Modal,
    FormInput
  },
  props: ['certify'],
  data () {
    return {
      name: '',
      soname: '',
      phname: '',
      birthday: ''
    }
  },
  computed: {
    nameWarn () {
      let isValid = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/.test(this.name)
      return isValid ? '' : 'Неверное имя'
    },
    sonameWarn () {
      let isValid = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/.test(this.soname)
      return isValid ? '' : 'Неверная Фамилия'
    },
    phnameWarn () {
      let isValid = /^[а-яА-ЯёЁ]+([ -]{1}[а-яА-ЯёЁ]+){0,3}$/.test(this.phname)
      return isValid ? '' : 'Неверное Отчество'
    },
    birthdayWarn () {
      return this.birthday ? '' : 'Неверное День Рожденье'
    },
    isValid () {
      return !(this.nameWarn || this.sonameWarn || this.phnameWarn || this.emailWarn || this.birthdayWarn)
    }
  },
  watch: {
    certify (v) {
      if (!v) return
      this.name = v.name
      this.soname = v.soname
      this.phname = v.phname
      this.birthday = moment(v.birthday).format('YYYY-MM-DD')
     }
  },
  methods: {
    toggle (url) {
      this.$refs.modal.toggle()
    },
    updateWrap () {
      if (!this.isValid) return
      this.update({
        number: this.certify.number,
        name: this.name,
        soname: this.soname,
        phname: this.phname,
        birthday: moment(this.birthday).format('DD.MM.YYYY')
      })
      this.toggle()
    },
    ...mapActions('certificates', {
      update: 'update'
    })
  }
}
</script>


<style scoped lang="sass">


</style>
