<template> 
  <transition name="modal">
    <div class="modal modal-mask" style="display: block">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('cancel')"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="exampleModalLabel">{{title}}</h4>            
          </div>       

          <div class="modal-body">
            <p>{{text}}</p>
          </div>       
            
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-info" @click="$emit('cancel')">取消</button>
            <button type="button" class="btn btn-primary" @click="$emit('confirm')">确定</button>
          </div>
        </div>
      </div>
    </div>
  </transition> 
</template>

<script>
export default {
  props: ['title', 'text']
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
