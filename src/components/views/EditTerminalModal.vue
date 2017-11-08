<template> 
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">编辑终端</h4>            
          </div>
          
          <div class="modal-body">
            <div>
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">终端编号:</label>                  
                  <input v-model="terNum" type="text" class="form-control" id="recipient-name">
                  <span class="text-danger" v-if="showNoNumberError">请输入终端编号</span>       
                </div>
                <span class="text-danger" v-if="showFailedError">修改用户信息失败: {{failedReason}}</span>
              </form>
            </div>
          </div>
            
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" @click="$emit('close')">关闭</button>
            <button type="button" class="btn btn-primary" @click="onChangeTerminal">确定</button>
          </div>
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
import api from '../../api'

export default {
  props: {
    terminalId: {
      type: Number,
      default: 0
    },
    terminalNumber: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      terNum: this.terminalNumber,
      showNoNumberError: false,
      showFailedError: false,
      failedReason: null
    }
  },
  methods: {
    onChangeTerminal: function (event) {
      window.console.log('terminal: ' + this.terminalNumber)
      this.showNoNumberError = false

      if (this.terNum.length === 0) {
        this.showNoNumberError = true
      }

      if (this.showNoNumberError) {
        return
      }

      var promise = null
      if (this.terminalId === 0) {
        promise = api.request('post', '/terminals', {'id': 0, 'terminalnumber': this.terNum})
      } else {
        promise = api.request('put', '/terminals/' + this.terminalId, {'id': this.terminalId, 'terminalnumber': this.terNum})
      }
      
      promise.then(response => {
        this.$emit('editTerminalOk', this.terNum)
      })
      .catch(error => {
        this.failedReason = error
        this.showFailedError = true
      })
    }
  }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}
</style>
