<template>
    <div style="width: 900px;">
        <!-- 原型设计列表 -->
        <div >
            <el-table :data="prototypeData" style="width: 1300px" class="brach">
                <el-table-column prop="prototype_name" label="名称" width="180">
                </el-table-column>
                <el-table-column prop="prototype_description" label="原型简介">
                </el-table-column>
                <el-table-column>
                    <template slot-scope="scope">
                        <el-button-group style="float: right;">
                            <el-button type="primary" icon="el-icon-edit-outline" @click="toDesignPage(scope.row)"
                                class="but1"></el-button>
                            <el-button type="primary" icon="el-icon-edit" @click="dialogVisible = true"
                                class="but2"></el-button>
                            <el-button type="primary" icon="el-icon-delete" @click="dlt(scope.row)"
                                class="but3"></el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 生成演示 -->
        <el-row style="margin-bottom: 75px;margin-right: 65px; float: right; position: fixed; bottom: 0px; right: 0px;" class="">
            <button style="padding: 8px; border-radius: 24px; background-color: black ; padding-left: 12px;
                margin-top: 555px; margin-left: 55px;" @click="generatePreview">
                <i class="el-icon-video-camera" style="color: #fff; font-size: 17px; margin-right: 2px;"></i>
            </button>
        </el-row>

        <!-- 编辑功能 -->
        <el-dialog title="编辑原型设计" :visible.sync="editDialogVisible" width="30%" :modal="false">
            <el-form :label-position='left' label-width="80px" :model="prototypeInfo">
                <el-form-item label="名称">
                    <el-input v-model="prototypeInfo.prototype_name" clearable placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="原型简介">
                    <el-input type="text" placeholder="请输入内容" v-model="prototypeInfo.prototype_description" maxlength="30"
                        show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = false; canceledit()">取 消</el-button>
                <el-button type="primary" @click="editDialogVisible = false; editsucess()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新建原型 -->
        <el-row style="margin-bottom: 120px;margin-right: 65px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <button style="padding: 8px; border-radius: 24px; background-color: black ; padding-left: 12px;
                margin-top: 555px; margin-left: 55px;" @click="createdialog = true">
                <i class="el-icon-plus" style="color: #fff; font-size: 17px; margin-right: 2px;"></i>
            </button>
        </el-row>
        <el-dialog title="新建原型设计" :visible.sync="createdialog" width="30%" @close="handleClose" :modal="false">
            <el-form :label-position='left' label-width="80px" :model="prototypeInfo" style="margin-bottom: 20px;"
                ref="protoRef">
                <el-form-item label="名称" prop="prototype_name">
                    <el-input v-model="prototypeInfo.prototype_name" clearable placeholder="请输入名称"></el-input>
                </el-form-item>
                <el-form-item label="原型简介" prop="prototype_description">
                    <el-input type="text" placeholder="请输入内容" v-model="prototypeInfo.prototype_description" maxlength="30"
                        show-word-limit>
                    </el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createCancel">取消</el-button>
                <el-button type="primary" @click="createPtype">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 生成演示 -->
        <el-dialog title="演示地址" :visible.sync="urlVisible" width="30%" :modal="false">
            <span>{{ displayUrl }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="urlVisible = false">取 消</el-button>
                <el-button type="primary" @click="urlVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { createPrototype, getAllPrototype, getPrototypeByID, deletePrototype } from '@/api/api';
import axios from 'axios';
import { nanoid } from 'nanoid';

import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
    data() {
        return {
            urlVisible: false,
            editDialogVisible: false,
            createdialog: false,
            prototypeInfo: {
                "prototype_name": '',
                "prototype_description": '',
                "prototype_id": '',
                "data_str": '[]',
                "style_str": '{"width":1200,"height":740,"scale":100,"color":"#000","opacity":1,"background":"#fff","fontSize":14}'
            },
            prototypeData: [],
            displayUrl: ''

        }
    },
    created() {
        getAllPrototype(localStorage.getItem('projectID'), 'Normal', localStorage.getItem('token')).then(res => {
            console.log(res)
            this.prototypeData = res.data.data
        })
    },
    mounted() {
        this.startIntro()
    },
    methods: {
        generatePreview() {
            console.log('生成演示')
            console.log(window.location.href)
            this.displayUrl = 'http://localhost:8080/previewpage/' + localStorage.getItem('projectID')
            this.urlVisible = true
        },
        startIntro() {
            //console.log("123321",localStorage.getItem("TeamNewB"))
            if (localStorage.getItem("DesignListNewB") === "false") {
                //   intro.complete();
                const intro = introJs();
                intro.setOptions({
                    exitOnOverlayClick: false,
                    disableInteraction: true,
                    scrollToElement: false,
                    steps: [
                        {
                            element: '.brach',
                            title: '原型设计列表',
                            intro: '这是项目中所有原型设计的列表',
                            position: 'right',
                        },
                        {
                            element: '.el-icon-plus',
                            title: '新建功能',
                            intro: '点击此按钮，可以创建新的项目原型',
                            position: 'left',
                        },
                        {
                            element: '.el-icon-video-camera',
                            title: '生成演示功能',
                            intro: '点击此按钮，可以生成具有演示效果的链接哦',
                            position: 'left',
                        },],
                }).start();
                localStorage.setItem("DesignListNewB", true);
            }
        },
        handleClose() {
            this.$refs.protoRef.resetFields();
        },
        search() {
            this.$prompt('请输入搜索内容', '搜索', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ }) => {
                this.$message({
                    type: 'success',
                    message: '搜索成功'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消搜索'
                });
            });
        },
        dlt(row) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var prototype = { "prototype_id": row.prototype_id }
                console.log(prototype)
                deletePrototype(prototype, localStorage.getItem('token')).then(res => {
                    console.log(res)
                })
                getAllPrototype(localStorage.getItem('projectID'), 'Normal', localStorage.getItem('token')).then(res => {
                    console.log(res)
                    this.prototypeData = res.data.data
                })
                this.$message({
                    type: 'success',
                    message: '删除成功'
                });
            }).catch(() => {

                this.$message({
                    type: 'warning',
                    message: '取消删除'
                });
            });
        },
        canceledit() {
            this.$message({
                type: 'warning',
                message: '取消编辑'
            });
        },
        editsucess() {
            this.$message({
                type: 'success',
                message: '编辑成功'
            });
        },
        createsucess() {
            console.log("change to design")
            this.$router.push({ name: 'design' }, () => { this.$router.push('/project/design') })
        },
        toDesignPage(row) {
            fetch(`https://se.leonardsaikou.top/prototype_files/${row.prototype_id}_style.txt?nocache=${new Date().getTime()}`).then(response1 => response1.text()).then(data1 => {
                console.log(data1)
                // console.log(row.prototype_id)
                fetch(`https://se.leonardsaikou.top/prototype_files/${row.prototype_id}_data.txt?nocache=${new Date().getTime()}`).then(response => response.text()).then(data => {
                    localStorage.setItem('canvasStyle', data1)
                    console.log(localStorage.getItem('canvasStyle'))
                    console.log(row.prototype_id)
                    localStorage.setItem('canvasData', data)
                    console.log(localStorage.getItem('canvasData'))
                    localStorage.setItem('prototype_description', row.prototype_description)
                    localStorage.setItem('prototype_name', row.prototype_name)
                    // console.log(row)
                    console.log("change to design")
                    localStorage.setItem('prototype_id', row.prototype_id)
                    console.log(localStorage.getItem('prototype_id'))
                    // getPrototypeByID(row.prototype_id, localStorage.getItem('token')).then(res => {
                    //     console.log(res)
                    // })
                    this.$router.push({ name: 'design' }, () => { this.$router.push('/project/design') })
                })
            })



        },
        createPtype() {
            console.log(this.prototypeInfo)
            if (this.prototypeInfo.prototype_name === '') {
                this.$message({
                    type: 'error',
                    message: '请输入设计原型名称！'
                });
            } else {
                const formData = new FormData()
                formData.append('prototype_name', this.prototypeInfo.prototype_name)
                formData.append('prototype_description', this.prototypeInfo.prototype_description)
                this.prototypeInfo.prototype_id = nanoid()
                formData.append('prototype_id', this.prototypeInfo.prototype_id)
                formData.append('project_id', localStorage.getItem('projectID'))
                formData.append('data_str', this.prototypeInfo.data_str)
                formData.append('style_str', this.prototypeInfo.style_str)
                console.log(formData)
                createPrototype(formData, localStorage.getItem('token')).then(res => {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '设计原型创建成功！'
                    });

                })
                getAllPrototype(localStorage.getItem('projectID'), 'Normal', localStorage.getItem('token')).then(res => {
                    console.log(res)
                    this.prototypeData = res.data.data
                })
                this.$refs.protoRef.resetFields();
                this.createdialog = false;
            }

        },
        createCancel() {
            this.createdialog = false;
            this.$refs.protoRef.resetFields();
        }
    },
}

</script>


<style lang="scss" scoped>
.text {
    font-size: 14px;
    text-align: left;
}

.el-table {
    overflow: hidden;
    margin-left: -50px;
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

button:hover {
    margin-right: 5px;
}
</style>