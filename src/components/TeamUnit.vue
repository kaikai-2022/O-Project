<template>
    <!--  -->
    <div class="unit" :style="`background-image: url('http://se.leonardsaikou.top/team_images/${team_id}_image.png');`">
        <div class="drawer" @click="CallJump">
            <span > {{ name }}</span>
            <!-- <button class="btn" @click="CallTest"><i class="el-icon-delete"></i></button> -->
            <!-- <button class="btn"><i class="el-icon-star-off"></i></button> -->
            <!-- <button class="btn"><i class="el-icon-user"></i></button> -->
        </div>
    </div>
</template>
<script>
import { gettmrole } from '../api/api'
export default {
    props: { name: String, team_imageUrl: String, Jump: Function, deletePro: Function, projectID: String, team_id: String },
    data() {
        return {
            teamRole: '', // 创建一个空属性，稍后我们将存储从API获得的团队角色
            showrole: '',
        };
    },
    methods: {
        processTeam() {
            console.log
            // 在这里，你可以根据 team 的 team_id 进行任何你需要的操作
            // 如，根据 team_id 添加不同的类名
            gettmrole(this.team_id).then(res => {
                console.log(res)
                this.showrole=res.data.role
            })
        },
        CallJump() {
            console.log("123")
            console.log(this.team_id)
            localStorage.setItem("team_id", this.team_id)
            this.Jump()
            // localStorage.setItem('projectID', this.projectID)
            localStorage.setItem("team_id", this.team_id)
            // console.log(localStorage.getItem('projectID'))
        },
        CallTest() {
            this.testFunc()
        }
    },
    created() {
        this.processTeam();
    }
}
</script>
<style lang="scss" >
.unit {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 100px;
    background-size: cover;
    /* 将背景图像调整为完全覆盖 .unit 的尺寸 */
    background-position: center;
    /* 使背景图像居中显示 */
    background-repeat: no-repeat;
    /* 确保背景图像不重复 */
    padding: 0px;
    /* 为抽屉内容添加适当的内边距 */
    border-radius: 10px;

    /*     &::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-image: inherit;
        filter: brightness(1);
        // 调整亮度，1 是原始亮度，大于 1 增加亮度，小于 1 减少亮度 
        mix-blend-mode: hard-light;
        // 使用合适的混合模式以达到亮度效果 
        z-index: -1;
        // 确保叠加层位于抽屉层之下 
    } */

    .drawer {
        position: absolute;
        width: 100%;
        height: 100px;
        border-radius: 10px 10px 10px 10px;
        background-color: #fff;
        transition: transform 0.3s ease;
        transform: translateY(100%);
        cursor: pointer;

        span {
            display: inline-block;
            width: 200px;
            float: left;
            margin-left: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
    }


}

.unit:hover {
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.3);
}

.unit:hover .drawer {
    transform: translateY(70%);
    /* 打开抽屉时移动至可见位置 */
}

.unit:hover .btn {
    display: inline-block;
}

.btn {
    border: none;
    cursor: pointer;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    display: none;
    transition: 0.5s;
    margin-right: 20px;
    margin-top: 10px;
    float: right;
}

/* .team-role-Creator {
  color: rgb(255, 0, 0);
}

.team-role-Admin {
  color: rgb(0, 21, 255);
} */
</style>
