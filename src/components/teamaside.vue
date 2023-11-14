<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse">
        <el-menu-item index="1" @click="Totin" class="menu-1">
            <i class="el-icon-more"></i>
            <span slot="title">团队信息介绍</span>
        </el-menu-item>
        <el-menu-item index="2" @click="Tocontrol" class="menu-2">
            <i class="el-icon-s-custom"></i>
            <span slot="title">成员管理</span>
        </el-menu-item>
        <!--         <el-menu-item index="3" @click="Tome" class="menu-3">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息介绍</span>
        </el-menu-item> -->
        <el-menu-item index="3" @click="ToPcp" class="menu-3">
            <i class="el-icon-s-management"></i>
            <span slot="title">团队项目</span>
        </el-menu-item>
        <el-menu-item index="4" @click="ToBin" class="menu-4">
            <i class="el-icon-delete"></i>
            <span slot="title">项目回收站</span>
        </el-menu-item>
        <el-menu-item index="5" @click="Tomessage" class="menu-5">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">聊天室</span>
        </el-menu-item>
    </el-menu>
</template>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 190px;
    min-height: 600px;
    font-family: JingNanFont;
}

.el-menu-item{
    margin-top: 5px;
    margin-left: 12px;
    width: 170px;
    border-radius: 5%;
    opacity: 75%;
}
span{
    margin-left: 5px;
    font-size: 18px;
    margin-right: 20px;
}

.el-menu-item:hover {
    margin-left: 20px;
    margin-bottom: 15px;
    opacity: 100%;
}

.introjs-overlay {
    /*  background: rgba(234, 16, 16, 0.8); */
    /* 设置为深灰色半透明 */
}
</style>

<script>

import introJs from 'intro.js'
import 'intro.js/introjs.css';

export default {
    data() {
        return {
            isCollapse: false,
            menuDate: [
                {
                    path: '/team-introduce',
                    label: '团队介绍'
                },
                {
                    path: '/control-team',
                    label: '团队管理'
                },
                {
                    path: '/me-introduce',
                    label: '团队介绍'
                }, {
                    path: '/projects',
                    label: '团队项目'
                }
            ]
        };
    },
    methods: {
        startIntro() {
            //console.log("123321",localStorage.getItem("TeamNewB"))
            if (localStorage.getItem("TeamNewB") === "false") {
                //   intro.complete();
                const intro = introJs();
                intro.setOptions({
                    exitOnOverlayClick: false,
                    disableInteraction: true,
                    scrollToElement: false,
                    steps: [{
                        title: '团队界面',
                        intro: '欢迎来到团队界面! 👋'
                    },
                    {
                        element: document.querySelector('.menu-1'),
                        title: '团队信息',
                        intro: '点击此处可以查看团队相关信息',
                        position: 'right'
                    },
                    {
                        title: 'Farewell!',
                        element: document.querySelector('.menu-2'),
                        title: '成员管理',
                        intro: '即当前页面，可以用来添加删除成员，修改成员身份',
                        position: 'right'
                    },
                     {
                        element: document.querySelector('.menu-3'),
                        title: '团队项目',
                        intro: '在这里可以点击进入项目列表，查看或创建你的新项目哦',
                        position: 'right'
                    }, {
                        element: document.querySelector('.menu-4'),
                        title: '项目回收站',
                        intro: '在此处可以查看被您删除的项目（可以回收哦，但是注意！再次删掉可就找不回来了）',
                        position: 'right'
                    },  {
                        element: document.querySelector('.menu-5'),
                        title: '聊天室',
                        intro: '这里包含你们团队里的各种聊天哦~群聊私聊皆可',
                        position: 'right'
                    },],
                    //overlayOpacity: 1.0, // 设置遮罩层透明度
                    disableInteraction: true, // 禁止用户与遮罩层下方的元素进行交互
                }).start();
                localStorage.setItem("TeamNewB",true);
            }
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        Tocontrol() {
            this.$router.push({ name: 'control' }, () => { this.$router.push('/control-team') })
        },
        Totin() {
            this.$router.push({ name: 'tin' }, () => { this.$router.push('/team-introduce') })
        },
        Tome() {
            this.$router.push({ name: 'me' }, () => { this.$router.push('/me-introduce') })
        },
        ToPcp() {
            this.$router.push({ name: 'Pcp' }, () => { this.$router.push('/ProjectList-copy') })
        },
        ToBin()
        {
            this.$router.push({ name: 'bin' }, () => { this.$router.push('/ProjectList-Bin') })
        },
        Tomessage(){
            this.$router.push({ name: 'message' }, () => { this.$router.push('/message') })
        }
    },
    mounted() {
        this.startIntro();
    }
}
</script>

