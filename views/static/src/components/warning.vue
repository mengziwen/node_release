<template>
  <div id="warning" class="app-wrapper overview " style="height: 750px">
    <!-- start: App header -->
    <div class="factoryTitle">
      <span>报警模块管理</span>
      <i>Module management</i>
      <div class="addConcern">
      </div>
    </div>

    <!-- start: App sidebar -->
    <div style="height: calc(100% - 51px);background-color: #F8F8F8;">
      <div class="menuTitle" style="width: 168px;float:left">
        <div class="menu" ui-sref="center.factory.index.0"  angular-ripple>
          <div><img src="/src/images/launch/Rounded-Rectangle-2.png"/></div>
          <div>报警管理</div>
          <div class="triangle"><img src="../images/launch/triangle.png"/></div>
          <div style="clear: both"></div>
        </div>
        <div class="title">
          <div>
            <span>
              <router-link :to="{path:'/warning/basic'}">基础配置</router-link>
            </span>
          </div>
          <div>
            <span>
              <router-link :to="{path:'/warning/maintain'}">内容维护</router-link>
            </span>
          </div>
          <div>
            <span>
              <router-link :to="{path:'/warning/analysis'}">统计分析</router-link>
            </span>
          </div>
        </div>

      </div>
      <div class="content-view">
        <router-view class="router-view"/>
      </div>
      <div style="clear: both"></div>
    </div>
    <!-- end: App sidebar -->
  </div>
</template>

<script>
export default {
  name: 'warning',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="src/css/index/warning.css">
</style>
