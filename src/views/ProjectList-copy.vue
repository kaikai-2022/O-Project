<template>
    <div style="width: 150%;">
        <el-container style="margin-left: 280px; width: 85%;">
            <el-container>
                <el-aside width="200px">
                    <teamaside />
                </el-aside>
                <el-main class="all" style="border-radius: 15px; width: 50%;">
                    <div class="al">
                        <div class="List">
                            <ProjectUnit class="unit ListUnit" v-for="(name, index) in projectData" :key="index"
                                :name="name.project_name" :project-i-d="name.project_id" :Jump="Jump"
                                :delete-pro="deleteProject" @project-deleted="showMessage"
                                @project-copied="showCopyMessage">
                            </ProjectUnit>
                            <el-button class="unit ListUnit" @click="dialogVisible = true"
                                style="opacity: 100%; color: grey;">
                                <span class="text1" style="font-size: 40px; margin-left: 10px; font-family: 'none'">+</span>
                                <span class="text1"
                                    style="font-size: 20px; font-weight: 100; margin-left: 20px; margin-top: 0px;">创建新项目</span></el-button>
                        </div>

                        <el-form :inlie="true" class="form">
                            <el-form-item>
                                <div
                                    style="margin-left: 350px; margin-top: 10px; bottom: 90px; right: 65px; position: fixed;">
                                    <div class="input-group">
                                        <input type="search" placeholder="Search Team..." v-model="form.project_tar">
                                        <img src="../assets/img/search.png" @click="search(form)">
                                    </div>
                                </div>
                            </el-form-item>
                        </el-form>


                        <el-dialog title="创建新项目" :visible.sync="dialogVisible" width="30%" :before-close="handleClose"
                            :modal="false" >
                            <el-form :label-position='left' label-width="80px" :model="form" @submit="" :rules="formrules"
                                ref="formRef">
                                <el-form-item label="项目封面">

                                    <input type="file" name="" id="" accept="image/*" ref="fileInput">
                                </el-form-item>
                                <!--                                 <el-form-item label="团队" prop="teamID">
                                    <el-select v-model="form.teamID" placeholder="请选择团队">
                                        <el-option :label="team.team_name" :value=team.team_id
                                            v-for="(team, index) in teams" :key="index"></el-option>
                                    </el-select>
                                </el-form-item> -->
                                <el-form-item label="项目名称" prop="projectname">
                                    <el-input v-model="form.projectname"></el-input>
                                </el-form-item>
                                <!-- <el-form-item label="项目ID">
                    <el-input v-model="form.projectID"></el-input>
                </el-form-item> -->
                                <el-form-item label="项目描述" prop="projectDescription">
                                    <el-input type="textarea" placeholder="请输入内容" v-model="form.projectDescription"
                                        maxlength="30" show-word-limit>
                                    </el-input>
                                </el-form-item>
                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="dialogVisible = false" class="ftbtn">取 消</el-button>
                                <el-button type="primary" @click="createProject()" class="ftbtn">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>


<script>
import ProjectUnit from '@/components/ProjectUnit.vue';
import { nanoid } from 'nanoid';
import { createProject, getTeamproject, getAllTeamByName, deleteProject } from '@/api/api'
import teamaside from '../components/teamaside.vue';
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {

    data() {
        return {
            temp_projectData: [],
            names: [],
            projectData: [],
            dialogVisible: false,
            form: {
                projectname: '',
                projectID: '',
                projectDescription: '',
                teamID: ''
            },
            teams: ['团队1', '团队2', 'testTeamID'],
            "team_id": ''
        }
    },
    methods: {
        search(form) {
            this.temp_projectData = []
            getTeamproject(localStorage.getItem("team_id"), localStorage.getItem('token'), 'Normal').then(res => {
                console.log(res)
                res.data.projects.forEach((project) => {
                    console.log(form.project_tar)
                    if (project.project_name.includes(form.project_tar)) {
                        this.temp_projectData.push(project)
                    }
                })
                this.projectData = this.temp_projectData
            })
        },
        startIntro() {
            //console.log("123321", localStorage.getItem("ProjectListNewB"))
            if (localStorage.getItem("ProjectListNewB")==="false") {
                //   intro.complete();
                const intro = introJs();
                intro.setOptions({
                    exitOnOverlayClick: false,
                    disableInteraction: true,
                    scrollToElement: false,
                    steps: [{
                        title: '项目列表界面',
                        intro: '在该页面可以进入项目和创建项目 👋'
                    }, {
                        element: document.querySelector('.al'),
                        title: '项目列表',
                        intro: '这里是你在该团队里的所有项目',
                        position: 'left'
                    }, {
                        element: document.querySelector('.text1'),
                        title: '添加项目',
                        intro: '在此处添加新项目',
                        position: 'bottom'
                    }, {
                        element: document.querySelector('.input-group'),
                        title: '搜索项目',
                        intro: '在这里输入关键字即可搜索所有相关项目',
                        position: 'top'
                    }],
                }).start();
                localStorage.setItem("ProjectListNewB", true);
            }
        },
        showCopyMessage() {
            this.$message({
                type: 'success',
                message: '复制成功'
            });
            getTeamproject(localStorage.getItem("team_id"), localStorage.getItem('token'), 'Normal').then(res => {
                this.names = []
                console.log(res)
                this.projectData = res.data.projects
                console.log(this.projectData)
                // for (var i = 0; i < this.projectData.length; i++) {
                //     var obj = this.projectData[i]
                //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
                // }
                // console.log(this.names)
            })
        },
        showMessage() {
            this.$message({
                type: 'success',
                message: '删除成功'
            });
            getTeamproject(localStorage.getItem("team_id"), localStorage.getItem('token'), 'Normal').then(res => {
                this.names = []
                console.log(res)
                this.projectData = res.data.projects
                console.log(this.projectData)
                // for (var i = 0; i < this.projectData.length; i++) {
                //     var obj = this.projectData[i]
                //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
                // }
                // console.log(this.names)
            })
        },
        getProject() {
            console.log(localStorage.getItem("team_id"))
            getTeamproject(localStorage.getItem("team_id"), localStorage.getItem('token'), 'Normal').then(res => {
                this.names = []
                console.log(res)
                this.projectData = res.data.projects
                console.log(this.projectData)
                // for (var i = 0; i < this.projectData.length; i++) {
                //     var obj = this.projectData[i]
                //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
                // }
                // console.log(this.names)
            })
            // console.log(localStorage.getItem("team_id"))
            // if (false) {
            //     alert('请选择团队！')
            // } else {
            //     localStorage.setItem('teamIDUsing', localStorage.getItem("team_id"))
            //     var project = new Object();

            // }

        },

        Jump() {

            this.$router.push('/project')
        },

        recyclebin() {
            console.log("change to recyclebin")
            this.$router.push({ name: 'recyclebin' }, () => { this.$router.push('/projectlist/recyclebin') })
        },
        createProject() {
            // console.log(this.teamID)
            const formData = new FormData()
            const fileInput = this.$refs.fileInput
            formData.append('project_image', fileInput.files[0])
            this.form.projectID = nanoid()
            console.log(this.form.projectID)
            formData.append('project_id', this.form.projectID)
            if (this.form.projectname === '') {
                alert('请输入项目名称！')
            } else {
                formData.append("project_name", this.form.projectname)
                if (false) {
                    alert('请选择团队!')
                } else {
                    formData.append('team_id', localStorage.getItem("team_id"))
                    console.log(this.form.teamID, formData.get('team_id'))
                    console.log(formData.get('project_image'))
                    console.log(formData.get('project_name'))
                    formData.append('project_description', this.form.projectDescription)
                    console.log(formData.get('project_description'))
                    createProject(formData, localStorage.getItem('token')).then(res => {
                        console.log(res)
                        this.getProject()
                    })

                }
            }
            // console.log(formData)
            this.$refs.formRef.resetFields()
            this.$refs.fileInput = null
            this.dialogVisible = false
        },
    },
    created() {
        // this.names=[]
        this.getProject()
    },
    mounted() {
        this.startIntro()
        //this.times()         //实时更新
    },
    components: { ProjectUnit, teamaside }
}
</script>
<style lang="scss" scoped>
.el-page-header {
    height: 60px;
    line-height: 60px;
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
}

.el-main {
    margin-left: 15px;
}

.all,
.al {
    height: 100%;
    // width: 80%;
}


.List {
    width: 1100px;
}

.ListUnit {
    margin-top: 20px;
    margin-left: 15px;
    border-radius: 10px;
    margin-bottom: 10px;
}

.text1 {
    display: block;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 20px;
}

span {
    font-size: 20px;
}


.input-group {
    width: 40%;
    height: 50%;
    background-color: rgba(255, 255, 255, 0.679);
    padding: 2px 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .2s;
    margin-left: 100px;
    float: right;
}

.input-group:hover {
    width: 55%;
    background-color: #fff8;
    box-shadow: 0 5px 40px #0002;
}

.input-group img {
    width: 20px;
    height: 20px;
}

.input-group input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
}
</style>
