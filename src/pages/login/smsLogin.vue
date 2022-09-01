<template>
    <!-- 短信验证码登录 -->
    <div>
        <!-- <div class="jiaobiao">
            <svg class="icon-jiaobiao" aria-hidden="true">
                <use xlink:href="#icon-erweimajiaobiao"></use>
            </svg>
        </div> -->
        <h1 class="title">短信登入</h1>
        <el-form-item label="手机号">
            <el-input maxlength="11" class="captcha1" type="text" v-model="loginForm.password" autocomplete="off">
            </el-input>
            <span class="captcha-svg" v-text="msg" @click="sendSms" ></span>
        </el-form-item>
        <el-form-item label="验证码">
            <el-input type="text" v-model.number="loginForm.captcha"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button class="submit" type="primary" @click="submitForm('loginForm')">提交</el-button>
        </el-form-item>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loginForm: {
                password: "",
                captcha: "",
            },
            msg: "点击发送验证码",
            flag: true,
        }
    },
    methods: {
        sendSms() {
            if (this.flag) {
                this.flag = false;
                let delay = 5
                this.msg = `${delay}秒后重新发送`
                this.inteval = setInterval(() => {
                    delay--
                    if (delay < 1) {
                        this.msg = "点击发送验证码"
                        clearTimeout(this.inteval)
                        this.flag = true;
                    } else {
                        this.msg = `${delay}秒后重新发送`
                    }
                }, 1000)
            }
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

    .captcha1 {
        width: 125px !important;
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
        width: 125px !important;
        height: 42px;
        background-color: #fff;
        display: inline-block;
        border-top-right-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
        text-align: center;
        cursor: pointer;
        user-select: none;

        a {
            color: #4a3f3f;
            text-decoration: none;
        }
    }

    .jiaobiao {
        // width: 50px;
        // height: 50px;
        color: #1c44f5;

        .icon-jiaobiao {
            width: 80px;
            height: 80px;
        }
    }
}
</style>
