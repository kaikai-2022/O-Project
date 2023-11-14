<template>
  <el-container class="home-container">
    <!-- 主页顶栏 -->
    <el-header>
      <div class="logo" @click="goHome">
        <img src="../assets/smallLogo.png" alt="" />
      </div>
      <div style="float: left; margin-left: 485px;">
        <img style="width: 430px;" src="../assets/title.png" alt="" />
      </div>

      <!-- 头像 -> 个人信息 -->
      <div class="user">

        <!-- <div v-if="isLogin">
          <el-avatar> user </el-avatar>
          <el-button type="danger" @click="logout">退出</el-button>
        </div> -->
        <div @click="login" style="margin-top: 70px; border-radius: 50%;">
          <img :src="imgSrc(username)" alt="User" style="height: 50px; width: 50px; border-radius: 50%;">
        </div>
      </div>


    </el-header>
    <el-container>
      <!-- 侧边栏导航 -->
      <div class="shell">

        <!-- <div class="box" @click="goHome">
          <div class="el-icon-s-home"></div>
          <span style="font-size: 16px; top: 12px;">首页</span>
        </div> -->
        <div class="box" @click="goTeam">
          <div class="el-icon-user"></div>
          <span style="font-size: 16px; top: 12px;">团队</span>
        </div>
        <div class="box" @click="goinfor">
          <div class="el-icon-postcard"></div>
          <span style="font-size: 16px; top:9px;">个人信息</span>
        </div>
        <div class="box" @click="message">
          <div class="el-icon-chat-dot-round"></div>
          <span style="font-size: 16px; top:9px;">消息中心</span>
        </div>
        <div v-if="isLogin" class="box" @click="logout">
          <div class="el-icon-close"></div>
          <span style="font-size: 16px; top: 9px;">退出</span>
        </div>
        <div v-else class="box" @click="login">
          <div class="el-icon-user"></div>
          <span style="font-size: 16px; top: 12px;">登录</span>
        </div>

      </div>

      <!-- 主页主体 -->
      <div class="main" style="width: 1200px;">
        <router-view></router-view>
      </div>
    </el-container>
  </el-container>
</template>
<script>
require("../assets/js/fontawesome");
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
  data() {
    return {
      isLogin: "",
      direction: 'ltr',
      drawer: false,
      userImage: '',
      username: localStorage.getItem("username")
    };
  },
  created() {
    // this.activePath = window.localStorage.getItem("activePath");
    if (window.localStorage.getItem("token") != null) {
      console.log("now username")
      console.log(localStorage.getItem("username"))
      this.isLogin = true;
    }
  },
  methods: {
    startIntro() {
      if (localStorage.getItem("HomeNewB") === "false") {
        const intro = introJs();
        intro.setOptions({
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: false,
          steps: [
            {
              element: document.querySelector('.el-icon-user'),
              title: '团队列表',
              intro: '点击这里可以直接进入团队列表（也方便大家使用时返回）',
              position: 'right'
            },
            {
              element: document.querySelector('.el-icon-postcard'),
              title: '个人信息',
              intro: '在此可以看到个人的相关信息（修改头像也在这里哦）',
              position: 'right'
            },
            {
              element: document.querySelector('.el-icon-chat-dot-round'),
              title: '消息中心',
              intro: '这里是所有提醒你要收到的消息，@和官方消息都在其中',
              position: 'right'
            }, {
              element: document.querySelector('.el-icon-close'),
              title: '退出',
              intro: '在此处退出登录哦',
              position: 'right'
            }, {
              title: 'START！',
              intro: '点击下方按钮，让我们开始使用吧！'
            }],
          //overlayOpacity: 1.0, // 设置遮罩层透明度
          disableInteraction: true, // 禁止用户与遮罩层下方的元素进行交互
        }).start();
        localStorage.setItem("HomeNewB", true);
      }
    },
    logout() {
      console.log("logout");
      this.isLogin = false;
      window.localStorage.clear();
      // location.reload();
      this.$router.replace("/login");
      //this.$router.reload()
    },
    goTeam() {
      this.$router.push({ name: 'teamlist' }, () => { this.$router.push('/teamlist') })
    },
    login() {
      console.log("login");
      this.$router.push({ name: 'login' }, () => { this.$router.push('/login') })
    },
    goinfor() {
      console.log("change to me-introduce")
      this.$router.push({ name: 'me-introduce' }, () => { this.$router.push('/me-introduce') })
    },
    message() {
      console.log("change to message")
      this.$router.push({ name: 'demo' }, () => { this.$router.push('/demo') })
    },
    goHome() {
      console.log("change to home")
      this.$router.push({ name: 'home' }, () => { this.$router.push('/main') })
    },
    Tome() {
      this.$router.push({ name: 'me' }, () => { this.$router.push('/me-introduce') })
    },
  },
  computed: {
    imgSrc() {
      return function (username) {
        return `http://se.leonardsaikou.top/avatars/${username}_avatar.png`;
      };
    },
  },
  mounted() {
    this.startIntro()
    //this.times()         //实时更新
  }
};
</script>

<style scoped>
body .shell-main-nav ul .nav-box {
  left: 360px;
}

body {
  background-color: rgb(248, 248, 248);
  background-repeat: no-repeat;
  background-size: contain;
}

body .shell-main-nav {
  margin-bottom: 0;
}

.main {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 1430px;
  overflow-x: hidden;
  transform: translateY(0px);
  background-color: #fff;
  transition: .3s;
  padding: 50px;
  border: 1px solid #000;
  left: 75px;
}

.user {
  float: right;
  margin: -70px 0px;
}

.el-header {
  height: 8vh;
  width: 100vw;
  background-color: #fff;
}

.logo {
  float: left;
}

title {
  border-radius: 10px;
  padding-left: 5px;
  padding-top: 5px;
}

img {
  border-radius: 10px;
  padding-left: 5px;
  padding-top: 5px;
  width: 60px;
}

body {
  background-color: rgb(209, 213, 219);
  display: flex;
  justify-content: space-evenly;
  height: 100vh;
  align-items: center;
  opacity: 1;
}

.shell {
  width: 60px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ghostwhite;
  border-radius: 10px;
  transition: .3s;
  overflow: hidden;
  margin-top: 50px;
}

.box {
  display: block;
  height: 15%;
  width: 80%;
  margin: 9px;
  border-radius: 5px;
  position: relative;
  transition: .3s;
  color: rgb(160, 160, 175);
  margin-left: 12px;
}

.box div {
  font-size: 25px;
  position: absolute;
  margin: 9px 0 0 9px;
}

/* .box:nth-child(1)::before,
.box:nth-child(3)::before {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  background-color: rgb(55, 65, 81);
  position: absolute;
  bottom: -10px;
} */

.box span {
  position: relative;
  top: 5px;
  left: 50px;
  font: 20px '';
  opacity: 0;
  transition: .1s;
}

.shell:hover {
  width: 170px;
}

.box:hover {
  background-color: rgb(55, 65, 81);
}

.shell:hover span {
  opacity: 1;
}

.box:hover {
  color: #fff;
}

.shell:nth-child(2) {
  background-color: rgb(243, 244, 246);
}

.shell:nth-child(2) .box:hover {
  background-color: rgb(209, 213, 219);
  color: rgb(241, 159, 159);
}

.shell:nth-child(2) .box {
  color: #000;
}

.shell:nth-child(3) {
  background-color: rgb(49, 46, 129);
}

.shell:nth-child(3) .box:hover {
  background-color: rgb(67, 56, 202);
}

.shell:nth-child(3) .box {
  color: rgb(140, 120, 240);
}
</style>