<template>
  <div>
    <div>
      <div class="img"></div>
    </div>
    <div class="section" style="margin-left: 350px;">
      <div class="section-top">
        <div class="section-top-left" :style="backgroundImageStyle">
          <!-- <img :src="'http://se.leonardsaikou.top/avatars/' + username + '_avatar.png'" /> -->
          <input type="file" name="" id="" accept="image/*" ref="fileInput" class="file-input-left">
          <button type="button" @click="changeinfor(ruleForm)" style="margin-right: 81px;margin-top: 5px;">修改头像</button>



        </div>

        <div class="section-top-middle">

          <h2
            style="font-size: 35px; margin-top:0px; font-family: JinNianFont; color: #fff; text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);">
            About Me</h2>
          <p> 个人昵称:</p>
          <span style="font-family: JinNianFont; font-size: 30px;">
            {{ username }}</span>
          <p>真实姓名:</p>
          <span style="font-family: JinNianFont; font-size: 30px;">
            {{ real_name }}</span>
          <p>邮箱:</p>
          <span style="font-family: JinNianFont; font-size: 30px;">
            {{ email }}</span>
        </div>
        <div class="section-top-right">


        </div>
      </div>
      <div class="section-middle">

        <div class="section-middle-box">
          <div class="section-middle-left">
            <span
              style="font-family: JinNianFont; font-size: 30px; margin-top: -180px; margin-left: 0px;">“主业写bug，副业写代码”</span>
          </div>
          <div class="section-middle-right">
            <img style="position:absolute; bottom:100px; right:180px; height:25%; width: 15%;" src="../assets/img/374.gif"
              id="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import { findmember, changemeimg } from '../api/api'

export default {
  data() {
    return {
      username: localStorage.getItem("username"),
      real_name: '',
      email: '',
    }
  },
  methods: {
    getData() {
      findmember(this.username).then(res => {
        console.log(res)
        this.real_name = res.data.data.real_name
        this.email = res.data.data.email
      })
    },
    workspace() {
      console.log("change to workspace")
      this.$router.push({ name: 'workspace' }, () => { this.$router.push('/workspace') })
    },
    toTeamList() {
      console.log("change to teamlist")
      this.$router.push({ name: 'teamlist' }, () => { this.$router.push('/teamlist') })
    },
    changeinfor(form) {
      const formData = new FormData()
      const fileInput = this.$refs.fileInput
      formData.append('avatar', fileInput.files[0])
      console.log(formData)
      changemeimg(formData).then(res => {
        console.log(res)
        if (res.data.status === "success") {
          console.log("success")
          alert("头像修改完成！")
        } else {
          console.log("error")
        }
      })
      //location.reload()
      //form.append('project_image', fileInput.files[0])
    }
  },
  computed: {
    backgroundImageStyle: function () {
      return {
        backgroundImage: `url(http://se.leonardsaikou.top/avatars/${localStorage.getItem("username")}_avatar.png)`
      };
    }
  },
  mounted() {
    this.getData()
  }
}

</script>
  
<style lang="scss" scoped>
.img {
  position: absolute;
  width: 1600px;
  height: 580px;
  overflow: hidden;
  background-image: url('../assets/me.jpg');
  background-attachment: fixed;
  background-size: 100%;
  background-repeat: no-repeat;
  opacity: 0.6;
  z-index: -2;
}

.file-input-left {
  margin-top: 200px;
}

p {
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.0);
  font-family: JingNanFont;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.5);
  color: #fff;
}

.section-top {
  width: 100%;
  height: 550px;
  display: flex;
  justify-content: space-evenly;
  margin-top: 0px;
}

.section-top-middle {
  width: 300px;
  height: 300px;
  font-size: 22px;
  margin-top: 90px;
}

.section-top-left {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  //background-image: url('http://se.leonardsaikou.top/avatars/wlh_avatar.png');
  background-size: cover;
  background-position-x: -0px;
  background-position-y: -0px;
  margin: 0px 0px 0px 0px;
  padding: 20px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
  background-repeat: no-repeat;
}


.section-top-right {
  width: 300px;
  height: 300px;
  font-size: 22px;
  margin-top: 90px;
}

.section-top-left {
  text-align: right;
  margin-top: 110px;
}

.section-top p {
  font-size: 25px;
  color: #fff;
  margin: 10px 0;
  font-family: JinNianFont;
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
  color: #fff;
  margin-top: 0px;
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);
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
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);
}

.section-top-middle span {
  text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);
}
</style>
  