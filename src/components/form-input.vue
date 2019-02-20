<template lang=pug>

.c-form-input.field
  label.label {{ label }}
  p.control(
    :class=`{
      'has-icons-left': iconLeft,
      'has-icons-right': iconRight
    }`
    @click="(e) => $emit('click', e)"
  )
    input.input(
      :type='type'
      :disabled='disabled'
      :name='name'
      :placeholder="placeholder"
      :value='value'
      @input='update($event.target.value)'
      :class=`{
        'is-danger': warn
      }`
    )
    span.icon.is-small.is-left(v-if='iconLeft')
      i(:class='iconLeft')
    span.icon.is-small.is-right(v-if='iconRight')
      i(:class='iconRight')
  p.help(v-if='help') {{ help }}
  p.help.is-danger(v-if='warn') {{ warn }}

</template>


<script>

export default {
  name: 'FormInput',
  props: {
    type: {default: 'text'},
    name: {default: ''},
    disabled: {type: Boolean},
    value: {default: null},
    label: String,
    placeholder: String,
    warn: String,
    help: String,
    iconLeft: Array,
    iconRight: Array
  },
  methods: {
    update(value) {
      this.$emit('input', value)
    }
  }
}
</script>


<style lang="sass">

.c-form-input
  margin-bottom: .7rem
  p
    margin-bottom: 0 !important

</style>
