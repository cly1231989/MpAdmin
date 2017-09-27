<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {
    name: 'App',
    data () {
      return {
        section: 'Head'
      }
    },
    methods: {
      logout () {
        clearInterval(this.$store.refreshTimer)
        auth.clearAuthInfo()
        this.$router.push('/login')
      }
    }
  }
</script>
