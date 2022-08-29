<template>
    <!-- 二维码登录 -->
    <div>
        <h1 class="title">微信扫码登入</h1>
        <div class="erwei" v-loading="true">
            <img width="200px" src="../../assets/img/invalidQr.png" alt="">
            <i class="mask"></i>
        </div>
        <div class="wenzi">请使用微信扫码登入</div>
    </div>
</template>

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

    .wenzi{
        margin-top: 10px;
    }
    .mask{
        background-image: "../../assets/img/scancode.png";
        width: 200px;
        height: 200px;
    }
}
</style>


