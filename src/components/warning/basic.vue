<template>
  <div id="basic">
    <div  class="leftAside">
      <div>
        <div  class="inside">
          <router-link :to="{path:'/warning/basic/paraTypeMaintain'}">
            参数类型维护
            <div class="triangle_border_right">
            </div>
          </router-link>
        </div>
      </div>
      <div>
        <div  class="inside">
          <router-link :to="{path:'/warning/basic/paraTypeManage'}">
            参数类型管理
            <div class="triangle_border_right">
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <router-view class="content"></router-view>
    <div style="clear: both"></div>
  </div>
</template>
<script>
  export default {
    name: 'basic',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
