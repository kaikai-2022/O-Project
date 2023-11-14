<template>
  <div>
    <div class="section">
      <div class="section-top">
        <div class="section-top-left">
          <p> :Name</p>
          oProject
          <p>:Team</p>
          <span style="font-family: JinNianFont; font-size: 30px;">
            吴浩宇 王陆昊 秦茂凯 周星达 梁坤 温舒盈</span>
          <p>:Features</p>
          <span style="font-family: JinNianFont; font-size: 30px;">
            团队管理、项目协作 原型设计、文档编辑</span>


        </div>
        <div class="section-top-middle">
        </div>
        <div class="section-top-right">
          <p>introduce:</p>
          <span style="font-family: JinNianFont; font-size: 23px;">
            本软工团队协作与管理平台是一个高效工具，为校内外中小团队的项目协作开发提供管理服务。
            通过集成管理团队、管理项目、项目产品原型设计和文档共享编辑等功能，
            它能帮助团队更好地合作，提高交付效率，确保项目按时、按质完成。
          </span>
        </div>
      </div>
      <div class="section-middle">
        <h2 style="font-size: 30px; margin-top: 50px;">About this Website</h2>
        <span style="font-family: JinNianFont; font-size: 20px;">“程序员的日常就是debug debug 再debug”</span>
        <div class="section-middle-box">
          <div class="section-middle-left">
            <span style="font-family: JinNianFont;font-size: 40px;">2023 Summer</span>
          </div>
          <div class="section-middle-right">
            <span style="font-family: JinNianFont;font-size: 40px;">生命不息，加班不止</span>
          </div>
        </div>
      </div>
      <!-- rgb(241, 167, 167) -->
      <!-- rgb(186, 228, 232); -->
      <div class="section-middle" style="flex-direction: row;">
        <button style="padding: 10px; border-radius: 27px; background: linear-gradient(90deg,#FFCCCC,#BBFFEE); border: #fff
        ; margin-right: 10px; margin-left: 60px; box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.08)" @click="SNewB">
          <i class="el-icon-arrow-left" style="color: #fff; font-size: 27px; margin-right: 2px;"></i>
          <span style="color: #fff; font-family: yousheFont; font-size: 27px;">新手引导</span>
        </button>
        <button style="margin: 15px; padding: 10px; border-radius: 27px; background: linear-gradient(90deg,#BBFFEE,#FFCCCC); border: #fff;
          box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.08)" @click="toTeamList" class="buto">
          <span style="color: #fff;  font-family: yousheFont; font-size: 27px;">START NOW</span>
          <i class="el-icon-arrow-right" style="color: #fff; font-size: 27px; margin-right: 2px;"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { AllNewB, changenNewB } from '@/api/api'
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
  data() {
    return {}
  },
  methods: {
    startIntro() {
      //console.log("123321",localStorage.getItem("MainNewB"))
      if (localStorage.getItem("MainNewB") === "false") {
        //   intro.complete();
        const intro = introJs();
        intro.onbeforeexit(function () {
          if (confirm("确定结束当前页面教程?") === true) {
            //修改为“已结束teamaside新手教程”
            localStorage.setItem("MainNewB", true);
          } else {
            return false;
          }
        });
        intro.setOptions({
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: false,
          steps: [
            {
              title: '欢迎！',
              intro: '现在将开始MemR的新手教程',
            },
            {
              element: document.querySelector('.buto'),
              title: 'Start',
              intro: '点击此处正式开始使用吧！',
              position: 'top'
            },],
          //overlayOpacity: 1.0, // 设置遮罩层透明度
          disableInteraction: true, // 禁止用户与遮罩层下方的元素进行交互
        }).start();
      }
    },
    SNewB() {
      console.log("start NewB")
      changenNewB(localStorage.getItem("username"));
      AllNewB(localStorage.getItem("username"))
      console.log(localStorage.getItem("HomeNewB"))
      setTimeout(() => {
        location.reload();
      }, 1000);
      console.log(localStorage.getItem("ProjectListNewB"))
      //this.startIntro()
      //location.reload()
    },
    toTeamList() {
      console.log("change to teamlist")
      this.$router.push({ name: 'teamlist' }, () => { this.$router.push('/teamlist') })
    }
  },
  mounted(){
    //this.startIntro()
  }
}

</script>

<style lang="scss" scoped>
* {
  font-family: ComicFont;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.15);
}

.section-top {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0px;
}

.section-top-middle {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url('../assets/logo.png');
  background-size: contain;
  background-position: center;
  margin: 0 0px 0px 0px;
  border: 15px solid rgb(241, 167, 167, 0.25);
  padding: 20px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
}

.section-top-left,
.section-top-right {
  width: 300px;
  height: 300px;
  font-size: 22px;
  margin-top: 30px;
}

.section-top-left {
  text-align: right;
}

.section-top p {
  font-size: 26px;
  color: #22A39F;
  margin: 5px 0;
}

.section-middle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.section-middle-box {
  width: 100%;
  display: flex;
  margin: 20px 0;
}

.section-middle-left {
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.section-middle-left span {
  text-align: left;
  color: rgb(241, 167, 167);
  margin-top: 0px;
}

.section-middle-right {
  width: 600px;
  display: flex;
  justify-content: center;
}

.section-middle-right img {
  width: 400px;
}

.section-middle-left span {
  text-align: center;
  font-size: 20px;
}
</style>
