<template>
  <div class="hello">
    <!--<p>姓名：{{ $route.query.name }}，密码：{{ $route.query.password }}</p>-->
    <div v-if="$route.params.postData"><p>姓名：{{ name }}，密码：{{ password }},电子邮件：{{email}}</p></div>
    <router-link :to="{name:'childPage',params: {obj: obj}}">子页面</router-link>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'test',
    data: () => ({
        name: "",
        password: "",
        email:"",
        obj:{
            msg : '这是一次测试',
            code : 0,
            arr : [1, 2, 3, 4, 5]
        }
    }),
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    methods: {
      fetchData(){
            var this_obj = this;
            if(this_obj.$route.params.postData){
              this_obj.name = this_obj.$route.params.postData.name;
              this_obj.email = this_obj.$route.params.postData.email;
              this_obj.password = this_obj.$route.params.postData.password;
            }
        }
    }
  };
</script>

<!--<style  src="../css/bundle.css"></style>-->
<style >
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
