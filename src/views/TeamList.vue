<template>
  <div>
    <el-page-header @back="goBack" content="团队" title="返回">
    </el-page-header>


    <div class="main">
      <TeamUnit class="unit ListUnit" v-for="(team, index) in teams" :key="index" :name="team.team_name" :jump="Jump"
        :team_id="team.team_id" :team_imageurl="team.team_imageurl">
      </TeamUnit>
      <!-- <el-button class="unit ListUnit" @click="Tocreate" style="margin-left: 25px;opacity: 100%;"> <span class="text"
            style="font-size: 60px; margin-left: 10px; font-family: 'none'">+</span><span class="text"
            style="font-size: 27px; font-weight: 100; margin-left: 20px; margin-top: 20px;">创建新团队</span></el-button> -->
      <el-button class="unit ListUnit" @click="Tocreate" style="opacity: 100%; color: grey;">
        <span class="text1" style="font-size: 50px; margin-left: 40px; font-family: 'none'">+</span>
        <span class="text1"
          style="font-size: 30px; font-weight: 100; margin-left: 20px; margin-top: -5px;">创建新团队</span></el-button>
    </div>

    <div class="box_1"></div>
    <div class="bear"></div>
  </div>
</template>
    
<script>
import TeamUnit from '@/components/TeamUnit.vue';
import { allteam } from '../api/api';
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
  data() {
    return {
      teams: []
    }
  },
  methods: {
    startIntro() {
      //console.log("123321",localStorage.getItem('TeamListNewB'))
      if (localStorage.getItem("TeamListNewB") === "false") {
        //   intro.complete();
        const intro = introJs();
        intro.setOptions({
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: false,
          steps: [{
            title: '团队列表界面',
            intro: '欢迎来到团队列表界面! 👋'
          },
          {
            element: document.querySelector('.main'),
            title: '团队列表',
            intro: '此处显示所有参加团队（注意是参加哦）',
            position: 'right'
          },
          {
            element: document.querySelector('.text1'),
            title: '团队添加',
            intro: '可点击此处添加团队',
            position: 'right'
          },],
        }).start();
        localStorage.setItem("TeamListNewB", true);
      }
    },
    getteams() {
      console.log(localStorage.getItem("username"))
      allteam(localStorage.getItem("username")).then(res => {
        console.log(res.data.data)
        this.teams = res.data.data
      })
    },
    goBack() {
      console.log('go back');
      this.$router.push('/main')
    },
    Jump() {

      this.$router.push('/team-introduce')

    },
    Tocreate() {
      this.$router.push('/create')
    }
  },
  components: { TeamUnit },
  mounted() {
    this.getteams()
    this.startIntro()
  }
}
</script>
    
<style scoped lang="scss">
* {
  float: left;
  box-sizing: border-box;
}

.el-page-header {
  height: 60px;
  line-height: 60px;
  position: fixed;
  left: 80px;
  top: 50px;
}

.main {
  height: 600px;
  width: 1200px;
}

.ListUnit {
  margin-top: 80px;
  margin-left: 20px;
  border-radius: 10px;
  float: left;
  margin-right: 8px
}

.text {
  display: block;
}

// ------------背景
.box_1 {
  z-index: 2;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 336px;
  width: 100%;
  background: url(../assets/img/bg1.png) no-repeat;
  animation: bg 30s linear infinite;
  margin-bottom: 0px;
  z-index: -10;
}

.bear {
  z-index: 3;
  position: absolute;
  left: 0;
  bottom: 0;
  height: 100px;
  width: 200px;
  background: url(../assets/img/bear.png) no-repeat;
  animation: bear 0.5s steps(8) infinite, move 6s forwards 0.2s;
  margin-bottom: 40px;
  bottom: 10px;
  z-index: -5;
}

@keyframes bear {
  from {
    background-position: 0, 0;
  }

  to {
    background-position: -1600px, 0;
  }
}

@keyframes move {
  from {
    left: 0;
  }

  to {
    left: 50%;
    transform: translateX(-50%);
  }
}

@keyframes bg {
  from {
    background-position: 0, 0;
  }

  to {
    background-position: -1200px, 0;
  }
}
</style>