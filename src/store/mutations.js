export default {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USERID (state, userId) {
    state.userId = userId
  },
  SET_USERNAME (state, name) {
    state.userName = name
  },
  SET_TYPE (state, type) {
    state.type = type
  },
  SET_EXPIRE (state, expire) {
    state.expire = expire
  },
  SET_REFRESHTIMER (state, refreshTimer) {
    state.refreshTimer = refreshTimer
  }
}
