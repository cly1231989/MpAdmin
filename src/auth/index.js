import jwtDecode from 'jwt-decode'
import axios from 'axios'
import store from '../store'

export default {
  saveAuthInfo (token, saveToLocalStorage) {
    // Vue.http.headers.common['Authorization'] = 'Bearer ' + token
    axios.defaults.headers.common['header1'] = 'Bearer ' + token

    var userInfo = jwtDecode(token)
    window.console.log('userInfo.name: ' + userInfo.name)

    store.commit('SET_USER', userInfo.sub)
    store.commit('SET_USERID', userInfo.userId)
    store.commit('SET_USERNAME', userInfo.name)
    store.commit('SET_TOKEN', token)

    if (saveToLocalStorage && window.localStorage) {
      window.localStorage.setItem('jwt_token', token)
    }
  },

  clearAuthInfo () {
    // Vue.http.headers.common['Authorization'] = ''
    axios.defaults.headers.common['header1'] = ''

    store.commit('SET_USER', null)
    store.commit('SET_USERID', null)
    store.commit('SET_USERNAME', null)
    store.commit('SET_TOKEN', null)

    if (window.localStorage) {
      window.localStorage.setItem('jwt_token', null)
    }
  },

  getToken () {
    return window.localStorage.getItem('jwt_token')
  }
}
