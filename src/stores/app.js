export default {
  actions: {
    apiWrapper ({rootState}, {cb, params = [], auth = false }) {
      let token = rootState.session.token
      if (auth) params.push(token)
      return cb.apply(null, params).then(res => {
        return res
      }).catch(err => {
        throw err
      })
    },}
}
