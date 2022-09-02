<template>
    <!-- 二维码登录 -->
    <div>
        <h1 class="title">微信扫码登入</h1>
        <div class="erwei" v-loading="loading">
            <img width="200px" :src="qrimg">
            <i class="mask" v-if="showMain" @click="updataQr" :style="maskBg"></i>
        </div>
        <div class="title-tubiao">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-weixin"></use>
            </svg>
            <div class="wenzi">请使用微信扫码登入</div>
        </div>
    </div>
</template>

<script>
// 引入socket.io
import socketIo from "socket.io-client";
// 引入qrcode
import qrcode from "qrcode"
import * as api from "@/api/users"

// 引入成功和失败遮罩图片
import lose from "@/assets/img/invalidQr.png"
import succeed from "@/assets/img/scancode.png"
import storage from "@/utils/storage"
export default {
    props: {
        storage: {
            // required:true
        }
    },
    data() {
        return {
            loading: "",
            qrimg: "",
            showMain: false,
            maskBg: { backgroundImage: `url(${succeed})` },//扫码成功

            // maskBgInvalid:{background:url(reaspone)} // 二维码失效
        }
    },
    created() {
        // 获取sid
        // console.log(this.storage)
        let io = socketIo("wss://chst.vip")
        io.on("connectSuccess", ({ sid }) => {
            storage.set("sid", sid)
            this.getQrUrl(sid)
        })
        // 二维码失效
        io.on("invalidCode", data => {
            console.log(data)
            this.showMain = true;
            this.maskBg.backgroundImage = `url(${lose})`
        })
        // 扫码成功
        io.on("scancodeSuccess", (data) => {
            console.log(data)
            api.wechaLoginApi(data.wechatCode)
                .then(res => {
                    // console.log(res)
                    this.showMain = true
                    this.maskBg.backgroundImage = `url(${succeed})`
                    this.storage(res.data)
                    this.$router.push("/home")
                })
        })
    },
    methods: {
        getQrUrl(sid) {
            this.loading = true;
            api.getQrcode(sid)
                .then(res => {
                    let { scanCodeUrl } = res.data
                    qrcode.toDataURL(scanCodeUrl, (err, img) => {
                        if (err) {
                            throw err
                        }
                        this.qrimg = img
                        this.loading = false;
                    })
                })
        },
        updataQr() {
            let sid = storage.get("sid")
            console.log(sid)
            this.getQrUrl(sid)
            this.showMain = false
        }
    }
    //
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
        background-color: rgb(254, 253, 255);
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

    .wenzi {
        margin-top: 0px;
    }

    .mask {
        display: block;
        position: absolute;
        top: 0px;
        opacity: 0.9;
        background: rgb(248, 239, 239);
        width: 200px;
        height: 200px;
    }

    .title-tubiao {
        margin-top: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>


