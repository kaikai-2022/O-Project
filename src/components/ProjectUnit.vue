<template>
    <div class="unit" :style="`background-image: url('http://se.leonardsaikou.top/project_images/${projectID}_image.png');`">
        <div class="drawer">
            <span @click="CallJump" style="margin-top: -54px;">{{ name }}</span>
            <button class="btn" @click="CallDelete"><i class="el-icon-delete"></i></button>
            <button class="btn" @click="CallCopy"><i class="el-icon-document-copy"></i></button>
            <!-- <button class="btn"><i class="el-icon-star-off"></i></button> -->
            <!-- <button class="btn"><i class="el-icon-user"></i></button> -->
        </div>
    </div>
</template>
<script>
import { copyProject, deleteProject } from '@/api/api'
export default {
    props: { name: String, imageUrl: String, Jump: Function, deletePro: Function, projectID: String ,team_id:String},
    methods: {
        CallJump() {
            this.Jump()
            localStorage.setItem('projectID', this.projectID)
            // localStorage.setItem("team_id",this.team_id)
            console.log(localStorage.getItem('projectID'))
        },
        CallDelete() {
            var project_ID = { project_id: this.projectID }
            deleteProject(project_ID, localStorage.getItem('token')).then(res => {
                console.log(res)
                this.$emit('project-deleted')
            })
        },
        CallCopy() {
            var project_ID = { project_id: this.projectID, new_project_id: this.projectID + '_Copy' }
            console.log(project_ID)
            copyProject(project_ID, localStorage.getItem('token')).then(res => {
                this.$emit('project-copied')
            })
        }
    }
}
</script>
<style lang="scss" >
.unit {
    background-image: none;
    position: relative;
    width: 300px;
    height: 150px;
    background-color: #EBEEF5;
    display: inline-block;
    margin-left: 40px;
    border-radius: 10px;
    transition: 0.5s;
    overflow: hidden;
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.1);
    font-family: JingNanFont;
    font-size: 20px;
    opacity: 50%;
    margin-right: 15px;

    .drawer {
        position: absolute;
        width: 100%;
        height: 100px;
        border-radius: 10px 10px 10px 10px;
        background-color: #fff;
        transition: transform 0.3s ease;
        transform: translateY(100%);

        span {
            display: inline-block;
            width: 100px;
            margin-left: 6px;
            text-align: left;
            text-overflow: ellipsis;
            overflow: hidden;
            cursor: pointer;
        }
    }


}

.unit:hover {
    box-shadow: 5px 5px 2px rgba($color: #000000, $alpha: 0.3);
    opacity: 100%;
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
</style>
