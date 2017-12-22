<template>
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">修改密码</h4>
          </div>

          <div class="modal-body">
            <div>
              <form>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">请输入旧密码:</label>
                  <input v-model="oldPwd" type="password" maxlength="16" class="form-control"></input>
                  <span class="text-danger" v-if="showNoOldPwdError">请输入旧密码</span>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">请输入新密码:</label>
                  <input v-model="pwd" type="password" maxlength="16" class="form-control"></input>
                  <span class="text-danger" v-if="showNoPwdError">请输入新密码</span>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">确认密码:</label>
                  <input v-model="passwordRepeat" type="password" maxlength="16" class="form-control"></input>
                  <span class="text-danger" v-if="showPwdNotSameError">两次密码不一致</span>
                </div>        
                <span class="text-danger" v-if="showFailedError">修改密码失败: {{failedReason}}</span>
              </form>
            </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" @click="$emit('close')">关闭</button>
            <button type="button" class="btn btn-primary" @click="onChangePassword">确定</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import store from '../../store'
import api from '../../api'

export default {
  data () {
    return {
      currentUserId: store.state.userId,
      pwd: '',
      oldPwd: '',
      passwordRepeat: '',
      showPwdNotSameError: false,
      showNoPwdError: false,
      showNoOldPwdError: false,
      showFailedError: false,
      failedReason: null
    }
  },
  methods: {
    onChangePassword: function (event) {
      this.showNoPwdError = false
      this.showPwdNotSameError = false
      this.showNoOldPwdError = false
    
      if (this.oldPwd.length === 0) {
        this.showNoOldPwdError = true
      }
      if (this.pwd.length === 0) {
        this.showNoPwdError = true
      }
      if (this.passwordRepeat.localeCompare(this.pwd) !== 0) {
        this.showPwdNotSameError = true
      }

      if (this.showNoOldNameError ||      
          this.showNoPwdError ||
          this.showPwdNotSameError) {
        return
      }

      api.request('put', '/users/' + this.currentUserId + '/pwd', {'userId': this.currentUserId, 'oldPwd': this.oldPwd, 'newPwd': this.pwd})
        .then(response => {
          this.$emit('editPasswordOk', null)
        })
        .catch(error => {
          this.failedReason = error.response.data.message
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
