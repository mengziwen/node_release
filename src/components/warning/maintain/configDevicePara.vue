<!--Author:wangyajie-->
<template>
  <div class="parameter">
    <div class="content-title">
      设备参数配置
    </div>
    <div class="include">
      <div class="info">
        <div class="title">设备信息</div>
        <Row>
          <Col span="5" class="assetType">
            <span>设备编号：</span>
            <span>{{queryData.thingCode}}</span>
          </Col>
          <Col span="8" class="assetType">
          <span>设备名称：</span>
          <span>{{queryData.thingName}}</span>
          </Col>
          <Col span="5" class="assetType">
          <span>参数类型：</span>
          <span>{{queryData.metricType}}</span>
          </Col>
          <Col span="6" class="assetType">
          <span>信号名称：</span>
          <span>{{queryData.metricName}}</span>
          </Col>
        </Row>
      </div>
      <div class="info">
        <div class="title">区间展示</div>
        <div class="slider">
          <div class="alt" v-if="queryData.alertRules.length == 0">未配置报警异常区间</div>
          <div class="section" v-if="queryData.alertRules.length > 0" v-for="section in queryData.alertRules" :style="section.style" @click="section.popVisible = !section.popVisible">
            <Poptip v-model="section.popVisible" placement="top">
              <div slot="content">
                <div class="item" @click="editSection(section)">修改区间</div>
                <div class="item" @click="delSection(section)">删除区间</div>
              </div>
            </Poptip>
            <span class="left">{{section.lowerLimit}}</span>
            <span class="right">{{section.upperLimit}}</span>
          </div>
          <Slider v-model="sliderRange" :min="minimum" range :max="maximum" disabled></Slider>
          <div class="value">
            <div class="min">
              <input type="text" placeholder="请输入最小值" v-model="minimum" @change="changeSlider()">
            </div>
            <div class="max">
              <input type="text" placeholder="请输入最大值" v-model="maximum" @change="changeSlider()">
            </div>
          </div>
          <div class="sections">
            <div class="title">配置异常区间（℃）</div>
            <div class="limits">
              <div class="limit">
                <input type="text" name="lowerLimit" v-model="lowerLimit" placeholder="输入下限值" v-validate="'max_value:120'">
                <span v-show="errors.has('lowerLimit')" class="help is-danger">此数据无效，请重新输入</span>
              </div>
              <div class="connector">——</div>
              <div class="limit">
                <input type="text" v-model="upperLimit" placeholder="输入上限值"  v-validate="'min_value:2000'">
                <span v-show="errors.has('upperLimit')" class="help is-danger">此数据无效，请重新输入</span>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="sections">
            <div class="title">选择报警等级</div>
            <div class="alertLevels">
              <RadioGroup v-model="alertLevel" :on-change="changeLevel()" type="button">
                <Radio label="黄色报警" :class="alertLevel=='黄色报警'?'active':''"></Radio>
                <Radio label="紫色报警" :class="alertLevel=='紫色报警'?'active':''"></Radio>
                <Radio label="蓝色报警" :class="alertLevel=='蓝色报警'?'active':''"></Radio>
              </RadioGroup>
            </div>
          </div>
        </div>
        <div class="buttons">
          <div class="button" @click="cancel()">
            取消
          </div>
          <div class="button" @click="remain()">
            保存并继续添加
          </div>
          <div class="button" @click="goBack()">
            确认并关闭
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
    <Modal
      title="title"
      width="430"
      v-model="toastModel"
      :mask-closable="false"
      class-name="small-modal"
      :closable="false">
      <p slot="header">
        <span>删除报警区间</span>
        <span class="titleLeft" @click="closeToast()">
          <img src="src/images/warning/webqt_iocn.png" alt="close">
        </span>
      </p>
      <p>
        <span>确定要删除"[{{currentSection.lowerLimit}},{{currentSection.upperLimit}}]"的报警区间?</span>
      </p>
      <div slot="footer">
        <Button type="text" size="large" @click="closeToast()">取消</Button>
        <Button type="primary" size="large" @click="confirmToast()">确定</Button>
      </div>
    </Modal>
    <Modal
      title="title"
      width="430"
      v-model="editModel"
      :mask-closable="false"
      class-name="edit-modal"
      :closable="false">
      <p slot="header">
        <span>修改报警区间</span>
        <span class="titleLeft" @click="close()">
          <img src="src/images/warning/webqt_iocn.png" alt="close">
        </span>
      </p>
      <div class="sections">
        <div class="title">配置异常区间（℃）</div>
        <div class="limits">
          <div class="limit">
            <input type="text" name="lowerLimit" v-model="editSec.lowerLimit" placeholder="输入下限值" v-validate="'max_value:120'">
            <span v-show="errors.has('currentSection.lowerLimit')" class="help is-danger">此数据无效，请重新输入</span>
          </div>
          <div class="connector">——</div>
          <div class="limit">
            <input type="text" v-model="editSec.upperLimit" placeholder="输入上限值"  v-validate="'min_value:2000'">
            <span v-show="errors.has('currentSection.upperLimit')" class="help is-danger">此数据无效，请重新输入</span>
          </div>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="sections">
        <div class="title">选择报警等级</div>
        <div class="alertLevels">
          <RadioGroup v-model="editSec.alertLevel" :on-change="changeLevel()" type="button">
            <Radio label="黄色报警" :class="editSec.alertLevel==30?'active':''"></Radio>
            <Radio label="紫色报警" :class="editSec.alertLevel==20?'active':''"></Radio>
            <Radio label="蓝色报警" :class="editSec.alertLevel==10?'active':''"></Radio>
          </RadioGroup>
        </div>
      </div>
      <div slot="footer">
        <Button type="text" size="large" @click="closeEdit()">取消</Button>
        <Button type="primary" size="large" @click="confirmEdit()">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<style></style>
<script>
  export default{
    name: 'parameter',
    data: () => ({
      minimum:0,
      maximum:300,
      queryData: {},
      sliderRange:[this.minimum,this.maximum],
      lowerLimit:null,
      upperLimit:null,
      alertLevel:null,
      popVisible:false,
      toastModel:false,
      editModel:false,
      currentSection:{},
      editSec:{}
    }),
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.ready()
    },
    methods: {
      /**
       * 数据初始化
       */
      ready() {
        this.queryData = this.$route.params.obj;
        for (var i = 0; i < this.queryData.alertRules.length; i++) {
          var color;
          if(this.queryData.alertRules[i].alertLevel == 30){
            color = "rgb(253,238,0)";
          }else if(this.queryData.alertRules[i].alertLevel == 20){
            color = "rgb(180,16,248)";
          }else{
            color = "rgb(48,166,228)";
          }
          var unitLength = 668.8 / (this.maximum - this.minimum);
          this.queryData.alertRules[i].style = {
            width: unitLength *(this.queryData.alertRules[i].upperLimit - this.queryData.alertRules[i].lowerLimit)  +"px",
            left: unitLength * this.queryData.alertRules[i].lowerLimit + 83.6 +"px",
            backgroundColor : color
          }
        }
      },
      changeLevel() {
//          console.log(this.alertLevel);
      },
      /**
       * 取消保存
       */
      cancel() {
          var this_obj = this;
          this_obj.lowerLimit = null;
          this_obj.upperLimit = null;
          this_obj.alertLevel = null;
      },
      /**
       * 保存并继续添加
       */
      remain() {
        var this_obj = this;
        var node = {};
        node.lowerLimit = this_obj.lowerLimit;
        node.upperLimit = this_obj.upperLimit;
        var color;
        if(this_obj.alertLevel == '黄色报警'){
          color = "rgb(253,238,0)";
          node.alertLevel = 30;
        }else if(this_obj.alertLevel == '紫色报警'){
            color = "rgb(180,16,248)";
          node.alertLevel = 20;
        }else{
            color = "rgb(48,166,228)";
          node.alertLevel = 10;
        }
        var unitLength = 668.8 / (this_obj.maximum - this_obj.minimum);
        node.style = {
            width: unitLength *(node.upperLimit - node.lowerLimit)  +"px",
            left: unitLength * node.lowerLimit + 83.6 +"px",
            backgroundColor : color
        }
        this_obj.queryData.alertRules.push(node);
        this_obj.lowerLimit = null;
        this_obj.upperLimit = null;
        this_obj.alertLevel = null;
      },
      /**
       * 确认并关闭
       */
      goBack(){
        this.$router.push({name: 'paraTypeAlert'})
      },
      /**
       * 修改滑条最大最小值
       */
      changeSlider(){
        var this_obj = this;
        this_obj.sliderRange = [this_obj.minimum,this_obj.maximum];
      },
      /**
       * 删除按钮
       */
      delSection(section){
        this.currentSection = section;
        this.toastModel = true;
      },
      /**
       * 编辑按钮
       */
      editSection(section){
        this.currentSection = section;
        this.editSec = copyArr(section);
        this.editModel = true;
      },
      /**
       * 删除框确认
       */
      confirmToast(){
          this.toastModel = false;
      },
      /**
       * 删除框关闭
       */
      closeToast(){
        this.toastModel = false;
      },
      /**
       * 编辑框确认
       */
      confirmEdit(){
        this.editModel = false;
      },
      /**
       * 编辑框关闭
       */
      closeEdit(){
        this.editModel = false;
      }
    }
  }
  /**
   * 对象深度拷贝
   * @param arr
   */
  function copyArr(arr){
    return arr.map((e)=>{
      if(typeof e === 'object'){
        return Object.assign({},e)
      }else{
        return e
      }
    })
  }
</script>
