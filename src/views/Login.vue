<template>
    <div class="bigBox">
        <div class="box" ref="box">
            <!-- 滑动盒子 -->
            <div class="pre-box" :class="{ 'transformR': (switchFlag === false), 'transformL': (switchFlag === true) }">
                <h1>WELCOME</h1>
                <p>JOIN US!</p>
                <div class="img-box">
                    <img src='../assets/img/371.jpg' alt="" id="avatar" />
                </div>
            </div>
            <!-- 注册盒子 -->
            <div class="register-form">
                <!-- 标题盒子 -->
                <div class="title-box">
                    <h1>注册</h1>
                </div>
                <!-- 输入框盒子 -->
                <el-form ref="regFormRef" :model="regForm" :rules="regrules" label-with="5px">
                    <el-form-item prop="username" label="" style="margin-left: 50px;">
                        <el-input type="text" placeholder="用户名" v-model="regForm.username" />
                    </el-form-item>
                    <el-form-item prop="password" label="" style="margin-left: 50px;">
                        <el-input type="password" placeholder="密码" v-model="regForm.password" />
                    </el-form-item>
                    <el-form-item prop="real_name" label="" style="margin-left: 50px;">
                        <el-input type="text" placeholder="真实姓名" v-model="regForm.real_name" />
                    </el-form-item>
                    <el-form-item prop="email" label="" style="margin-left: 50px;">
                        <el-input type="text" placeholder="邮箱" v-model="regForm.email" />
                    </el-form-item>
                    <el-form-item prop="code" label="" style="margin-left: 50px;">
                        <el-input type="text" placeholder="验证码" v-model="regForm.code" />
                    </el-form-item>
                    <div style="margin-bottom: 10px;">
                        <button @click="checkCode" type="button">发送验证码</button>
                    </div>
                </el-form>
  
                <!-- 按钮盒子 -->
                <div class="btn-box">
                    <button @click="regUser">注册</button>
                    <p @click="switchBox">已有账号?去登录</p>
                </div>
            </div>
            <!-- 登录盒子 -->
            <div class="login-form">
                <!-- 标题盒子 -->
                <div class="title-box">
                    <h1>登录</h1>
                </div>
                <!-- 输入框盒子 -->
                <el-form ref="loginFormRef" :model="loginForm" :rules="loginrules" label-with="5px">
                    <el-form-item prop="username" label="" style="margin-left: 50px;">
                        <el-input type="text" placeholder="用户名" v-model="loginForm.username" />
                    </el-form-item>
                    <el-form-item prop="password" label="" style="margin-left: 50px;">
                        <el-input type="password" placeholder="密码" v-model="loginForm.password" />
                    </el-form-item>
                </el-form>
                <!-- 按钮盒子 -->
                <div class="btn-box">
                    <button @click="CallLogin('loginFormRef')">登录</button>
                    <p @click="switchBox">没有账号?去注册</p>
                </div>
            </div>
  
        </div>
    </div>
  </template>
  <script>
  import { setToken } from '../utils/setToken.js'
  import { login, regist, sendCode } from '@/api/api'
  
  
  export default {
    data() {
        // 验证邮箱手机的规则 （自定义校验规则
        var checkEmail = (rule, value, callback) => {
            var regemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (regemail.test(value)) {
                return callback();
            }
            callback(new Error("请输入合法邮箱"));
        };
        return {
            imgUrl: '../assets/img/371.jpg',
            switchFlag: true,
            loginForm: {
                username: '',
                password: ''
            },
            regForm: {
                username: '',
                password: '',
                "real_name": '',
                email: '',
                code: '',
            },
            loginrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度应在3~10个字符之间', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度应在6~15个字符之间', trigger: 'blur' },
                ],
            },
            regrules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度应在3~10个字符之间', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '长度应在6~15个字符之间', trigger: 'blur' },
                ],
                "real_name": [
                    { required: true, message: "请输入真实姓名", trigger: "blur" },
                    {
                        min: 3,
                        max: 10,
                        message: "姓名长度在3-10个字符之间",
                        trigger: "blur",
                    },
                ],
                email: [
                    { required: true, message: "请输入邮箱", trigger: "blur" },
                    { validator: checkEmail, trigger: "blur" },
                ],
            }
  
        }
    },
    methods: {
        switchBox() {
            const pre_box = document.querySelector('.pre-box')
            const img = document.querySelector("#avatar")
            if (this.switchFlag) {
                pre_box.style.transform = "translateX(100%)"
                pre_box.style.backgroundColor = "#c9e0ed"
                img.src = require("@/assets/img/372.jpg")
            }
            else {
                pre_box.style.transform = "translateX(0%)"
                pre_box.style.backgroundColor = "#edd4dc"
                img.src = require("@/assets/img/371.jpg")
            }
            this.switchFlag = !this.switchFlag
        },
        // 重置注册表单
        resetRegForm() {
            this.$refs.regFormRef.resetFields();
        },
        // 注册
        regUser() {
            this.$refs.regFormRef.validate(async (valid) => {
                if (!valid) return;
                // const { data: res } = await this.$http.post(
                //   "/api/v1/users/register",
                //   this.regForm
                // );
                console.log(this.regForm)
                regist(this.regForm).then(res => {
                    console.log(res)
                    if (res.data.status === 'success') {
                        this.$router.push("/login");
                    }
                }, err => {
                    console.log(err)
                    switch (err.response.status) {
                        case 401:
                            alert("验证码错误或已过期！")
                            break;
                        case 409:
                            alert("用户名或邮箱已注册！")
                            break;
                        case 400:
                            alert("请求错误！")
                            break;
                    }
                })
                // if (res.meta.status != 0) return this.$message.error(res.meta.msg);
                // this.$message.success(res.meta.msg);
                // // 页面跳转
                // this.$router.push("/login");
            });
        },
        //发送验证码
        checkCode() {
            console.log('enter')
            // const { data: res } = await this.$http.post(
            //   "/api/v1/users/verification",
            //   { email: this.regForm.email }
            // );
            // sendCode(this.regForm.email).then(res => {
  
            // })
            // if (res.meta.status != 0) {
            //     return this.$message.error(res.meta.msg);
            // }
            // this.$message.success(res.meta.msg);
            this.$refs.regFormRef.validate(async (valid) => {
                if (!valid) return;
                // const { data: res } = await this.$http.post(
                //   "/api/v1/users/register",
                //   this.regForm
                // );
                console.log(this.regForm)
                sendCode(this.regForm.email).then(res => {
  
                })
  
            });
        },
        CallLogin(form) {
            this.$refs[form].validate((valid => {
                if (valid) {
                    console.log(this.loginForm)
                    login(this.loginForm).then(res => {
                        console.log(res)
                        if (res.data.status === 'success') {
                            setToken('username', this.loginForm.username)
                            setToken('token', res.data.token)
                            this.$router.push('/main')
                        } else {
  
                        }
                    }, err => {
                        console.log(err)
                        switch (err.response.status) {
                            case 401:
                                alert("密码错误")
                                break;
                            case 404:
                                alert("用户名不存在")
                                break;
                            case 400:
                                alert("请求错误")
                                break;
                        }
                    })
                } else {
  
                }
            }))
        }
    },
    mounted() {
        console.log(this.loginForm)
        console.log(this.regForm)
    }
  }
  </script>
  <style lang="scss" scoped>
  .transformR {
    transform: translateX(100%);
    background-color: #c9e0ed;
  }
  
  .transformL {
    transform: translateX(0%);
    background-color: #edd4dc;
  }
  
  /* 去除input的轮廓 */
  input {
    outline: none;
  }
  
  .bigBox {
    /* 溢出隐藏 */
    height: 100vh;
    overflow-x: hidden;
    display: flex;
    /* 渐变方向从左到右 */
    background: linear-gradient(to right, rgb(247, 209, 215), rgb(191, 227, 241));
  }
  
  /* 最外层的大盒子 */
  .box {
    width: 1050px;
    height: 600px;
    display: flex;
    /* 相对定位 */
    position: relative;
    z-index: 2;
    margin: auto;
    /* 设置圆角 */
    border-radius: 8px;
    /* 设置边框 */
    border: 1px solid rgba(255, 255, 255, 0.6);
    /* 设置盒子阴影 */
    box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
  }
  
  /* 滑动的盒子 */
  .pre-box {
    /* 宽度为大盒子的一半 */
    width: 50%;
    height: 100%;
    /* 绝对定位 */
    position: absolute;
    /* 距离大盒子左侧为0 */
    left: 0;
    /* 距离大盒子顶部为0 */
    top: 0;
    z-index: 99;
    border-radius: 4px;
    background-color: #edd4dc;
    box-shadow: 2px 1px 19px rgba(0, 0, 0, 0.1);
    /* 动画过渡，先加速再减速 */
    transition: 0.5s ease-in-out;
  }
  
  /* 滑动盒子的标题 */
  .pre-box h1 {
    margin-top: 150px;
    text-align: center;
    /* 文字间距 */
    letter-spacing: 5px;
    color: white;
    /* 禁止选中 */
    user-select: none;
    /* 文字阴影 */
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* 滑动盒子的文字 */
  .pre-box p {
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin: 20px 0;
    /* 禁止选中 */
    user-select: none;
    font-weight: bold;
    color: white;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* 图片盒子 */
  .img-box {
    width: 200px;
    height: 200px;
    margin: 20px auto;
    /* 设置为圆形 */
    border-radius: 50%;
    /* 设置用户禁止选中 */
    user-select: none;
    overflow: hidden;
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* 图片 */
  .img-box img {
    width: 100%;
    transition: 0.5s;
  }
  
  /* 登录和注册盒子 */
  .login-form,
  .register-form {
    flex: 1;
    height: 100%;
  }
  
  /* 标题盒子 */
  .title-box {
    height: 136px;
    line-height: 180px;
  }
  
  /* 标题 */
  .title-box h1 {
    text-align: center;
    color: white;
    /* 禁止选中 */
    user-select: none;
    letter-spacing: 5px;
    text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  }
  
  /* 输入框盒子 */
  .el-form {
    display: flex;
    /* 纵向布局 */
    flex-direction: column;
    /* 水平居中 */
    align-items: center;
  }
  
  .el-form-item {
    display: flex;
    width: 50%;
    height: 40px;
  }
  
  /* 输入框 */
  input {
    text-indent: 10px;
    border: 1px solid #fff;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 120px;
    /* 增加磨砂质感 */
    backdrop-filter: blur(10px);
  }
  
  input:focus {
    /* 光标颜色 */
    color: #b0cfe9;
  }
  
  /* 聚焦时隐藏文字 */
  input:focus::placeholder {
    opacity: 0;
  }
  
  /* 按钮盒子 */
  .btn-box {
    display: flex;
    justify-content: center;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    margin-top: 10px;
  }
  
  /* 按钮 */
  button {
    width: 100px;
    height: 30px;
    margin: 0 7px;
    line-height: 30px;
    border: none;
    border-radius: 4px;
    background-color: #69b3f0;
    color: white;
    margin-right: 10px;
  }
  
  /* 按钮悬停时 */
  button:hover {
    /* 鼠标小手 */
    cursor: pointer;
    /* 透明度 */
    opacity: 0.8;
  }
  
  /* 按钮文字 */
  .btn-box p {
    height: 12px;
    line-height: 0px;
    /* 禁止选中 */
    user-select: none;
    font-size: 14px;
    color: white;
  }
  
  .btn-box p:hover {
    cursor: pointer;
    border-bottom: 0.5px solid white;
  }
  
  .btns {
    display: flex;
    justify-content: flex-end;
  }
  </style>