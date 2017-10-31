<template>
  <section class='content'>
    <div class='row center-block'>
      <h2>用户列表</h2>
      <div class='col-md-12'>
        <div class='box'>
          <div class='box-body'>
            <div class='dataTables_wrapper form-inline dt-bootstrap' id='example1_wrapper'>
              <div class='row'>
                <div class='col-sm-12 table-responsive'>
                  <table role='grid' id='example1' class='table table-bordered table-striped dataTable'>
                    <thead>
                      <tr role='row'>
                        <th aria-sort='ascending' class='sorting_asc'>索引</th>
                        <th>用户</th>
                        <th>姓名</th>
                        <th>年龄</th>
                        <th>性别</th>
                        <th>门诊号</th>
                        <th>住院号</th>
                        <th>床号</th>
                        <th>症状</th>
                        <th>申请医生</th>
                        <th>护士</th>
                        <th>护理等级</th>
                        <th>费别</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class='even' role='row'>
                        <td class='sorting_1'>Blink</td>
                        <td>Iridium  54.0</td>
                        <td>GNU/Linux</td>
                        <td>54</td>
                        <td>A</td>
                        <td>Iridium  54.0</td>
                        <td>GNU/Linux</td>
                        <td>54</td>
                        <td>A</td>
                        <td>Iridium  54.0</td>
                        <td>GNU/Linux</td>
                        <td>54</td>
                        <td>A</td>
                      </tr>
                    </tbody>              
                  </table>
                </div>
              </div>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from 'jquery'
// Require needed datatables modules
import 'datatables.net'
import 'datatables.net-bs'
import store from '../../store'

export default {
  name: 'users',
  mounted () {
    this.$nextTick(() => {
      $('#example1').DataTable({
        'oLanguage': {
          'sProcessing': '正在加载中......',
          'sLengthMenu': '每页显示 _MENU_ 条记录',
          'sZeroRecords': '对不起，查询不到相关数据！',
          'sEmptyTable': '表中无数据存在！',
          'sInfo': '当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录',
          'sInfoFiltered': '数据表中共为 _MAX_ 条记录',
          'sSearch': '搜索',
          'oPaginate': {
            'sFirst': '首页',
            'sPrevious': '上一页',
            'sNext': '下一页',
            'sLast': '末页'
          }
        },
        'serverSide': true,
        'ajax': {
          'url': 'http://127.0.0.1:8080/user/all',
          'type': 'GET',
          'beforeSend': function (request) {
            request.setRequestHeader('Authorization', 'Bearer ' + store.state.token)
          }
        }
        // 'bAutoWidth': false, // 自动适应宽度
        // 'bFilter': false, // 查询
        // 'bSort': true, // 排序
        // 'bInfo': false, // 页脚信息
        // 'bLengthChange': false, // 改变每页显示数据数量
        // 'bServerSide': true, // 服务器数据
        // 'sAjaxSource': '/XXX/XXX/GetList',
        // 'bProcessing': true, // 当datatable获取数据时候是否显示正在处理提示信息
        // 'bPaginate': true, // 显示分页器
        // 'iDisplayLength ': 10, // 一页显示条数
        // 'aoColumns': [
        //   {
        //     // 自定义列
        //     'sName': 'Id',        // Ajax提交时的列明（此处不太明白，为什么用两个属性--sName，mDataProp）
        //     'mDataProp': 'Id',    // 获取数据列名
        //     'sClass': 'center',    // 样式
        //     'bStorable': false,    // 该列不排序
        //     'render': function (data, type, row) {    // 列渲染
        //       return '<label class="position-relative">' +
        //       '<input type="checkbox" class="ace" value="' + data + '"/>' +
        //       '<span class="lbl"></span>' +
        //       '</label>'
        //     }
        //   },
        //   {
        //     'sName': 'Name',
        //     'mDataProp': 'Name',
        //     'bSearchable': true,    // 检索可用
        //     'bStorable': true
        //   },
        //   {
        //     'sName': 'CustomerSN',
        //     'mDataProp': 'CustomerSN',
        //     'bSearchable': false,
        //     'bStorable': false
        //   },
        //   {
        //     'mDataProp': 'City',
        //     'sName': 'City'
        //   },
        //   {
        //     'sName': 'Address',
        //     'mDataProp': 'Address'
        //   },
        //   {
        //     'sName': 'Contact',
        //     'mDataProp': 'Contact'
        //   },
        //   {
        //     'sName': 'ContactPhone',
        //     'mDataProp': 'ContactPhone'
        //   }
        // ]
      })
    })
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
</style>
