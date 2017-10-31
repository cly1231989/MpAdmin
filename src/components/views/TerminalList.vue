<template>
  <div>
    <edit-terminal-modal
      v-if="showEditTerminalModal"
      :terminalNumber="selectTerminal"
      :terminalId="selectTerminalId"
      @editTerminalOk="onEditTerminalOk"
      @close="showEditTerminalModal = false">
    </edit-terminal-modal>

    <section class='content'>
      <div class='row center-block'>
        <div class='col-md-12 white-bg'>
          <filter-bar search-text-place-holder="请输入终端编号"
                      :show-new-btn="true"
                      new-btn-title="新增终端">
          </filter-bar>
          <vuetable ref="vuetable"
            api-url="http://localhost:8080/terminal/search"
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
                  @click="onEditTerminal(props.rowData, props.rowIndex)">
                  <i class="fa fa-pencil-square-o"></i>
                </button>
                <button class="btn btn-xs btn-danger"
                  @click="onDelTerminal(props.rowData, props.rowIndex)">
                  <i class="fa fa-times"></i>
                </button>
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
import EditTerminalModal from './EditTerminalModal'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)

export default {
  name: 'terminals',
  components: {
    Vuetable,
    VuetablePaginationBootstrap,
    VuetablePaginationInfo,
    EditTerminalModal
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
    this.$events.$on('new-item', e => this.onNewTerminal())
  },
  data () {
    return {
      selectTerminal: '',
      selectTerminalId: 0,
      showEditTerminalModal: false,
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
          name: 'username',
          title: '用户名'
          // sortField: 'name',
          // titleClass: 'center aligned',
          // dataClass: 'right aligned',
          // callback: 'formatNumber',
          // visible: false
        },
        {
          name: 'terminalNum',
          title: '终端编号'
        },
        {
          name: 'patientname',
          title: '病人姓名'
        },
        {
          name: 'patientage',
          title: '年龄'
        },
        {
          name: 'patientsex',
          title: '性别'
        },
        {
          name: 'bindtime',
          title: '绑定时间'
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
    onEditTerminal (data, index) {
      window.console.log(data)
      this.selectTerminalId = data.terminalid
      this.selectTerminal = data.terminalNum
      this.showEditTerminalModal = true
      console.log(data.terminalNum, index)
    },
    onDelTerminal (data, index) {

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
    onNewTerminal () {
      this.selectUser = {type: null, account: '', name: '', pwd: '', parentuserid: null}
      this.accountReadOnly = false
      this.showEditTerminalModal = true
    },
    onEditTerminalOk (user) {
      this.showEditTerminalModal = false
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
