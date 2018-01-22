<template>
  <div class="hello">
    <p>测试</p>
    <div v-for="transformer in resource" v-text="transformer.parameterValue"></div>
  </div>
</template>
<script>
  var qs = require('qs');
  export default {
    name: 'test',
    data: () => ({
      resource:{},
      postData:{
        parameterClass: "transformerSystem"
      }
    }),
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    methods: {
      fetchData(){
        var url = this.HOST + '/system/getZgkwSysParameters'
        this.$http.post(url,this.postData).then(res => {
          this.resource = res.body.obj;
        },res => {
          console.info(res);
        });
//        this.$jsonp(this.GLOBAL.baseURL+'/system/getZgkwSysParameters').then( data => {
//          console.log(data);
//
//        })

      }
    }
  };
</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
