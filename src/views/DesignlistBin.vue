<template>
    <div style="width: 900px;">
        <!-- 原型设计列表 -->
        <el-table :data="prototypeData" style="width: 100%">
            <!-- <el-table-column prop="date" label="日期" width="180">
            </el-table-column> -->
            <el-table-column prop="prototype_name" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="prototype_description" label="原型简介">
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-button-group style="float: right;">
                        <el-button type="primary" icon="el-icon-refresh-left" @click="restoreProto(scope.row)"></el-button>
                        <!-- <el-button type="primary" icon="el-icon-view" @click=""></el-button> -->
                        <el-button type="primary" icon="el-icon-delete" @click="dlt(scope.row)"></el-button>
                    </el-button-group>
                </template>
            </el-table-column>
        </el-table>


        <!-- 编辑功能 -->
        <el-dialog title="编辑原型设计" :visible.sync="editDialogVisible" width="30%" :modal="false">
            <el-form :label-position='left' label-width="80px" :model="prototypeInfo">
                <!-- <el-form-item label="日期">
                    <el-col :span="11">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date"
                            style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item> -->
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


    </div>
</template>

<script>
import { createPrototype, getAllPrototype, getPrototypeByID, deletePrototype, recoverPrototype } from '@/api/api';
import axios from 'axios';
import { nanoid } from 'nanoid';
export default {
    data() {
        return {
            editDialogVisible: false,
            createdialog: false,
            prototypeInfo: {
                "prototype_name": '',
                "prototype_description": '',
                "prototype_id": '',
                "data_str": '[]',
                "style_str": '{"width":1200,"height":740,"scale":100,"color":"#000","opacity":1,"background":"#fff","fontSize":14}'
            },
            prototypeData: []

        }
    },
    created() {
        getAllPrototype(localStorage.getItem('projectID'), 'Deleted', localStorage.getItem('token')).then(res => {
            console.log(res)
            this.prototypeData = res.data.data
        })
    },
    methods: {
        restoreProto(row) {
            this.$confirm('是否恢复此设计原型?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '恢复成功'
                });
                var prototype = { "prototype_id": row.prototype_id }
                recoverPrototype(prototype, localStorage.getItem('token')).then(res => {
                    getAllPrototype(localStorage.getItem('projectID'), 'Deleted', localStorage.getItem('token')).then(res => {
                        console.log(res)
                        this.prototypeData = res.data.data
                    })
                })
            }).catch(() => {

                this.$message({
                    type: 'warning',
                    message: '取消'
                });
            });
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
            this.$confirm('此操作将彻底删除该设计原型, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var prototype = { "prototype_id": row.prototype_id }
                console.log(prototype)
                deletePrototype(prototype, localStorage.getItem('token')).then(res => {
                    console.log(res)
                    getAllPrototype(localStorage.getItem('projectID'), 'Deleted', localStorage.getItem('token')).then(res => {
                        console.log(res)
                        this.prototypeData = res.data.data
                    })
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
            this.$router.push({ name: 'design' }, () => { this.$router.push('/project/designlist/design') })
        },

        createCancel() {
            this.createdialog = false;
            this.$refs.protoRef.resetFields();
        }
    }
}

</script>


<style lang="scss" scoped>
.text {
    font-size: 14px;
    text-align: left;
}

.item {
    padding: 5px 0;
}

.el-table {
    overflow: auto;
    margin-left: -50px;
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