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

<style>
table.table-bordered{
  border:1px solid #C8C8C8;
  margin-top:20px;
}
table.table-bordered > thead > tr > th{
  border:1px solid #C8C8C8;
}
table.table-bordered > tbody > tr > td{
  border:1px solid #C8C8C8;
}
</style>
