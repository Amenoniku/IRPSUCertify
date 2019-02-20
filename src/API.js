/* eslint-disable no-unused-vars, no-unused-lets, no-unneeded-ternary, curly */
import superagent from 'superagent'

const DEV_MODE = process.env.NODE_ENV === 'development'
const API_ROOT = DEV_MODE ? 'https://api-test.pfdo.ru:443' : window.location.origin
const API_VERSION = 1
const API_WITH_CREDENTIALS = true

export const
  session = {
    signin (username, password, clientId, clientSecret) {
      let payload = {
        grant_type: 'password',
        username,
        password,
        client_id: clientId,
        client_secret: clientSecret
      }
      return post('/oauth2/token', payload).then(generalSuccess, generalFailure)
    },
    refreshToken (refreshToken, clientId, clientSecret) {
      let payload = {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: clientId,
        client_secret: clientSecret
      }
      return post('/oauth2/token', payload).then(generalSuccess, generalFailure)
    }
  },
  certificates = {
    add (number, name, soname, phname, email, birthday, token) {
      let payload = {
        number,
        name,
        soname,
        phname,
        messages_email: email,
        birthday // ДД.ММ.ГГГГ
      }
      return post('/v2/certificates', payload, token).then(generalSuccess, generalFailure)
    },
    remove (number, token) {
      return del(`/v2/certificates/${number}`, undefined, token).then(generalSuccess, generalFailure)
    },
    find (number, token) {
      return get(`/v2/certificates/${number}`, undefined, token).then(generalSuccess, generalFailure)
    },
    update (number, name, soname, phname, birthday, token) {
      let payload = {
        name,
        soname,
        phname,
        birthday // ДД.ММ.ГГГГ
      }
      return put(`/v2/certificates/${number}/personal`, payload, token).then(generalSuccess, generalFailure)
    },
    activate (number, token) {
      let payload = {
        actual: 1
      }
      return put(`/v2/certificates/${number}/actual`, payload, token).then(generalSuccess, generalFailure)
    },
  }

/* @SECTION: Hundler functions */

function get (endpoint, payload, token, ignoreRoot) {
  if (payload !== undefined) throw new Error('GET payload should be undefined')
  return perform('GET', endpoint, undefined, token, ignoreRoot)
}

function head (endpoint, payload, token) {
  if (payload !== undefined) throw new Error('HEAD payload should be undefined')
  return perform('HEAD', endpoint, undefined, token)
}

function post (endpoint, payload, token) {
  return perform('POST', endpoint, payload, token)
}

function put (endpoint, payload, token) {
  return perform('PUT', endpoint, payload, token)
}

function del (endpoint, payload, token) {
  return perform('DELETE', endpoint, payload, token)
}

function perform (method, endpoint, payload, token, ignoreRoot) {
  return new Promise((resolve, reject) => {
    let lcMethod = {
      'GET': 'get',
      'HEAD': 'head',
      'POST': 'post',
      'PUT': 'put',
      'DELETE': 'del'
    }[method]

    let request = superagent.agent()

    let path = `${API_ROOT}${endpoint}`

    if (ignoreRoot) {
      request = request[lcMethod](endpoint)
    } else {
      request = request[lcMethod](path)
    }

    request = request.set('Accept', 'application/json')

    if (API_WITH_CREDENTIALS) request = request.withCredentials()
    if (payload !== undefined) request = request.send(payload)
    if (token !== undefined) request = request.set('Authorization', 'Bearer ' + token)

    request.end((err, response) => {
      let body = response.body
      let status = response.statusCode
      console.log(status)
      if (err) return reject(err)
      else return resolve(body)
    })
  })
}

function generalSuccess (result) {
  return result
}

function generalFailure (err) {
  throw err
}

export class CustomError {
  constructor (err) {
    this.msg = err.msg
    this.result = err.result
    this.errors = err.errors
    this.access = err.access
    this.name = 'CustomError'
    Object.setPrototypeOf(this, CustomError.prototype)
  }
}