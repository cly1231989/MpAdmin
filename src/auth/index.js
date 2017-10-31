import jwtDecode from 'jwt-decode'
import axios from 'axios'
import store from '../store'
import api from '../api'

function saveAuthInfoImp (token, saveToLocalStorage) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  var userInfo = jwtDecode(token)
  window.console.log('userInfo.name: ' + userInfo.name)

  store.commit('SET_USER', userInfo.sub)
  store.commit('SET_USERID', userInfo.userId)
  store.commit('SET_USERNAME', userInfo.name)
  store.commit('SET_EXPIRE', userInfo.exp * 1000)
  store.commit('SET_TOKEN', token)
  store.commit('SET_TYPE', userInfo.type)

  if (saveToLocalStorage && window.localStorage) {
    window.localStorage.setItem('jwt_token', token)
  }
}

export default {
  saveAuthInfo (token, saveToLocalStorage) {
    saveAuthInfoImp(token, saveToLocalStorage)

    // todo: 开个定时器，刷新token
    var refreshTimer = setInterval(function () {
      window.console.log('refresh token')
      api.request('get', '/auth/refresh', null)
      .then(response => {
        var data = response.data
        if (!data.error) {
          window.console.log('refresh token: ', data.token)
          saveAuthInfoImp(data.token, true)
        }
      })
    }, 1000 * 30)
    store.commit('SET_REFRESHTIMER', refreshTimer)
  },

  clearAuthInfo () {
    // Vue.http.headers.common['Authorization'] = ''
    axios.defaults.headers.common['Authorization'] = ''

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
