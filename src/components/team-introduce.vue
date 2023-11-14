<template>
    <div style="width: 150%;">
        <el-container style="margin-left: 280px; width: 65%;">
            <el-container>
                <el-aside width="200px">
                    <teamaside />
                </el-aside>
                <div class="section-top-middle">
                    <div class="input-container">
                        <img :src="imgSrc(team_id)" alt="Avatar" class="avatar">
                    </div>
                    <input type="file" name="" id="" accept="image/*" ref="fileInput" class="file-input-left"
                        style="margin-top: 25px;">
                    <button type="button" @click="changeinfor(ruleForm)"
                        style="width: 69px; padding: 4px; margin-top: 4px;">修改头像</button>

                    <h2
                        style="font-size: 31px; margin-top: 25px; font-family: JinNianFont; color: #000 ; text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3);">
                        About Team 关于团队</h2>
                    <p style="font-size: 18px;"> 团队 ID :</p>
                    <span style="font-family: JinNianFont; font-size: 30px;">
                        {{ team_id }} </span>
                    <p style="font-size: 18px;">团队名称 :</p>
                    <span style="font-family: JinNianFont; font-size: 30px;">
                        {{ team_name }} </span>
                    <p style="font-size: 18px;">团队介绍 :</p>
                    <span style="font-family: JinNianFont; font-size: 30px;">
                        {{ team_description }} </span>
                </div>
                <img style="position:absolute; bottom:100px; right: 340px; height:25%; width: 13%;"
                    src="../assets/img/wuwu.gif" id="" />
            </el-container>
        </el-container>
    </div>
</template>


<script>
import teamaside from '../components/teamaside.vue'
import { getGroupByID, changeteamimg } from "../api/api"
export default {
    methods: {
        getData() {
            getGroupByID(localStorage.getItem("team_id")).then(res => {
                console.log(res)
                this.team_id = res.data.data.team_id
                this.team_name = res.data.data.team_name
                this.team_description = res.data.data.team_description
            })
        },
        changeinfor(form) {
            const formData = new FormData()
            const fileInput = this.$refs.fileInput
            formData.append('image', fileInput.files[0])
            changeteamimg(localStorage.getItem('team_id'), formData).then(res => {
                console.log(res)
                if (res.data.status === "success") {
                    console.log("success")
                    alert("头像修改完成！")
                } else {
                    console.log("error")
                }
            },err=>{
                alert("您尚未选择头像哦~！")
            })
            //location.reload()
            //form.append('project_image', fileInput.files[0])
        }
    },
    data() {
        return {
            fits: [''],
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                team_id: '',
                team_name: '',
                type: [],
                team_description: '',
                team_image: '',
            disabled: true,
            team_id: localStorage.getItem("team_id")
        }

    },
    components: {
        teamaside
    },
    computed: {
        imgSrc() {
            return function (team_id) {
                return `http://se.leonardsaikou.top/team_images/${team_id}_image.png`;
            };
        },
    },
    created() {
        this.getData()
    }
}
</script>

<style scoped>
.section-top {
    width: 80%;
    height: 250px;
    display: flex;
    justify-content: space-evenly;
    margin-top: 0px;
    margin: 0px;
}

.section-top-middle {
    width: 400px;
    height: 100px;
    padding-top: -25px;
    padding-left: 150px;
}

.section-top-middle span {
    /* text-shadow: 4px 4px 3px rgba(0, 0, 0, 0.3); */
    margin: 30px;
}

.avatar {
    width: 180px;
    /* 你想要的宽度 */
    height: 180px;
    /* 保持原图宽高比 */
    border-radius: 50%;
    background-size: cover;
    background-position-x: 0px;
    background-position-y: 0px;
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
}

.el-main {
    width: 1400px !important;
}

.file-input-left {
    text-align: left;
    display: block;
}

.input-container {
    display: flex;
    align-items: center;
}
</style>