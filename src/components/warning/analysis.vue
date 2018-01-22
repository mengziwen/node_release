<template>
  <div>
    <div style="float:left; width: 190px" class="leftAside">
      <div ui-sref-active="active" ui-sref="center.factory.warning.base.parameterOperating" class="asideNav">
        <div  class="inside">
          报警统计总览
        </div>
        <div class="triangle_border_right">
        </div>
      </div>
      <div ui-sref-active="active" ui-sref="center.factory.warning.base.2" class="asideNav">
        <div class="inside">
          报警统计列表
        </div>
        <div class="triangle_border_right">
        </div>
      </div>
      <div ui-sref-active="active" ui-sref="center.factory.warning.base.2" class="asideNav">
        <div class="inside">
          无效报警统计
        </div>
        <div class="triangle_border_right">
        </div>
      </div>
    </div>
    <div class="panel panel-default" style="float:left;width:calc(100% - 200px);height:100%">
      <div data-ui-view></div>

    </div>
    <div style="clear: both"></div>
  </div>
</template>
<script>
  export default {
    name: 'analysis',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>
<!--<style src="./css/factory.css"></style>-->
