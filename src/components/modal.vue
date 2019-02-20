<template lang=pug>

.modal(:class="{'is-active': active}" @keyup.enter="$emit('action')")
  .modal-background(@click="toggle")
  .modal-card
    header.modal-card-head
      p.modal-card-title {{ title }}
      button.delete(aria-label='close' @click="toggle")
    section.modal-card-body
      slot
    footer.modal-card-foot
      button.button.is-primary(@click="$emit('action')") {{ actionTitle }}
      .buttons.is-right
        slot(name='buttons')

</template>


<script>
export default {
  name: 'Modal',
  props: [ 'title', 'actionTitle'],
  data () {
    return {
      active: false
    }
  },
  computed: {},
  methods: {
    toggle () {
      this.active = !this.active
    }
  }
}
</script>


<style scoped lang="sass">
@import '../assets/styles/variables'

</style>
