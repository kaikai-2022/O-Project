<template>
    <div style="width: 150%;">
        <el-container style="margin-left: 280px; width: 85%;">
            <el-container>
                <el-aside width="201px">
                    <teamaside />
                </el-aside>
                <el-main class="all">
                    <div class="List">
                        <ProjectUnitBin class="unit ListUnit" v-for="(name, index) in projectData" :key="index"
                            :name="name.project_name" :project-i-d="name.project_id" :delete-pro="deleteProject"
                            @project-deleted="showMessage" @project-recovered="recoverMessage">
                        </ProjectUnitBin>
                    </div>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>
<script>
import ProjectUnit from '@/components/ProjectUnit.vue';
import ProjectUnitBin from '@/components/ProjectUnitBin.vue';
import { nanoid } from 'nanoid';
import { createProject, getTeamproject, getAllTeamByName, deleteProject } from '@/api/api'
import teamaside from '../components/teamaside.vue';
import introJs from 'intro.js'
    import 'intro.js/introjs.css';
export default {

    data() {
        return {
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
        startIntro() {
            if (localStorage.getItem("BinNewB") === "false") {
                const intro = introJs();
                intro.setOptions({
                    exitOnOverlayClick: false,
                    disableInteraction: true,
                    scrollToElement: false,
                    steps: [
                        {
                            element: document.querySelector('.all'),
                            title: '回收站列表',
                            intro: '这里是所有团队中删除的项目（可以恢复哦，但是再删除的话可就不行了）',
                            position: 'right'
                        },],
                }).start();
                localStorage.setItem("BinNewB", true);
            }
        },
        recoverMessage() {
            this.$message({
                type: 'success',
                message: '恢复成功'
            });
            // getTeamproject(this.team_id, localStorage.getItem('token'), 'Deleted').then(res => {
            //     this.names = []
            //     console.log(res)
            //     this.projectData = res.data.projects
            //     console.log(this.projectData)
            //     // for (var i = 0; i < this.projectData.length; i++) {
            //     //     var obj = this.projectData[i]
            //     //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
            //     // }
            //     // console.log(this.names)
            // })
            this.getProject()
        },
        showMessage() {
            this.$message({
                type: 'success',
                message: '删除成功'
            });
            // getTeamproject(localStorage.getItem('team_id'), localStorage.getItem('token'), 'Deleted').then(res => {
            //     this.names = []
            //     console.log(res)
            //     this.projectData = res.data.projects
            //     console.log(this.projectData)
            //     // for (var i = 0; i < this.projectData.length; i++) {
            //     //     var obj = this.projectData[i]
            //     //     this.names.push(obj.project_name); // 将 name 属性添加到新数组中
            //     // }
            //     // console.log(this.names)
            // })
            this.getProject()
        },
        getProject() {
            // console.log(this.team_id)
            // if (this.teamID === '') {
            //     alert('请选择团队！')
            // } else {
            //     localStorage.setItem('teamIDUsing', this.team_id)
            //     var project = new Object();
            //     getTeamproject(this.team_id, localStorage.getItem('token'), 'Deleted').then(res => {
            //         this.names = []
            //         console.log(res)
            //         this.projectData = res.data.projects
            //         console.log(this.projectData)
            //     })
            // }
            getTeamproject(localStorage.getItem('team_id'), localStorage.getItem('token'), 'Deleted').then(res => {
                this.names = []
                console.log(res)
                this.projectData = res.data.projects
                console.log(this.projectData)
            })
        },
        goBack() {
            console.log('go back');
            this.$router.push('/workspace')
        },
        Jump() {

            this.$router.push('/project')
        },
        testFunc() {
            console.log('test')
        },
        recyclebin() {
            console.log("change to recyclebin")
            this.$router.push({ name: 'recyclebin' }, () => { this.$router.push('/projectlist/recyclebin') })
        },
        // getTeams() {
        //     getAllTeamByName(localStorage.getItem('username'), localStorage.getItem('token')).then(res => {
        //         this.teams = res.data.data
        //         console.log(this.teams)
        //     })
        // }
    },
    created() {
        // this.names=[]
        // this.getTeams()
        this.getProject()
    },
    mounted(){
        this.startIntro()
    },
    components: { ProjectUnit, ProjectUnitBin, teamaside }
}
</script>
<style lang="scss" scoped>
.el-page-header {
    height: 60px;
    line-height: 60px;
    box-shadow: 0 0 5px rgba($color: #000000, $alpha: 0.2);
}

.topbar {
    width: 100%;
    height: 60px;
    background-color: aqua;
}

.List {
    width: 1400px;
}

.ListUnit {
    margin-top: 20px;
    margin-left: 40px;
    border-radius: 10px;
}

.text {
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
</style>