<template>
   <div class="login-container">
    <div class="login-box">
      <h2>用户注册</h2>
      <form>
        <div class="user-box">
          <input type="text" name="" required="" v-model="params.mobile">
          <label>手机号</label>
        </div>
        <div class="user-box">
          <input type="text" name="" required="" v-model="params.nickname">
          <label>验证码</label>
        </div>
        <div class="user-box">
          <input type="password" name="" required="" v-model="params.password">
          <label>密码</label>
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="doRegister()">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          注册
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a @click="gotoLogin()">返回 </a>
      </form>
    </div>
  </div>
  <!-- <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户注册</h1>  
      <el-form-item label="">
          <el-select type="text" v-model="params.sex" clearable placeholder="性别">
          <el-option :value="1" label="男"/>
          <el-option :value="2" label="女"/>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input type="text" placeholder="年龄" v-model="params.age" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="text" placeholder="行业" v-model="params.avatar" autocomplete="off"></el-input>
      </el-form-item> -->
      <!-- <el-form-item label="">
        <el-input type="text" placeholder="手机号" v-model="params.mobile" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input type="text" placeholder="验证码" v-model="params.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="" >
        <el-input type="password" placeholder="用户密码" v-model="params.password" autocomplete="off"></el-input>
      </el-form-item>
    <el-form-item style="text-align: center;">      
        <el-button type="success" @click="doRegister()" style="width: 30%;" >用户注册</el-button>
        <el-button type="primary" @click="gotoLogin()"    style="width: 30%;" >返回登陆</el-button>
      </el-form-item>
    </el-form>
  </div> -->
</template>

<script>
import registerApi from '@/api/register'
/*  import axios from 'axios'
  import qs from 'qs' */
  export default{
      data:function(){
        return{
        params:{
            mobile:'',
            nickname:'',
            password:'',
            age:'',
            avatar:'',
            sex:''
        },
          username:null,
          password:null,
          password1:null
        }
      },
      methods:{
        gotoLogin:function(){
           this.$router.push({ path:'/login/'})
        },
        doLogin:function(){
          let params={
            username:this.username,
            password:this.password,
            methodName:'userLogin'
          };
          console.log(params);

          this.axios.get(this.axios.urls.SYSTEM_USER_DOLOGIN,{
            params:params
          }).then(resp => {
              console.log(resp.data);
          }).catch(resp=>{});
    
          /* this.axios.post(this.axios.urls.SYSTEM_USER_DOLOGIN
          ,params).then(resp => {
              console.log(resp.data);
          }).catch(resp=>{}); */
        },
        doRegister(){
           registerApi.registerMember(this.params)
           .then(response=>{
               this.$message({
                   type:'success',
                   messeage:"注册成功",
                   color:'#505458'
               })
              
              this.$router.push({path:'/login/'})
           }) 
        }
      }
  }
</script>

<style scoped="scoped">
  .login-wrap {
  		box-sizing: border-box;
  		width: 100%;
  		height: 100%;
  		padding-top: 10%;
  		background-image: url("../../assets/images/27.jpg");
  		/* background-color: #112346; */
  		background-repeat: no-repeat;
  		background-position: center right;
  		background-size: 100%;
  	}

  	.login-container {
  		/* border-radius: 10px;
      position: center;
  		margin: 0px auto 0px auto;
  		width: 350px;
  		padding: 30px 35px 15px 35px;
  		background: #fff;
  		border: 1px solid #eaeaea;
  		text-align: left;
  		box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1); */
       position: absolute;
        top: 50%;
        left: 50%;
        width: 400px;
        padding: 40px;
        transform: translate(-50%, -50%);
        background: rgb(57, 88, 69,.8);
        box-sizing: border-box;
        box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
        border-radius: 10px;
  	}

  	.title {
  		margin: 0px auto 40px auto;
  		text-align: center;
  		color: #FAFAFA;
  	}



   /* height: 100vh;
   background: linear-gradient(#141e30, #243b55);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 16px;
   color: #03e9f4; */
  
    /* position: fixed;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/22.png") no-repeat center;
  background-size: cover;  */
  /*background-image: url("../../assets/images/22.png") no-repeat center;
  /* background-size: cover;url(https://img-blog.csdnimg.cn/a7d3536782d34024914b76d3eafbe637.jpg); */
  /* background-repeat: no-repeat;
  background-size: 100%;
  background-position: 0px -50px; */ 


   /* height: 100vh;
   background: linear-gradient(#141e30, #243b55);
   display: flex;
   justify-content: center;
   align-items: center;
   font-size: 16px;
   color: #03e9f4; 
   position: fixed; */
  /* height: 100%;
  width: 100%;
  background: url("../../assets/images/22.png") no-repeat center;
  background-size: cover;  */

  .login-box {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgb(57, 88, 69, .8);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, .6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: .5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: .5s;
  margin-top: 40px;
  letter-spacing: 4px
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4,
  0 0 25px #03e9f4,
  0 0 50px #03e9f4,
  0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}


.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }
  50%, 100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: .25s
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }
  50%, 100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: .5s
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }
  50%, 100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: .75s
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }
  50%, 100% {
    bottom: 100%;
  }
}

</style>
<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
   position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
    position: absolute;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/27.jpg");
  background-size: cover;
   }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
    color: rgb(255, 255, 255);
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
</style>

