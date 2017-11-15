<template>
  <div>
    <edit-user-modal
      :select-user="selectUser"
      :accountReadOnly="accountReadOnly"
      v-if="showEditUserModal"
      @editUserOk="onEditUserOk"
      @close="showEditUserModal = false">
    </edit-user-modal>

    <section class='content'>
      <div class='row center-block'>
        <div class='col-md-12 white-bg'>
          <filter-bar search-text-place-holder="请输入账号或者用户名"
                      :show-new-btn="true"
                      new-btn-title="新增用户">
          </filter-bar>
          <vuetable ref="vuetable"
            :api-url="getUsersUrl"
            :fields="fields"
            pagination-path=""
            :per-page="20"
            @vuetable:pagination-data="onPaginationData"
            :append-params="moreParams"
            :css="css.table"
          >
            <template slot="actions" scope="props">
              <div class="custom-actions">              
                <button class="btn btn-xs btn-primary"
                  @click="onEditUser(props.rowData, props.rowIndex)">
                  <i class="fa fa-pencil-square-o"></i>
                </button>
                <!--
                <button class="btn btn-xs btn-danger"
                  @click="onAction('delete-item', props.rowData, props.rowIndex)">
                  <i class="fa fa-times"></i>
                </button>!-->
              </div>
            </template>
          </vuetable>
          <div>
            <vuetable-pagination-info ref="paginationInfo"
              info-class="pull-left"
            ></vuetable-pagination-info>
            
            <vuetable-pagination-bootstrap ref="pagination" 
              class="pull-right"
              @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination-bootstrap>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vuetable from 'vuetable-2/src/components/Vuetable'
import VuetablePaginationInfo from 'vuetable-2/src/components/VuetablePaginationInfo'
import VuetablePaginationBootstrap from '../VuetablePaginationBootstrap'
import Vue from 'vue'
import FilterBar from '../FilterBar'
import VueEvents from 'vue-events'
import CssConfig from '../style'
import EditUserModal from './EditUserModal'
import config from '../../config/index'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)

export default {
  name: 'users',
  components: {
    Vuetable,
    VuetablePaginationBootstrap,
    VuetablePaginationInfo,
    EditUserModal
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
    this.$events.$on('new-item', e => this.onNewUser())
  },
  data () {
    return {
      selectUser: null,
      getUsersUrl: config.serverURI + '/users',
      accountReadOnly: true,
      showEditUserModal: false,
      css: CssConfig,
      moreParams: {},
      fields: [
        {
          name: '__sequence',
          title: '#',
          titleClass: 'center aligned',
          dataClass: 'right aligned'
        },
        {
          name: 'parentFullName',
          title: '上级用户'
        },
        {
          name: 'name',
          title: '用户名'
          // sortField: 'name',
          // titleClass: 'center aligned',
          // dataClass: 'right aligned',
          // callback: 'formatNumber',
          // visible: false
        },
        {
          name: 'account',
          title: '账号'
        },
        {
          name: 'pwd',
          title: '密码'
        },
        {
          name: 'phone',
          title: '电话'
        },
        {
          name: 'address',
          title: '地址'
        },
        {
          name: 'userType',
          title: '类型'
        },
        {
          name: 'spo2Warning',
          title: '血氧开关',
          callback: 'formatSwitch'
        },
        {
          name: 'btwarning',
          title: '体温开关',
          callback: 'formatSwitch'
        },
        {
          name: 'bpshowMode',
          title: '血压显示模式'
        },
        {
          name: '__slot:actions',   // <----
          title: '操作',
          titleClass: 'center aligned',
          dataClass: 'center aligned'
        }
      ]
    }
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
      this.$refs.paginationInfo.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    onEditUser (data, index) {
      window.console.log(data)
      this.selectUser = data
      this.accountReadOnly = true
      this.showEditUserModal = true
      console.log(data.name, index)
    },
    onFilterSet (filterText) {
      this.moreParams = {
        'filter': filterText
      }
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    onFilterReset () {
      this.moreParams = {}
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    onNewUser () {
      this.selectUser = {id: 0, type: null, account: '', name: '', pwd: '', parentuserid: null}
      this.accountReadOnly = false
      this.showEditUserModal = true
    },
    onEditUserOk (user) {
      this.showEditUserModal = false
      Object.assign(this.selectUser, user)
      Vue.nextTick(() => this.$refs.vuetable.refresh())
    },
    formatSwitch (value) {
      return value === false ? '关' : '开'
    }
  }
}
</script>

<style>
/* Using the bootstrap style, but overriding the font to not draw in
   the Glyphicons Halflings font as an additional requirement for sorting icons.

   An alternative to the solution active below is to use the jquery style
   which uses images, but the color on the images does not match adminlte.

@import url('/static/js/plugins/datatables/jquery.dataTables.min.css');
*/

@import url('/static/js/plugins/datatables/dataTables.bootstrap.css');

table.dataTable thead .sorting:after,
table.dataTable thead .sorting_asc:after,
table.dataTable thead .sorting_desc:after {
  font-family: 'FontAwesome';
}

table.dataTable thead .sorting:after {
  content: '\f0dc';
}

table.dataTable thead .sorting_asc:after {
  content: '\f0dd';
}

table.dataTable thead .sorting_desc:after {
  content: '\f0de';
}

.white-bg {
  background-color: #fff;
  padding-top: 20px;
}
</style>
