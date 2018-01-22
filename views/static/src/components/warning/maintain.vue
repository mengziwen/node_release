<template>
  <div id="basic">
    <div  class="leftAside">
      <div>
        <div  class="inside">
          <router-link :to="{path:'/warning/maintain/paraTypeAlert'}">
            参数类报警
            <div class="triangle_border_right">
            </div>
          </router-link>
        </div>
      </div>
      <div>
        <div  class="inside">
          <router-link :to="{path:'/warning/maintain/protectTypeAlert'}">
            保护类报警
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
