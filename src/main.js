// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import { subDomain } from '../config/deploy.env'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'
import auth from './auth'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

Vue.use(VueRouter)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  scrollBehavior: function (to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Check local storage to handle refreshes
if (window.localStorage) {
  window.console.log('refresh...')
  var token = auth.getToken()
  if (token !== null) {
    window.console.log('token: ' + token)
    auth.saveAuthInfo(token, false)
  }
  // var localUserString = window.localStorage.getItem('user') || 'null'
  // var localUser = JSON.parse(localUserString)

  // if (localUser && store.state.user !== localUser) {
  //   store.commit('SET_USER', localUser)
  //   store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  // }
}

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  // window.console.log('Transition', transition)
  // window.console.log('to.meta.auth: ' + to.meta.auth)

  // if (store.state.token !== null) {
  //   window.console.log(store.state.token)
  // }

  window.console.log('store.state.expire: ' + store.state.expire)
  window.console.log('now: ' + Date.now())
  if (to.matched.some(record => record.meta.auth) && ((store.state.token === null) || (store.state.expire < Date.now()))) {
    window.console.log('Not authenticated')
    next({
      path: subDomain + '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})
