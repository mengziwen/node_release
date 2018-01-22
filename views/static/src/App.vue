<template>
  <div id="app">
    <div class="factoryTitle">
      <span>系统模块</span>
      <i>System module</i>
    </div>
    <div class="modules">
      <div class="button" ui-sref-active="active" ui-sref="center.factoryHome" >
        <div class="pic backBlue">
          <img src="/src/images/factory/changjia_index_shouye_button.png" style="width:60px;height:60px">
        </div>
        <div class="text">
          工厂首页
        </div>
        <div class="line backBlue">

        </div>
      </div>
      <div class="button" ui-sref-active="active" ui-sref="center.factory.start" >
        <div class="pic backOrange">
          <img src="/src/images/factory/changjia_index_qiting_button.png">
        </div>
        <div class="text">
          启停
        </div>
        <div class="line backOrange" >

        </div>
      </div>
      <div class="button" ui-sref-active="active" ui-sref="center.factory.wind">
        <div class="pic backYellow">
          <img src="/src/images/factory/changjia_index_gufeng_button.png">
        </div>
        <div class="text">
          鼓风
        </div>
        <div class="line backYellow" >

        </div>
      </div>
      <div class="button" ui-sref-active="active" ui-sref="center.factory.filterPress">
        <div class="pic backGreen">
          <img src="/src/images/factory/changjia_index_yalv_button.png">
        </div>
        <div class="text">
          压滤
        </div>
        <div class="line backGreen" >

        </div>
      </div>
      <div class="button" ui-sref-active="active" >
        <div class="pic backBlue">
          <img src="/src/images/factory/changjia_index_renyuan_button.png">
        </div>
        <div class="text">
          人员
        </div>
        <div class="line backBlue" >

        </div>
      </div>
      <div class="button" ui-sref="warning">
        <div class="pic backOrange">
          <img src="/src/images/factory/changjia_index_rizhi_button.png">
        </div>
        <div class="text">
          <router-link :to="{path:'/warning'}">报警</router-link>
        </div>
        <div class="line backOrange" >

        </div>
      </div>

      <div class="button" ui-sref-active="active" ui-sref="center.factory.comprehensive">
        <div class="pic backYellow">
          <img src="/src/images/factory/changjia_index_shebei_button.png">
        </div>
        <div class="text">
          综合
        </div>
        <div class="line backYellow" >

        </div>
      </div>
      <div class="button" ui-sref-active="active" ui-sref="center.factory.systemManage">
        <div class="pic backYellow">
          <img src="/src/images/factory/changjia_index_shebei_button.png">
        </div>
        <div class="text">
          系统管理
        </div>
        <div class="line backYellow" >

        </div>
      </div>
      <div style="clear: both"></div>
    </div>
    <div class="backGrey"></div>
    <div class="facContent" >
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {

    }
  }
}
</script>
<style src="src/css/factory.css"></style>
<style src="src/css/index/every.css">
</style>
