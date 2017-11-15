<template>
  <div>
    <section class='content'>
      <div class='row center-block'>
        <div class='col-md-12 white-bg'>

          <filter-bar search-text-place-holder="请输入病人姓名或者终端编号"
                      :show-new-btn="false"
                      new-btn-title="">
          </filter-bar>
    
          <vuetable ref="vuetable"
            :api-url="getDatasUrl"
            :fields="fields"
            pagination-path=""
            :per-page="20" 
            @vuetable:pagination-data="onPaginationData"
            :append-params="moreParams"
            :css="css.table">
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
import config from '../../config/index'

Vue.use(VueEvents)
Vue.component('filter-bar', FilterBar)

export default {
  name: 'terminals',
  components: {
    Vuetable,
    VuetablePaginationBootstrap,
    VuetablePaginationInfo
  },
  mounted () {
    this.$events.$on('filter-set', eventData => this.onFilterSet(eventData))
    this.$events.$on('filter-reset', e => this.onFilterReset())
    this.$events.$on('new-item', e => this.onNewTerminal())
  },
  data () {
    return {
      getDatasUrl: config.serverURI + '/datas',
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
          name: 'dataId',
          title: '数据ID'
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
          name: 'fileName',
          title: '文件名'
        },
        {
          name: 'dataType',
          title: '数据类型',
          callback: 'formatType'
        },
        {
          name: 'createData',
          title: '创建时间'
        },
        {
          name: 'endTime',
          title: '结束时间'
        },
        {
          name: 'patientName',
          title: '病人姓名'
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
    formatType (value) {
      switch (value) {
        case 0: return '波形'
        case 1: return '血压'
        case 2: return '事件'
        case 4: return '血氧'
      }
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

#bind-only {
  margin-top: 8px;
  margin-right: 20px;
}
</style>
