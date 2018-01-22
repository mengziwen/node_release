<!--Author:wangyajie-->
<template>
  <div class="configure">
    <div class="content-title">
      配置设备信号
      <div class="tabs">
        <div class="tab" @click="changeTab(1)" :class="tab==1?'active':''">批量条件筛选</div>
        <div class="tab" @click="changeTab(2)" :class="tab==2?'active':''">精准编号添加</div>
      </div>
    </div>
    <div v-if="tab==1">
      <Row  class="select-blocks">
        <Col span="8" class="assetType">
        <label for="assetType">资产类别：</label>
        <div class="selects">
          <select name="assetType" v-model="assetType">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
        <Col span="8" class="category">
        <label for="category">设备/部件类型：</label>
        <div class="selects">
          <select name="category" v-model="category">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
        <Col span="8" class="system">
        <label for="system">所属系统：</label>
        <div class="selects">
          <select name="system" v-model="system">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
      </Row>
      <Row>
        <Col span="12" class="signal">
        <label for="signal">信号名称：</label>
        <div class="selects">
          <select name="signal" v-model="signal">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
        <Col>
          <div span="12" class="operates">
            <div class="operate">
              <img src="src/images/warning/xtgl_btn_tj.png"/>
              <span>检索</span>
            </div>
          </div>
        </Col>
      </Row>
      <Table ref="selection" :columns="columns" :data="currentData"></Table>
      <nav v-if="pages>1">
        <ul class="pagination">
          <li><a @click="selectPage(1)"><<</a></li>
          <li><a @click="selectPage(page - 1)">&lt;</a></li>
          <li><a>{{currentPage}}/{{pages}}</a></li>
          <li><a @click="selectPage(currentPage + 1)">&gt;</a></li>
          <li><a @click="selectPage(pages)">&gt;&gt;</a></li>
        </ul>
      </nav>
    </div>
    <div v-else="tab==2">
      <Row  class="select-blocks">
        <Col span="12" class="assetType">
        <label for="assetType">添加设备：</label>
        <div class="selects">
          <select name="assetType" v-model="assetType">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
        <Col span="12" class="signal">
        <label for="signal">信号名称：</label>
        <div class="selects" style=" width:50%">
          <select name="signal" v-model="signal">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
      </Row>
      <Row>
        <Col span="8" class="metricType">
        <label for="metricType">参数类型：</label>
        <div class="selects">
          <select name="metricType" v-model="metricType">
            <option value="">全部</option>
          </select>
          <div class="line"></div>
        </div>
        </Col>
        <Col>
        <div class="operates">
          <div class="operate">
            <img src="src/images/warning/xtgl_btn_tj.png"/>
            <span>检索</span>
          </div>
        </div>
        </Col>
      </Row>
      <Table ref="selection" :columns="columns" :data="currentData"></Table>
      <nav v-if="pages>1">
        <ul class="pagination">
          <li><a @click="selectPage(1)"><<</a></li>
          <li><a @click="selectPage(page - 1)">&lt;</a></li>
          <li><a>{{currentPage}}/{{pages}}</a></li>
          <li><a @click="selectPage(currentPage + 1)">&gt;</a></li>
          <li><a @click="selectPage(pages)">&gt;&gt;</a></li>
        </ul>
      </nav>
    </div>

  </div>
</template>
<style></style>
<script>
  export default {
    data () {
      return {
        tab:1,
        assetType:"",
        category:"",
        system:"",
        signal:"",
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '设备名称',
            key: 'thingName'
          },
          {
            title: '资产类别',
            key: 'assetType'
          },
          {
            title: '设备/部件类型',
            key: 'category'
          },
          {
            title: '所属系统',
            key: 'systemId'
          },
          {
            title: '参数类型',
            key: 'metricType'
          },
          {
            title: '信号名称',
            key: 'metricName'
          },
          {
            title: '报警阈值',
            key: 'threshold'
          }
        ],
        currentPage:1,
        pageSize:4,
        pages:2,
        currentData:[]
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.init()
    },
    methods: {
      init(){
        var this_obj = this;
        var url = '/api/v1/alert/rule/param/show';
        var postData = {
          page:this.currentPage
        }
        this.$http.post(url,postData).then(res => {
          if(res.body.code == 0){
            this_obj.currentData = res.body.obj.thingAlertRules;
            this_obj.currentData.forEach(function(item){
              this_obj.getThreshold(item.thingCode,item.metricCode).then(function (res) {
                if(res.body.code == 0){
                  item.threshold = res.body.obj;
                }else{
                  this_obj.$Message.info(res.body.errorMsg);
                }
              }).catch(function (err) {
                console.log('promsie错误  ', err)
              });
            });
          }else{
            this.$Message.info(res.body.errorMsg);
          }
        }, res => {
          console.info(res);
        });
      },
      getThreshold(thingCode,metricCode){
        var this_obj = this;
        return new Promise(function (resolve,reject) {
          var url = '/api/v1/alert/param/threshold';
          var request = {
            "thingCode" : thingCode,
            "metricCode" : metricCode
          }
          this_obj.$http.get(url, {params:request}).then(res => {
            resolve(res)
          }, res => {
            console.info(res);
            reject(res)
          });
        })
      },
      changeTab(tab){
        this.tab = tab;
      }
    }
  }
</script>
