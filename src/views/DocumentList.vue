<template>
    <div style="width: 100%;">
        <!-- 文档列表 -->
        <!-- <el-table :data="documents" style="width: 1000px;">

            <el-table-column prop="doc_id" label="文档ID" width="300">
            </el-table-column>

            <el-table-column prop="doc_name" label="文档名称" width="300">
            </el-table-column>

            <el-table-column prop="editable_by_guests" label="游客权限" width="100">
            </el-table-column>

            <el-table-column >
                <template slot-scope="scope">
                    <el-button-group style="float: right;">
                    <el-button type="primary" icon="el-icon-edit-outline" @click="goDocument(scope.row)"></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="dlt(scope.row)"></el-button>
                </el-button-group>
                </template>
                
            </el-table-column>
        </el-table> -->
        
        <div class="custom-tree-container" style="width: 1000px; display: flex; justify-content: center; align-items: flex-start; margin-top: 20px;">
            <div class="block" style="width: 600px; margin-left: -110px;">
                <p style="font-size: 24px; text-align: center;">
                    项目文档树
                </p>
                <el-tree
                :data="data"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div>
                        <i class="el-icon-folder" v-if="data.node_type === 'Folder' " style="margin-right: 7px;"></i>
                        <i class="el-icon-document" v-if="data.node_type === 'Doc' " style="margin-right: 7px;"></i>
                        <a @click="goDocument(node, data)" style="font-size: 20px;">{{ node.label }}</a>
                    </div>
                    <span>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => append(node, data)"
                        style="font-size: 24px;">
                        添加
                    </el-button>
                    <el-button
                        type="text"
                        size="mini"
                        @click="() => dlt(node, data)"
                        style="font-size: 24px;">
                        删除
                    </el-button>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>

        <!-- 新建文档 -->
        <!-- <el-row style="margin-bottom: 75px;margin-right: 35px; float: right; position: fixed; bottom: 0px; right: 0px;">
            <el-button @click="createdialog = true" circle>
                <i class="el-icon-plus"></i>
            </el-button>
        </el-row> -->

        <!-- <el-dialog title="修改文件夹/文档名称" :visible.sync="createdialog1" width="30%" :before-close="handleClose">
            <el-form :label-position='left' label-width="120px" :model="msg" :rules="rules" style="margin-bottom: 20px;">
                <el-form-item label="文件夹/文档名称">
                    <el-input v-model="msg.doc_name" clearable placeholder="请输入新的文件夹/文档名称"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createdialog1 = false">取消</el-button>
                <el-button type="primary" @click="">确 定</el-button>
            </span>
        </el-dialog> -->

        <el-dialog title="新建文件夹/文档" :visible.sync="createdialog2" width="30%" :modal="false">
            <el-form :label-position="left" label-width="120px" :model="msg" :rules="rules" style="margin-bottom: 20px;">
                <el-radio v-model="radio" label="1" style="margin-bottom: 20px;">文件夹</el-radio>
                <el-radio v-model="radio" label="2" style="margin-bottom: 20px;">文档</el-radio>
            </el-form>
            <el-form :label-position="left" label-width="120px" :model="msg" :rules="rules" style="margin-bottom: 20px;" v-if="radio === '1'">
                <el-form-item label="设置文件夹名称">
                    <el-input v-model="msg.node_name" clearable placeholder="请输入文件夹名称"></el-input>
                </el-form-item>
            </el-form>
            <el-form :label-position="left" label-width="120px" :model="msg" :rules="rules" style="margin-bottom: 20px;" v-if="radio === '2'">
                <el-form-item label="设置文档名称">
                    <el-input v-model="msg.node_name" clearable placeholder="请输入文档名称"></el-input>
                </el-form-item>
            </el-form>
            <!-- 添加模板选择 -->
            <el-form :label-position="left" label-width="120px" :model="msg" :rules="rules" style="margin-bottom: 20px;" v-if="radio === '2'">
                <el-form-item label="选择文档模板" >
                    <el-select v-model="value" placeholder="选择模板" @change="OptionChange">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createdialog2 = false">取消</el-button>
                <el-button type="primary" @click="() => creDocument(this.currentData, this.currentNode)">确 定</el-button>
            </span>
        </el-dialog>


    </div>
</template>

<script>
import { nanoid } from 'nanoid';
import { getProjectDocument, createDocument, deleteDocument } from '@/api/api';
import { getNode, addNode, changeNode, getAllNode, getChildrenNode, deleteNode } from '@/api/api';
let id = 1000;
export default {
    data() {
        return {
            options: [{
                value: 'option1',
                label: '产品规划'
                }, {
                value: 'option2',
                label: '工作周报'
                }, {
                value: 'option3',
                label: '会议纪要'
                }, {
                value: 'option4',
                label: '需求规格说明书'
                }, {
                value: 'option5',
                label: '需求调研报告'
                },{
                value: 'option6',
                label: '空白模板'
                },],
            value: '',
            data: [],
            dialogVisible: false,
            createdialog1: false,
            createdialog2: false,
            radio: '1',
            // form: {
            //     doc_id: '',
            //     doc_name: '',
            //     editable_by_guests:'',
            // },
            msg: {
                doc_name: '',
                doc_id: '',
                project_id: '',
                editable_by_guests:'',
                node_name: '',
                node_type: '',
                node_id: '',
                parent_id: '',
                model_id: '',
            },
            // documents: [],
            currentNode: '',
            currentData: '',
        }
    },
//     "data": [
//         {
//             "id": "001",
//             "label": "root",
//             "children": [
//                 {
//                     "id": "002",
//                     "label": "\u5c3c\u822a",
//                     "children": [
//                         {
//                             "id": "004",
//                             "label": "\u8f6f\u9662",
//                             "children": []
//                         }
//                     ]
//                 },
//                 {
//                     "id": "003",
//                     "label": "nm",
//                     "children": []
//                 },
//                 {
//                     "id": "007",
//                     "label": "123",
//                     "children": []
//                 }
//             ]
//         }
//     ]
// }
    methods: {
        OptionChange() {
        // 在这里根据选项的值执行不同的方法
        if (this.value === 'option1') {
            console.log(454165)
            localStorage.setItem('model_id', "template1")
            // this.msg.model_id = "template1"
        } else if (this.value === 'option2') {
            localStorage.setItem('model_id', "template2")
        } else if (this.value === 'option3') {
            localStorage.setItem('model_id', "template3")
        } else if (this.value === 'option4') {
            localStorage.setItem('model_id', "template4")
        } else if (this.value === 'option5') {
            localStorage.setItem('model_id', "template5")
            //存一下我要需求规格说明书模板
        } else if (this.value === 'option6') {
            localStorage.setItem('model_id', null)
            //存一下我要需求规格说明书模板
        }
    },
        //新建子节点，可能是文档，可能是文件夹
        append(node, data) {
            this.createdialog2 = true;
            this.currentData = data;
            this.currentNode = node;
            // const newChild = { id: id++, label: 'testtest', children: [] };
            // if (!data.children) {
            // this.$set(data, 'children', []);
            // }
            // data.children.push(newChild);
        },

    //   remove(node, data) {
    //     this.currentData = data;
    //     this.currentNode = node;
    //   },
        //删除文档或文件夹 递归删除，文件夹仅递归删除节点，文档还要删除文档
        dlt(node,data) {
            getNode(node.data.id).then(res => {
                if (res.data.status === 'success') {
                    if(res.data.data.node_type === 'Doc'){
                        this.$confirm('此操作将永久删除该文档， 是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.msg.node_id = res.data.data.node_id;
                        deleteNode(this.msg).then(res1 => {
                            if(res1.data.status === 'success'){
                                deleteDocument(res.data.data.doc_id).then(res0 => {
                                if (res0.data.status === 'success') {
                                    console.log("delete document")
                                    this.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    });
                                    const parent = node.parent;
                                    const children = parent.data.children || parent.data;
                                    const index = children.findIndex(d => d.id === data.id);
                                    children.splice(index, 1);
                                    // location.reload()
                                } else {      
                                    this.$message({
                                        type: 'warning',
                                        message: '删除失败'
                                    });
                                }
                            }
                        )   
                    }else{
                        this.$message({
                            type: 'warning',
                            message: '删除失败'
                        });
                    }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '取消删除'
                        });
                    });
                }else{
                    this.$confirm('此操作将永久删除该文件夹及其内部文档，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.msg.node_id = res.data.data.node_id;
                        deleteNode(this.msg).then(res1 => {
                            if(res1.data.status === 'success'){
                                this.$message({
                                        type: 'success',
                                        message: '删除成功'
                                    });
                                    const parent = node.parent;
                                    const children = parent.data.children || parent.data;
                                    const index = children.findIndex(d => d.id === data.id);
                                    children.splice(index, 1);
                            }else{
                                this.$message({
                                        type: 'warning',
                                        message: '删除失败'
                                    });
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'warning',
                            message: '取消删除'
                        });
                    });
                }  
            }
        })    
    },
        //新建文档/文件夹
        creDocument(data, node) {
            if(this.radio === '1'){//文件夹
                this.msg.doc_id = null;
                this.msg.node_type = "Folder";
                this.msg.parent_id = node.data.id;
                const addid = nanoid()
                this.msg.node_id = this.msg.parent_id + "_" + addid;
                this.msg.model_id = null;
                    addNode(this.msg).then(res => {
                        if (res.data.status === 'success') {
                            console.log("add floder")
                            this.$message({
                                type: 'success',
                                message: '新建文件夹成功'
                            });
                            const newChild = { id: this.msg.parent_id + "_" + addid, label: this.msg.node_name, children: [] };
                            if (!data.children) {
                                this.$set(data, 'children', []);
                            }
                            data.children.push(newChild);
                            location.reload()
                        } else {      
                            this.$message({
                                type: 'warning',
                                message: '不可新建文件夹'
                            });
                        }
                    }
            )
              
            } else{//文档
                //先判断当前是几级 一级 二级可以 三级不可以
                this.msg.doc_id = nanoid()
                this.msg.project_id = localStorage.getItem('projectID')
                this.msg.node_type = "Doc";
                this.msg.parent_id = node.data.id;
                const addid = nanoid()
                this.msg.doc_name = this.msg.node_name
                this.msg.node_id = this.msg.parent_id + "_" + addid;
                console.log(111);
                console.log(localStorage.getItem('model_id'));
                this.msg.model_id = localStorage.getItem('model_id')
                createDocument(this.msg).then(res => {
                        if (res.data.status === 'success') {
                            console.log("create document")
                            addNode(this.msg).then(res0 => {
                                if (res0.data.status === 'success') {
                                console.log("add document")
                            this.$message({
                                type: 'success',
                                message: '新建文档成功'
                            });
                            const newChild = { id: this.msg.parent_id + "_" + addid, label: this.msg.node_name, children: [] };
                            if (!data.children) {
                                this.$set(data, 'children', []);
                            }
                            data.children.push(newChild);
                            location.reload()
                        } else {      
                            this.$message({
                                type: 'warning',
                                message: '不可新建文档'
                            });
                        }
                    }
            )
                            } 
                        }
                )
                }
            this.createdialog2 = false;
        },
        //编辑文档的跳转
        goDocument(node, data) {
            console.log(data)
            console.log(node)
            getNode(node.data.id).then(res => {
                if (res.data.status === 'success') {
                    if(res.data.data.node_type === 'Doc'){
                        console.log("go document")
                        this.$router.push({ name: 'document' }, () => { this.$router.push(`/edit/zbF4x7csscvduVT3K-nuq`) })
                    }  
                }
            })
        },
    },
    //获取该项目所有文档，更新列表
    created(){
        //这是获取文档的所有信息，现在改成获取结点树的
        // getProjectDocument(localStorage.getItem('projectID'))
        //     .then(res=>{
        // // 请求成功，更新 documents 数组
        //     this.documents = res.data.data; // 假设 res.data 是返回的文档数据数组
        //     console.log(this.documents)
        // // 使用 map 方法遍历数组中的每个元素
        //     this.documents = this.documents.map(doc => {
        //         if (doc.editable_by_guests === true) {
        //         doc.editable_by_guests = "可编辑";
        //         } else {
        //         doc.editable_by_guests = "只读";
        //         }
        //         return doc; // 返回修改后的元素
        //     });
        //     console.log(this.documents)
        // },err=>{

        // })
        // this.msg.model_id = "";
        getAllNode().then(res=>{
            //传入属于当前项目的树
            this.msg.project_id = localStorage.getItem('projectID')
            this.msg.node_id = this.msg.project_id + "_001";
            console.log(this.msg.node_id)
            getChildrenNode(this.msg.node_id).then(res0 => {
                console.log(res0)
                    this.data = res0.data.data;
            })
        })

    }
}
</script>
<style lang="scss" scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

.text {
    font-size: 14px;
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
</style>