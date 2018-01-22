<!--Author:wangyajie-->
<template>
  <div class="paraTypeAlert">
    <div class="content-title">
      参数类报警维护
    </div>
    <Row  class="select-blocks">
      <Col span="8" class="assetType">
        <label for="assetType">资产类别：</label>
        <div class="selects">
          <select name="assetType" v-model="assetType">
            <option value="全部">全部</option>
          </select>
          <div class="line"></div>
        </div>
      </Col>
      <Col span="8" class="category">
        <label for="category">设备/部件类型：</label>
        <div class="selects">
          <select name="category" v-model="category">
            <option value="全部">全部</option>
          </select>
          <div class="line"></div>
        </div>
      </Col>
      <Col span="8" class="system">
        <label for="system">所属系统：</label>
        <div class="selects" >
          <select name="system" v-model="system">
            <option value="全部">全部</option>
          </select>
          <div class="line"></div>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span="8" class="assetType">
      <label for="assetType">资产类别：</label>
      <div class="selects">
        <select name="assetType" v-model="assetType">
          <option value="全部">全部</option>
        </select>
        <div class="line"></div>
      </div>
      </Col>
      <Col span="16">
        <div class="operates">
          <div class="operate" @click="showPop()">
            <img src="src/images/warning/xtgl_btn_tj.png"/>
            <span>排序</span>
            <Poptip v-model="popVisible" placement="bottom">
              <div slot="title">排序方式</div>
              <div slot="content">
                <div class="item">设备/部件类型</div>
                <div class="item">信号名称</div>
                <div class="item">设备号升序</div>
              </div>
            </Poptip>
          </div>
          <div class="operate">
            <img src="src/images/warning/xtgl_btn_tj.png"/>
            <span>检索</span>
          </div>
          <div class="operate">
            <img src="src/images/warning/xtgl_btn_tj.png"/>
            <span>编辑</span>
          </div>
          <div class="operate" @click="routerGo()">
            <img src="src/images/warning/xtgl_btn_tj.png"/>
            <span>配置设备信号</span>
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
</template>
<style></style>
<script>
  export default {
    data () {
      return {
        popVisible:false,
        assetType:"",
        category:"",
        system:"",
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '设备编号',
            key: 'thingCode'
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
          },
          {
            title: '操作',
            key: 'action',
            width: 100,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Img', {
                  attrs: {
                    src: 'src/images/warning/zgkw_tongyong_bianji_click_icon.png',
                  }
                }),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginLeft: '2px',
                    backgroundColor:'#fff',
                    color:'#2c9ae8',
                    border:'none',
                    marginTop:'-2px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({ name: 'parameter', params: { obj: params.row }})
                    }
                  }
                }, '编辑')
              ]);
            }
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
      routerGo(){
        this.$router.push('/warning/maintain/paraTypeAlert/signal')
      },
      showPop(){
          var this_obj = this;
          this_obj.popVisible = true;
      }
    }
  }
</script>
