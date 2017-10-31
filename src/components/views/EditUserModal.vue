<template> 
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">编辑用户</h4>            
          </div>
          
          <div class="modal-body">
            <div>
              <form>
                <div class="form-group">
                  <label for="recipient-name" class="col-form-label">账号:</label>                  
                  <input v-model="user.account" type="text" class="form-control" id="recipient-name" :readonly="accountReadOnly">
                  <span class="text-danger" v-if="showNoAccountError">请输入账号</span>       
                </div>
                <div class="form-group">              
                  <label for="message-text" class="col-form-label">密码:</label>                  
                  <input v-model="user.pwd" type="password" maxlength="16" class="form-control"></input>
                  <span class="text-danger" v-if="showNoPwdError">请输入密码</span>                
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">确认密码:</label>
                  <input v-model="passwordRepeat" type="password" maxlength="16" class="form-control"></input>
                  <span class="text-danger" v-if="showPwdNotSameError">两次密码不一致</span>                
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">用户名:</label>                  
                  <input v-model="user.name" class="form-control"></input>
                  <span class="text-danger" v-if="showNoNameError">请输入用户名</span>                
                </div>
                <div class="form-group" v-if="currentUserId !== user.id">
                  <label for="message-text" class="col-form-label">类型:</label>               
                  <select v-model="user.type">                
                    <option value="2" v-if="currentUserType < 2">经销商</option>
                    <option value="3" v-if="currentUserType < 3">中心</option>
                    <option value="4" v-if="currentUserType < 4">医院</option>
                    <option value="5" v-if="currentUserType < 5">科室/楼层/病区</option>
                    <option value="6" v-if="currentUserType < 6">会诊</option>
                    <option value="7" v-if="currentUserType < 7">分析师</option>
                  </select>
                  <span class="text-danger" v-if="showNoTypeError">请选择用户类型</span>            
                </div>
                <div class="form-group" v-if="currentUserId !== user.id">
                  <label for="message-text" class="col-form-label">上级用户:</label>                  
                  <select v-model="user.parentuserid">            
                    <option v-for="u in users" v-if="u.type < user.type" :value="u.id">{{u.name}}</option>                     
                  </select>
                  <span class="text-danger" v-if="showNoParentError">请选择上级用户</span>                 
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">电话:</label>                 
                  <input v-model="user.phone" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">地址:</label>              
                  <input v-model="user.address" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">血氧技术开关:</label>                  
                  <select v-model="user.spo2Warning">                
                    <option value="true">开</option>
                    <option value="false">关</option>          
                  </select>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">体温技术开关:</label>               
                  <select v-model="user.btwarning">                
                    <option value="true">开</option>
                    <option value="false">关</option>          
                  </select>
                </div>
                <div class="form-group">
                  <label for="message-text" class="col-form-label">血压显示模式:</label>                  
                  <input v-model="user.bpshowMode" type="number" class="form-control"></textarea>
                </div>
                <span class="text-danger" v-if="showFailedError">修改用户信息失败: {{failedReason}}</span>
              </form>
            </div>
          </div>
            
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" @click="$emit('close')">关闭</button>
            <button type="button" class="btn btn-primary" @click="onChangeUser">确定</button>
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
  props: {
    selectUser: {
      type: Object
    },
    accountReadOnly: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      users: null,
      passwordRepeat: this.selectUser.pwd,
      currentUserType: store.state.type,
      currentUserId: store.state.userId,
      user: Object.assign({}, this.selectUser),
      showPwdNotSameError: false,
      showNoPwdError: false,
      showNoNameError: false,
      showFailedError: false,
      showNoAccountError: false,
      showNoTypeError: false,
      showNoParentError: false,
      failedReason: null
    }
  },
  methods: {
    onChangeUser: function (event) {
      window.console.log('user: ' + this.user.name)
      this.showNoPwdError = false
      this.showPwdNotSameError = false
      this.showNoNameError = false
      this.showNoAccountError = false
      this.showNoTypeError = false
      this.showNoParentError = false

      if (this.user.account.length === 0) {
        this.showNoAccountError = true
      }
      if (this.user.pwd.length === 0) {
        this.showNoPwdError = true
      }
      if (this.passwordRepeat.localeCompare(this.user.pwd) !== 0) {
        this.showPwdNotSameError = true
      }
      if (this.user.name.trim().length === 0) {
        this.showNoNameError = true
      }
      if (this.user.type === null) {
        this.showNoTypeError = true
      }
      window.console.log('new user parent: ' + this.user.parentuserid)
      if (this.user.parentuserid === null) {
        this.showNoParentError = true
      }

      if (this.showNoAccountError ||
          this.showNoNameError ||
          this.showNoPwdError ||
          this.showPwdNotSameError ||
          this.showNoTypeError ||
          this.showNoParentError) {
        return
      }

      api.request('post', '/user/edit', this.user)
      .then(response => {
        this.$emit('editUserOk', this.user)
      })
      .catch(error => {
        this.failedReason = error
        this.showFailedError = true
      })
    }
  },
  created: function () {
    api.request('get', '/user/all', null)
    .then(response => {
      var data = response.data
      if (!data.error) {
        this.users = data.data
      }
    })
    .catch(error => {
      this.$store.commit('TOGGLE_LOADING')
      console.log('error http://localhost:8080/user/all: ' + error)
    })
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
