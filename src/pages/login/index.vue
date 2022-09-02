<template>
  <div class="conter">
    <video class="video" muted src="../../assets/video/bg-video.mp4" loop="loop" autoplay="true"></video>
    <div class="bj2"></div>
    <div class="inputbox">
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <!-- 常规登录 -->
        <CommonLogin v-if="loginType === 'common'" ref="componLogin" @submit="submit"
          @syncLoginFrom="handlesyncLoginFrom" @changeSmsType="changeSmsType"></CommonLogin>
        <!-- 二维码登录 -->
        <Erwei v-else-if="loginType === 'qrcode'" :storage="storageUserInfo"></Erwei>
        <!-- 短信登录 -->
        <SmsLogin v-else :storageUserInfo="storageUserInfo"></SmsLogin>
      </el-form>

      <i @click="changeLogin" :class="['icon-jiaobiao', 'iconfont', jiaobiaoType]"></i>
    </div>

    <!-- 常规登录 -->
    <!-- <div class="inputbox">
      <h1 class="title" v-text="title"></h1>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input type="text" v-model.number="loginForm.captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
      <div class="qiehuan">切换验证码登录</div>
    </div> -->

    <!-- 短信验证码登录-->
    <!--<div class="inputbox">
      <h1 class="title" v-text="title"></h1>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px"
        class="demo-loginForm duanxin">
        <el-form-item label="手机号" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <el-input type="text" v-model.number="loginForm.captcha"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="submit" type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <!-- 二维码登录 -->
    <!-- <div class="inputbox">
      <h1 class="title" v-text="title"></h1>
        <div class="erwei" >
          <img src="../assets/img/invalidQr.png" alt="">
        </div>
          <div class="wenzi">请使用微信扫码登入</div>
    </div> -->


  </div>
</template>

<script>

import CommonLogin from "./commonLogin.vue"
import Erwei from "./qrLogin.vue"
import SmsLogin from "./smsLogin.vue";
import storage from "@/utils/storage"
// import * as api from "../../api/users"
// 校验验证码
var validatecaptcha = (rule, value, callback) => {
  var reg = /^[a-zA-Z0-9]{5,5}$/;
  if (reg.test(value)) {
    callback();
  } else {
    callback("请输入五位验证码");
  }
};
// 用户名
var validateusername = (rule, value, callback) => {
  var userNamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
  if (userNamePattern.test(value)) {
    callback();
  } else {
    callback("请输入正确的账号");
  }
};
// 密码
var validatepassword = (rule, value, callback) => {
  var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
  if (uPattern.test(value)) {
    callback();
  } else {
    callback("密码应不少于3位");
  }
};
import * as api from "@/api/users"
export default {
  components: { CommonLogin, Erwei, SmsLogin },
  computed: {
    jiaobiaoType() {
      if (this.loginType == "common") {
        return "icon-erweimajiaobiao"
      } else if (this.loginType === "qrcode" || this.loginType == "sms") {
        return "icon-diannaojiaobiao"
      }
    }
  },
  data() {
    return {
      loginType: "common", // 默认是常规登录,
      title: "CRM管理系统",
      loginForm: {
        username: "",
        password: "",
        captcha: "",
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        password: [{ validator: validatepassword, trigger: "blur" }],
        captcha: [{ validator: validatecaptcha, trigger: "blur" }],
      },
    };
  },
  methods: {
    changeSmsType() {
      this.loginType = "sms"
    },
    // 更改登录方式

    changeLogin() {
      if (this.loginType == "common") {
        this.loginType = "qrcode"
      } else if (this.loginType == "qrcode" || this.loginType == "sms") {
        this.loginType = "common"
      }
    },
    // 
    handlesyncLoginFrom(newVal) {
      // console.log(newVal)
      this.loginForm = newVal
    },
    submit(formName) {
      // 登入
      // 1.获取后台的验证码
      // 2.进行本地校验
      // 3.本地校验通过=>先校验验证码
      // 4.验证码通过再校验用户名和密码
      // 5.返回成功或失败
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          // 本地校验通过
          // alert('submit!');
          api.verification(this.loginForm.captcha)
            .then(async res => {
              // console.log(res)
              if (res.data.state) {
                // 验证码通过，首先先校验本地的表单验证，然后校验验证码，在验证码的内部设置一个if else然后 验证码校验通过的话 调用接口传参 再去校验用户名的账户和密码
                let { username, password } = this.loginForm
                let res = await api.loginApi(username, password)
                // console.log(res)
                if (res.data.status) {
                  // 把用户的信息存储到本地
                  this.storageUserInfo(res.data)
                  this.$router.push("/")
                }
              } else {
                this.$refs['componLogin'].updateCaptcha()
              }
            })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 封装一个方法用于存储用户信息
    storageUserInfo({ userInfo, token, permission }) {
      storage.set("userInfo", userInfo)
      storage.set("token", token)
      storage.set("permission", permission)
      // let r = storage.get("userInfo")
      // console.log(r)
    },

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
    // overflow: hidden;
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
  width: 400px;
  height: 540px;
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
    top: -34px;
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

  .icon-jiaobiao {
    font-size: 60px;
    color: rgb(223, 216, 216);
    position: absolute;
    right: -1px;
    top: -1px;
    cursor: pointer;
    opacity: 0.7;
    font-size: 60px;

  }

  // .jiaobiaoya{
  //   font-size: 60px;
  // }
}
</style>
