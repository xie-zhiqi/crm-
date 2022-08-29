<script>
// 校验验证码
var validatecaptcha = (rule, value, callback) => {
    var reg = /^[a-zA-Z0-9]{5,5}$/;
    if (reg.test(value)) {
        callback("验证通过");
    } else {
        callback("请输入五位验证码");
    }
};
// 用户名
var validateusername = (rule, value, callback) => {
    var userNamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
    if (userNamePattern.test(value)) {
        callback("通过了");
    } else {
        callback("请输入-4到16位(字母，数字，下划线，减号）");
    }
};
// 密码
var validatepassword = (rule, value, callback) => {
    var uPattern = /^[a-zA-Z0-9_-]{3,16}$/;
    if (uPattern.test(value)) {
        callback("欢迎回来");
    } else {
        callback("请输入-4到16位(字母，数字，下划线，减号）");
    }
};
export default {
    data() {
        return {
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    },
};
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
}
</style>
