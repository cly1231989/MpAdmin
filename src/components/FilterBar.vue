<template>
  <div class="form-inline">
    <input type="text" class="form-control mb-2 mr-sm-2 mb-sm-0" v-model="filterText" @keyup.enter="doFilter" :placeholder="searchTextPlaceHolder">
    <button type="button" class="btn btn-primary" @click="doFilter">搜索</button>
    <button type="button" class="btn btn-default" @click="resetFilter">重置</button>
    <button type="button" class="btn btn-success" id="new-item" @click="newItem" v-if="showNewBtn">{{newBtnTitle}}</button>
  </div>
</template>

  <script>
  export default {
    props: {
      showNewBtn: {
        type: Boolean,
        default: false
      },
      newBtnTitle: {
        type: String,
        default: ''
      },
      searchTextPlaceHolder: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        filterText: ''
      }
    },
    methods: {
      doFilter () {
        this.$events.fire('filter-set', this.filterText)
      },
      resetFilter () {
        this.filterText = ''
        this.$events.fire('filter-reset')
      },
      newItem () {
        this.$events.fire('new-item')
      }
    }
  }
</script>

<style>
  div {
    margin-bottom: 10px
  }
  #new-item {
    margin-left: 20px
  }
</style>

