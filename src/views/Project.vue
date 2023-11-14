<template>
    <div style="margin-bottom: 70px;">
        <!-- 项目信息 -->
        <div class="image" style="float: left; margin-bottom: 40px;">
            <div class="block">
                <span class="demonstration"></span>
                    <img :src="imgSrc(project_ID)" alt="Avatar" class="avatar">
                <!-- <input type="file" name="" id="" accept="image/*" ref="fileInput" class="file-input-left"
                    style="margin-top: 25px; margin-left: -240px;">
                <button type="button" @click="changeinfor(ruleForm)"
                    style="width: 69px; padding: 4px; margin-top: 4px; margin-left: -60px;">修改头像</button> -->
            </div>
        </div>

        <el-descriptions style="float: left;" class="margin-top" title="基本设置" :column="1" :size="size">
            <el-descriptions-item label="项目名称">
                <span style="font-family: JinNianFont; font-size: 26px; margin-top: 20px;"> {{ projectName }}
                </span></el-descriptions-item>
            <el-descriptions-item label="项目描述">
                <span style="font-family: JinNianFont; font-size: 26px; margin-top: 20px;">{{ projectDescription }} </span>
            </el-descriptions-item>
        </el-descriptions>



        <!-- 编辑按钮 -->
        <el-row style="left: 445px; float: right; position: fixed;" data-hi>
            <button style="padding: 8px; border-radius: 24px; background-color: black ; padding-left: 12px;
                margin-top: 555px; margin-left: 745px;" @click="dialogVisible = true">
                <i class="el-icon-edit" style="color: #fff; font-size: 15px; margin-right: 2px;"></i>
            </button>
        </el-row>

        <!-- 编辑表单 -->
        <el-dialog title="编辑项目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :modal="false">
            <el-form :label-position='left' label-width="80px" :model="form" @submit="" :rules="formrules" ref="formRef">
                <el-form-item label="项目封面">
                    <input type="file" name="" id="" accept="image/*" ref="fileInput">
                </el-form-item>
                <el-form-item label="项目名称" prop="projectname">
                    <el-input v-model="form.projectname"></el-input>
                </el-form-item>
                <el-form-item label="项目描述" prop="projectDescription">
                    <el-input type="textarea" placeholder="请输入内容" v-model="form.projectDescription" maxlength="30"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" class="ftbtn">取 消</el-button>
                <el-button type="primary" @click="updateProject()" class="ftbtn">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getProjectData, modifyProject } from '@/api/api';

export default {
    data() {
        return {
            text: '',
            url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            dialogVisible: false,
            form: {
                projectname: '',
                projectDescription: ''
            },
            projectName: '',
            project_ID:localStorage.getItem("projectID"),
            projectDescription: '',
            // names: ['John', 'Tom', 'Peter', 'Bob']
        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        open() {
            this.$confirm('此操作将删除该项目, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.$router.push('/projectlist')
            }).catch(() => { });
        },
        getData() {
            getProjectData(localStorage.getItem('projectID'), localStorage.getItem('token')).then(res => {
                console.log(res)
                this.projectID=res.data.project.project_id
                this.projectName = res.data.project.project_name
                this.projectDescription = res.data.project.project_description
            })
        },
        updateProject() {
            const formData = new FormData()
            const fileInput = this.$refs.fileInput
            formData.append('project_image', fileInput.files[0])
            formData.append('project_id', localStorage.getItem('projectID'))
            formData.append('team_id', localStorage.getItem('team_id'))
            if (this.form.projectname === '') {
                alert('请输入项目名称！')
            } else {
                formData.append("project_name", this.form.projectname)
                formData.append('project_description', this.form.projectDescription)
                console.log(formData.get('project_image'))
                console.log(formData.get('project_name'))
                console.log(formData.get('project_id'))
                console.log(formData.get('team_id'))
                console.log(localStorage.getItem('team_id'))
                modifyProject(formData, localStorage.getItem('token')).then(res => {
                    console.log(res)
                    this.getData()
                })
            }
            this.$refs.formRef.resetFields()

            this.dialogVisible = false
        }
    },
    created() {
        this.getData()
    },
    computed:{
        imgSrc() {
            return function (projectID) {
                return `http://se.leonardsaikou.top/project_images/${projectID}_image.png`;
            };
        },
    }
}
</script>

<style lang="scss" scoped>
.text {
    font-size: 18px;
    text-align: left;
}

.item {
    padding: 5px 0;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
}

.avatar {
    width: 150px;
    height: 150px;
    display: block;
}

.el-descriptions {
    margin-left: 50px;
}

.button:hover {
    margin-right: 5px;
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

</style>