<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>姓名：{{ $route.params.username }}，密码：{{ $route.params.post_id }}</p>
    <form @submit.prevent="validateBeforeSubmit" autocomplete="off">
      <div class="columns is-multiline">
        <div class="column is-12">
          <label class="label">Email</label>
          <p class="control has-icon has-icon-right">
            <input name="email" v-model="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" placeholder="Email">
            <i v-show="errors.has('email')" class="fa fa-warning"></i>
            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">First Name</label>
          <p class="control has-icon has-icon-right">
            <input name="first_name" v-model="first_name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('first_name') }" type="text" placeholder="First Name">
            <i v-show="errors.has('first_name')" class="fa fa-warning"></i>
            <span v-show="errors.has('first_name')" class="help is-danger">{{ errors.first('first_name') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">Last Name</label>
          <p class="control has-icon has-icon-right">
            <input name="last_name" v-model="last_name" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('last_name') }" type="text" placeholder="Last Name">
            <i v-show="errors.has('last_name')" class="fa fa-warning"></i>
            <span v-show="errors.has('last_name')" class="help is-danger">{{ errors.first('last_name') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">Full Name</label>
          <p class="control has-icon has-icon-right">
            <input :value="name" name="name" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('name') }" type="text" placeholder="Full Name">
            <i v-show="errors.has('name')" class="fa fa-warning"></i>
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">密码</label>
          <p class="control has-icon has-icon-right">
            <input name="password" v-model="password" v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" type="password" placeholder="Password">
            <i v-show="errors.has('password')" class="fa fa-warning"></i>
            <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">确认密码</label>
          <p class="control has-icon has-icon-right">
            <input name="pwdagain" v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('pwdagain') }" type="password" placeholder="Password confirm">
            <i v-show="errors.has('password')" class="fa fa-warning"></i>
            <span v-show="errors.has('pwdagain')" class="help is-danger">请两次密码输入一致</span>
          </p>
        </div>
        <div class="column is-12">
          <label class="label">日期</label>
          <p class="control has-icon has-icon-right">
            <input name="date" v-validate="'required|date_format:YYYY-MM-DD'" :class="{'input': true, 'is-danger': errors.has('date') }" type="text" placeholder="请输入YYYY-MM-DD形式的日期">
            <i v-show="errors.has('date')" class="fa fa-warning"></i>
            <span v-show="errors.has('date')" class="help is-danger">{{ errors.first('date') }}</span>
          </p>
        </div>
        <div class="column is-12">
          <p class="control">
            <button class="button is-primary" type="submit">提交</button>
          </p>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import crypto from 'crypto'
  export default {
    name: 'test',
    data: () => ({
      msg: 'test',
      email: '',
      first_name: '',
      last_name: '',
      password: ''
    }),
    computed: {
      name() {
        return `${this.first_name} ${this.last_name}`;
      }
    },
    methods: {
      validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
          if (result) {
            // eslint-disable-next-line
            var obj = {
                name: this.name,
                email:this.email,
                password:this.getmdPwd(this.password)
            }
            this.$router.push({name:'routerPara',params: {postData: obj}});
          }else{
            alert('Correct them errors!');
          }
        });
      },
      getmdPwd(pwd) {
        var md5 = crypto.createHash("md5");
        md5.update(pwd);
        var mdPwd = md5.digest('hex');
        console.log(mdPwd);
        return mdPwd;
        //47bce5c74f589f4867dbd57e9ca9f808
      }
    }
  };
</script>

<!--<style scoped src="../css/bundle.css"></style>-->
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
