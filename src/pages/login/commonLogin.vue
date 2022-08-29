<template>
  <!-- 常规登录 -->
  <!-- <div class="inputbox"> -->
  <div>
    <h1 class="title">CRM管理系统</h1>
    <!-- <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm"> -->

    <el-form-item label="账号" prop="username">
      <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="captcha">
      <el-input maxlength="5" v-model="loginForm.captcha" class="captcha1" ref="captcha"
        @keydown.native.enter="submitForm('loginForm')">
      </el-input>

      <span class="captcha-svg" v-loading="loading">
        
        <i @click="updateCaptcha" v-html="captchaSvg"></i>
      </span>

    </el-form-item>

    <el-form-item>
      <el-button class="submit" type="primary" @click="submitForm('loginForm')">提交</el-button>
    </el-form-item>
    <!-- </el-form> -->
    <!-- </div> -->
    <div>
      <div class="sms">
        <a href="javascript:" @click="isSmsLogin = true" style="color:#fff; font-size: 16px;">点击切换短信等</a>
      </div>
    </div>
  </div>
</template>
<script>
  import * as api from "@/api/users"
export default {
  created() {
    this.updateCaptcha()
  },
  mounted() {
    api.getCaptcha()
      .then(res => {
      console.log(res)
    })
  },
  data() {
    return {
      loading: "",
      captchaSvg: "",  // 验证码
      loginForm: {
        username: "",
        password: "",
        captcha: ""
      },
      isSmsLogin: true
    }
  },
  watch: {
    // 监听对象需要开启深度监听，deep:true
    loginForm: {
      handler(newVal) {
        // console.log(newVal);
        this.$emit("syncLoginFrom", newVal)
      },
      deep: true
    }
  },
  methods: {

    submitForm(formName) {
      // console.log(formName)
      this.$emit("submit")
    },

    updateCaptcha() {
      api.getCaptcha()
        .then(res => {
        this.captchaSvg = res.data.img
      })
    }
  }
}
</script>

<style scoped lang="less">
.conter {
  .video {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .bj2 {
    background-image: url(../../assets/img/bg2.png);
    position: fixed;
    background-repeat: no-repeat;
    width: 20%;
    height: 40%;
    background-size: 100% 100%;
    left: 20%;
    top: 40%;
    opacity: 0.5;
  }
}

.inputbox {
  width: 350px;
  height: 450px;
  // 设置背景透明
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  left: 65%;
  top: 15%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  .demo-loginForm {
    position: relative;
    right: 2%;
    top: -7px;

    .el-form-item {
      .el-input {
        width: 250px;
      }
    }

    /deep/.el-form-item__label {
      color: white !important;
    }

    .submit {
      position: relative;
      left: 1%;
      width: 240px;
      background-image: linear-gradient(to right, #408af4, #1c44f5);
    }
  }

  .title {
    text-align: center;

    color: white;
  }

  .qiehuan {
    position: relative;
    top: 5px;
    text-align: center;
    color: white;
  }

  /deep/.duanxin {
    position: relative;
    top: -50px !important;
  }

  .erwei {
    width: 200px;
    height: 200px;
    background-color: rebeccapurple;
    position: relative;
    left: 26%;
    top: -5%;

    .img {
      margin: auto;
    }
  }

  .wenzi {
    text-align: center;
    position: relative;
    top: -13%;
    color: white;
  }

  .sms {
    text-align: center;
    margin-left: 10%;
  }

  // /deep/.el-form-item__content{
  //   display: flex !important;
  // }
  .captcha1 {
    width: 100px !important;
    z-index: 10;

    vertical-align: top;

    /deep/.el-input__inner {
      display: inline-block;
      border-top-right-radius: 0px !important;
      border-bottom-right-radius: 0px !important;
      border: none !important;
      height: 42px !important;
    }
  }

  .captcha-svg {
    width: 150px !important;
    height: 42px;
    background-color: #fff;
    display: inline-block;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
    text-align: center;
    cursor: pointer;
    /deep/img {
      width: 100%;
      height: 100%;
    }
  }

}
</style>
