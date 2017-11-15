<template>
  <div>
    <edit-terminal-modal
      v-if="showEditTerminalModal"
      :terminalNumber="selectTerminal"
      :terminalId="selectTerminalId"
      @editTerminalOk="onEditTerminalOk"
      @close="showEditTerminalModal = false">
    </edit-terminal-modal>

    <confirm-modal
      title="删除"
      text="确定删除该终端？"
      v-if="showConfirmModal"
      @cancel="showConfirmModal = false"
      @confirm="onConfirm">
    </confirm-modal>

    <section class='content'>
      <div class='row center-block'>
        <div class='col-md-12 white-bg'>
          <div class='row'>
            <div class="col-md-10">
              <filter-bar search-text-place-holder="请输入终端编号"
                          :show-new-btn="true"
                          new-btn-title="新增终端">
              </filter-bar>
            </div>
            <div id="bind-only" class="pull-right">
              <label>
                <input type="checkbox" v-model="bindOnly"> 已绑定
              </label>
            </div>
          </div>      

          <vuetable ref="vuetable"
            :api-url="getTerminalsUrl"
            :fields="fields"
            pagination-path=""
            :per-page="20" 
            @vuetable:pagination-data="onPaginationData"
            :append-params="moreParams"
            :css="css.table">              
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
              info-class="pull-left">
            </vuetable-pagination-info>

            <vuetable-pagination-bootstrap ref="pagination" 
              class="pull-right"
              @vuetable-pagination:change-page="onChangePage">
            </vuetable-pagination-bootstrap>
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
import ConfirmModal from './ConfirmModal'
import api from '../../api'
import config from '../../config/index'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)

export default {
  name: 'terminals',
  components: {
    Vuetable,
    VuetablePaginationBootstrap,
    VuetablePaginationInfo,
    EditTerminalModal,
    ConfirmModal
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
    this.$events.$on('new-item', e => this.onNewTerminal())
  },
  data () {
    return {
      getTerminalsUrl: config.serverURI + '/terminals',
      bindOnly: false,
      showConfirmModal: false,
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
  watch: {
    bindOnly: function () {
      this.moreParams = Object.assign(this.moreParams, {'bind_only': this.bindOnly})
      console.log(this.moreParams)
      Vue.nextTick(() => this.$refs.vuetable.refresh())
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
      this.selectTerminalId = data.terminalid
      this.showConfirmModal = true
      console.log('this.showConfirmModal: ' + this.showConfirmModal)
    },
    onConfirm () {
      api.request('delete', '/terminals/' + this.selectTerminalId, null)
        .then(response => {
          this.showConfirmModal = false
          Vue.nextTick(() => this.$refs.vuetable.refresh())
        })
        .catch(error => {
          console.log('delete terminal fail: ' + error)
        })
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
      this.selectTerminalId = 0
      this.selectTerminal = ''
      this.showEditTerminalModal = true
    },
    onEditTerminalOk (terNum) {
      this.showEditTerminalModal = false
      // Object.assign(this.selectTerminal, terNum)
      Vue.nextTick(() => this.$refs.vuetable.refresh())
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

#bind-only {
  margin-top: 8px;
  margin-right: 20px;
}
</style>
