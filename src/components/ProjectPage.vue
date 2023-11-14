<template>
    <!-- 顶部导航 -->
    <el-container style="height: 100%; border: 1px solid #eee">
        <!-- <el-header style="height: 60px; background-color: transparent;" >
            <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-top: 18px; margin-left: 5px;" class="bread">
                <el-breadcrumb-item :to="{ path: '/' }" style="font-size: 18px;">首页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/projectlist' }" style="font-size: 18px;">项目</el-breadcrumb-item>
                <el-breadcrumb-item style="font-size: 18px;">{{ projectName }}</el-breadcrumb-item>
                <el-breadcrumb-item></el-breadcrumb-item>
            </el-breadcrumb>
        </el-header> -->

        <!-- 侧边栏导航 -->
        <el-container style="height: 100%;">
            <el-aside>
                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
                    :collapse="isCollapse" style="height: 55%;">
                    <el-menu-item index="1" @click="main" class="menu-1">
                        <i class="el-icon-menu" ></i>
                        <span slot="title">概览</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="designlist" class="menu-2">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">原型设计</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="document" class="menu-3">
                        <i class="el-icon-document"></i>
                        <span slot="title">文档</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="designlistbin" class="menu-4">
                        <i class="el-icon-delete"></i>
                        <span slot="title">原型回收站</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <!-- 路由占位符 -->
            <router-view></router-view>
        </el-container>

    </el-container>
</template>
<script>
import { getProjectData } from '@/api/api';
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
    data() {
        return {
            projectName: ''
        }
    },
    methods: {
        startIntro() {
            //console.log("123321",localStorage.getItem("TeamNewB"))
            if (localStorage.getItem("ProjectNewB") === "false") {
                //   intro.complete();
                const intro = introJs();
                intro.setOptions({
                    exitOnOverlayClick: false,
                    disableInteraction: true,
                    scrollToElement: false,
                    steps: [{
                        title: '项目界面',
                        intro: '欢迎来到项目界面! 👋'
                    },
                    {
                        element: document.querySelector('.menu-1'),
                        title: '概览',
                        intro: '可以看到该项目的相关信息并且编辑',
                        position: 'right'
                    },
                    {
                        element: document.querySelector('.menu-2'),
                        title: '原型设计',
                        intro: '可在此处进行该项目的原型设计',
                        position: 'right'
                    },
                     {
                        element: document.querySelector('.menu-3'),
                        title: '文档',
                        intro: '可在此处创建管理该项目的文档',
                        position: 'right'
                    },  {
                        element: document.querySelector('.menu-4'),
                        title: '原型回收站',
                        intro: '可在此处看到被删除的原型，与项目一样哦~',
                        position: 'right'
                    }],
                    //overlayOpacity: 1.0, // 设置遮罩层透明度
                    disableInteraction: true, // 禁止用户与遮罩层下方的元素进行交互
                }).start();
                localStorage.setItem("ProjectNewB",true);
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },

        main() {
            console.log("change to main")
            this.$router.push({ name: 'main' }, () => { this.$router.push('/project') })
        },
        designlist() {
            console.log("change to design")
            this.$router.push({ name: 'designlist' }, () => { this.$router.push('/project/designlist') })
        },
        setting() {
            console.log("change to setting")
            this.$router.push({ name: 'setting' }, () => { this.$router.push('/project/setting') })
        },
        document() {
            console.log("change to document")
            this.$router.push({ name: 'document' }, () => { this.$router.push('/project/documentlist') })
        },
        designlistbin()
        {
            this.$router.push({ name: 'designlistbin' }, () => { this.$router.push('/project/designlistbin') })
        }
    },
    mounted(){
        this.startIntro();
    }
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    margin-top: 10px;
    width: 200px;
    text-align: left;
    // margin-bottom: 95%;
}

.el-header {
    color: transparent;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    text-align: center;
    line-height: 200px;
    color: #333;
    background-color: transparent;
}

.el-main {
    text-align: center;
    line-height: 50px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 20px;
}
</style>