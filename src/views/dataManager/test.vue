<template>
  <div class="login-container">
   <el-main>
    <el-card class="box-card">
        请输入管理员密钥<br>
        <br>
        <el-input v-model="pd"  style="width:100px" size="medium"/>
        <el-button round @click="go">登录</el-button>
    </el-card>
  </el-main>
  </div>
</template>

<script>

export default {
  data() {
        return {
            pd:'',
        }
    },
    methods: {
        go(){
            if(this.pd=='sadmin')
            {
               console.log('success')
               this.$router.push({ path:'/teacher'})
            }
            else{
                console.log('失败')
                this.$router.push({ path:'/404'})
            }
        }
    },
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#87afe4;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: absolute;
  height: 100%;
  width: 100%;
  background: url("../../assets/images/1.png") no-repeat center;
  background-size: cover;

  background-color: $bg;
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
}
</style>
