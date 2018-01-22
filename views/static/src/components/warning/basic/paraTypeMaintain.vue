<!--Author:wangyajie-->
<template>
  <div>
    <div class="content-title">
      参数类型维护
    </div>
    <div class="tool">
      <div class="addSystem" @click="addParaType()">
        <img src="src/images/warning/xtgl_btn_tj.png"/>
        添加参加类型
      </div>
    </div>

    <div class="blocks" v-if="!paraTypes">
      您好，您还未添加任何参数类型，请添加
    </div>
    <div class="blocks" v-else-if="paraTypes">
      <div class="paraType" v-for="(item,index) in paraTypes" :class="item.name.length>4?'longSystem':''">
        <div class="paraTypeNames">{{item.name}}</div>
        <div class="setting"></div>
        <div class="settingInfo">
          <span class="edit" @click="editParaType(item)">修改</span>
          <span class="del" @click="delParaType(item)">删除</span>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="clearfix"></div>
    </div>
    <Modal
      title="title"
      width="430"
      v-model="openModel"
      :mask-closable="false"
      class-name="small-modal"
      @on-ok="ok"
      @on-cancel="cancel">
      <p slot="header">
        <span>{{modalInfo.modalTitle}}</span>
      </p>
      <form autocomplete="off">
        <p v-if="modalInfo.modalType == 'edit' || modalInfo.modalType == 'plus'">
          <span>参数类型名称:</span>
          <input name="paraTypeName" v-model="modalInfo.paraType.name" v-validate="'required'" type="text" placeholder="请输入参数类型">
          <i v-show="errors.has('paraTypeName')" class="is-danger">*</i>
        </p>
        <p v-else="modalInfo.modalType == 'del' || modalInfo.modalType == 'toast'">
          {{modalInfo.msg}}
        </p>
      </form>
      <div slot="footer">
        <Button type="text" size="large" @click="cancel">取消</Button>
        <Button type="primary" size="large" @click="ok">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<style></style>
<script>
  export default {
    name: 'paraTypeMaintain',
    data: () => ({
      paraTypes:[
        {name:'密度'},
        {name:'温度'},
        {name:'湿度'},
        {name:'扭矩'}
      ],
      openModel:false,
      modalInfo:{
        paraType:{name:""},
        modalTitle:"",
        modalType:"",
        msg:""
      },
    }),
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.init()
    },
    methods: {
        init(){
          var url =  '/api/v1/alert/record';
          this.$http.post(url,this.postData).then(res => {
            this.resource = res.body.obj;
          },res => {
            console.info(res);
          });
        },
      addParaType() {
        var this_obj = this;
        this_obj.modalInfo.modalTitle= "添加参数类型";
        this_obj.modalInfo.modalType = "plus";
        this_obj.openModel = true;
      },
      editParaType(item) {
        var this_obj = this;
        this_obj.modalInfo.modalTitle = "编辑参数类型";
        this_obj.modalInfo.paraType  = item;
        this_obj.modalInfo.modalType = "edit";
        this_obj.openModel = true;
      },
      delParaType(item) {
        var this_obj = this;
        this_obj.modalInfo.modalTitle = "删除参数类型";
        this_obj.modalInfo.paraType = item;
        this_obj.modalInfo.msg = "您确定要删除" + item.name;
        this_obj.modalInfo.modalType = "del";
        this_obj.openModel = true;
      },
      ok () {
          var this_obj = this
          this_obj.$validator.validateAll().then((result) => {
            if (result) {
              this_obj.$Message.info('Clicked OK');
              this_obj.openModel = false;
              this_obj.modalInfo = {
                                      paraType:{name:""},
                                      modalTitle:"",
                                      modalType:""
                                    }

            }else{
              this_obj.modalTitle = "提示"
              this_obj.modalInfo.modalType = "toast";
              this_obj.modalInfo.msg = "请认真填写表单！"
              this_obj.modalInfo.openModel = true;
            }
          });
      },
      cancel () {
        var this_obj = this;
        this_obj.$Message.info({
          content: "toast",
        });
        this_obj.openModel= false;
        this_obj.modalInfo = {
                                paraType:{name:""},
                                modalTitle:"",
                                modalType:""
                              }
      }
    }
  }
</script>
<!--<style scoped src="src/css/bundle.css"></style>-->
<style scoped>
  .tool{
    display:flex;
    justify-content:flex-end;
  }
  .addSystem{
    position: relative;
    height:24px;
    padding: 0;
    width: 115px;
    border-radius: 24px;
    background-color: #2c9ae8;
    color: #fff;
    right: 20px;
  }
</style>
