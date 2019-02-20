<template lang=pug>

Modal.a-signin(
  title="Добавить сертификат"
  actionTitle="Добавить"
  ref="modal"
  @action="addWrap"
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
    type='text'
    v-model='email'
    name='email'
    placeholder='Email'
    :warn='emailWarn'
  )
  FormInput(
    type='date'
    v-model='birthday'
    name='birthday'
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
  data () {
    return {
      name: 'Имя',
      soname: 'Фамилия',
      phname: 'Отчество',
      email: 'foo@bar.ru',
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
    emailWarn () {
      let isValid = /^[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+(?:\.[А-яёЁa-zA-Z0-9!#$%&'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?\.)+[a-zA-Z0-9А-яёЁ](?:[a-zA-Z0-9-А-яёЁ]*[a-zA-Z0-9А-яёЁ])?$/.test(this.email)
      return isValid ? '' : 'Неверный Email'
    },
    birthdayWarn () {
      return this.birthday ? '' : 'Неверное День Рожденье'
    },
    isValid () {
      return !(this.nameWarn || this.sonameWarn || this.phnameWarn || this.emailWarn || this.birthdayWarn)
    }
  },
  methods: {
    toggle (url) {
      this.$refs.modal.toggle()
      if (url) this.$router.push(url)
    },
    addWrap () {
      if (!this.isValid) return
      this.add({
        name: this.name,
        soname: this.soname,
        phname: this.phname,
        email: this.email,
        birthday: moment(this.birthday).format('D.MM.YYYY')
      })
      this.toggle()
    },
    ...mapActions('certificates', {
      add: 'add',
      update: 'update'
    })
  }
}
</script>


<style scoped lang="sass">


</style>
