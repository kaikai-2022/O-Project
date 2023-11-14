<template>
  <div style="width: 150%;">
    <el-container style="margin-left: 280px; width: 85%;">
      <el-container>
        <el-aside width="200px">
          <teamaside />
        </el-aside>
        <el-main>

          <div class="header" style="background-color: rgba(0,0,0,0);">
            <el-form :inlie="true" class="form">
              <el-form-item>
                <el-button type="primary" icon="el-icon-user-solid" @click="open" class="addone">邀请新成员</el-button>
              </el-form-item>
              <el-form-item>
                <div style="margin-left: 500px; margin-top: 10px;">
                  <div class="input-group">
                    <input type="search" placeholder="Search Team..." v-model="form.username">
                    <img src="../assets/img/search.png" @click="search(form)" class="search">
                  </div>
                </div>
              </el-form-item>
            </el-form>
          </div>

          <div class="conmmon-tabel" style="">
            <el-table :data="tableData" style="width: 1400px;" border :row-class-name="tableRowClassName" height="510">
              <el-table-column prop="" label="头像" align="center" width="100">

                <template slot-scope="scope">
                  <el-image :src="scope.row.imgSrc">
                  </el-image>
                </template>
              </el-table-column>

              <el-table-column prop="username" label="昵称" align="center" width="150">
              </el-table-column>
              <el-table-column prop="real_name" label="真实姓名" align="center" width="100">
              </el-table-column>
              <el-table-column prop="email" label="邮箱" align="center" width="300">
              </el-table-column>
              <el-table-column header-cell-class="column-name" prop="role" label="身份" width="100"
                :filters="[{ text: 'Member', value: 'Member' }, { text: 'Admin', value: 'Admin' }, { text: 'Creator', value: 'Creator' }]"
                :filter-method="filterTag" filter-placement="bottom-end" align="center">
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.role === 'Creator' ? 'danger' : (scope.row.role === 'Member' ? 'primary' : 'success')"
                    disable-transitions>{{ scope.row.role }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" class="change" width="280">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" class="small-button">编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                    class="small-button">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-descriptions class="margin-top" :column="2" size="mini" border>
              <el-descriptions-item label-class-name="my-label1" content-class-name="my-content1">
                <template slot="label">
                  <i class="el-icon-user"></i>
                  成员人数
                </template>
                {{ Membernum }}
              </el-descriptions-item>
              <el-descriptions-item label-class-name="my-label2" content-class-name="my-content2">
                <template slot="label">
                  <i class="el-icon-user"></i>
                  管理员人数
                </template>
                {{ Adminnum }}
              </el-descriptions-item>
            </el-descriptions>


            <el-dialog title="相关人员信息" :visible.sync="dialogFormVisible" width="600px" :modal="false">
              <div class="diatable">
                <el-table :model="pin" :data="temp_tableData">
                    <el-table-column prop="" label="头像" align="center" width="100">
                      <template slot-scope="scope">
                        <el-image :src="scope.row.imgSrc">
                        </el-image>
                      </template>
                    </el-table-column>
                  <el-table-column label="username" :label-width="formLabelWidth" prop="username">
                    <!-- <el-input v-model="pin.username" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                  <el-table-column label="email" :label-width="formLabelWidth" prop="email" width="200">
                    <!-- <el-input v-model="pin.email" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                  <el-table-column label="real_name" :label-width="formLabelWidth" prop="real_name">
                    <!-- <el-input v-model="pin.real_name" autocomplete="off" :disabled="true"></el-input> -->
                  </el-table-column>
                </el-table>
              </div>
            </el-dialog>

            <el-dialog title="将其身份修改为？" :visible.sync="dVisible" width="30%"  class="custom-dialog"
              :modal="false" >
              <!-- <span>将其身份修改为？</span> -->
              <!-- <span class="dialog-footer"> -->
              <el-button type="primary" @click="handleAdmin(Name)">Admin</el-button>
              <el-button type="primary" @click="handleMember(Name)">Member</el-button>
              <!-- </span> -->
            </el-dialog>

          </div>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import introJs from 'intro.js'
import 'intro.js/introjs.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import teamaside from '../components/teamaside.vue';
import { getAllmember } from '../api/api';
import { addmember } from '../api/api';
import { removememebr } from '../api/api';
import { findmember } from '../api/api';
import { changemember } from '../api/api';

export default {
  /* 不同身份高光不同 */
  methods: {
    search(form) {
      this.temp_tableData = []
      console.log(form.username)
      getAllmember(localStorage.getItem("team_id")).then(res => {
        console.log(res)
        res.data.data.forEach((project) => {
          //console.log(form.project_tar)
          if (project.username.includes(form.username)) {
            project.imgSrc=`http://se.leonardsaikou.top/avatars/${project.username}_avatar.png`
            this.temp_tableData.push(project)
            this.dialogFormVisible = true
          }
        })
        //this.projectData = this.temp_projectData
      })
    },
    startIntro() {
      //console.log("123321",localStorage.getItem("TeamNewB"))
      if (localStorage.getItem("ControlNewB") === "false") {
        //   intro.complete();
        const intro = introJs();
        intro.setOptions({
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: false,
          steps: [
            {
              element: document.querySelector('.addone'),
              title: '添加成员',
              intro: '点击此处通过邮箱添加新成员',
              position: 'bottom'
            },
            {
              element: document.querySelector('.input-group'),
              title: '查询用户',
              intro: '输入在此查询用户，即便记不清也没关系，我们会自动搜寻所有包含关键字的用户哦~',
              position: 'bottom'
            }, {
              element: document.querySelector('.conmmon-tabel'),
              title: '成员表格',
              intro: '可在此处身份筛选，修改成员身份或删除成员（后两者均需要一定权限哦）',
              position: 'top'
            },],
        }).start();
        localStorage.setItem("ControlNewB", true);
      }
    },
    open() {
      this.$prompt('请输入邮箱', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '已将邀请发送至 ' + value
        });
        console.log(value);
        var tid = localStorage.getItem('teamid')
        const additem = { "team_id": localStorage.getItem("team_id"), "email": value }
        console.log(additem);
        addmember(additem)
        //this.getData(localStorage.getItem('id'))
        10000;
        this.getData(localStorage.getItem("team_id"))
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    onSubmit(form) {
      console.log(form)
      findmember(form.username).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.memberData = []
          this.memberData.push(res.data.data)
          //localStorage.getItem('token')
          // console.log(this.memberData)
          // console.log(res.data.status)
          //this.memberData.pop()
          this.dialogFormVisible = true
          //if (this.tableData.length >= 1) {
          //  this.changeData()
          //}
        }
      })
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.role === 'Creator') {
        return 'warning-row';
      } else if (row.role === 'Admin') {
        return 'success-row';
      } else if (row.role === 'Member') {
        return 'background: blue';
      }
      return '';
    },
    handleEdit(index, row) {
      this.dVisible = true
      this.Name = row.username
      //console.log(2)
      console.log(this.Name)
    },
    handleAdmin(Name) {
      //console.log(1)
      console.log(Name)
      const editem = { "team_id": localStorage.getItem("team_id"), "username": Name, "role": "Admin" }
      changemember(editem).then(res => {

      }, err => {
        console.log(err)
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      this.dVisible = false
    },
    handleMember(Name) {
      console.log(1)
      console.log(Name)
      const editem = { "team_id": localStorage.getItem("team_id"), "username": Name, "role": "Member" }
      changemember(editem).then(res => {

      }, err => {
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      this.dVisible = false
    },
    handleDelete(index, row) {
      const delitem = { "team_id": localStorage.getItem("team_id"), "username": row.username }
      /*       this.$message({
              type: 'danger',
              message: '删除成功'
            }); */
      removememebr(delitem).then(res => {
        if (res.data.status = 200) {
          this.$message({
            type: 'danger',
            message: '删除成功'
          });
        }
      }, err => {
        switch (err.response.status) {
          case 403:
            alert("您无权进行此操作")
            break;
          /*           case 404:
                      alert("用户名不存在")
                      break;
                    case 400:
                      alert("请求错误")
                      break; */
        }
      })
      //console.log(index, row);
      this.getData(localStorage.getItem("team_id"))
    },
    times() {			//定义了一个times()方法来执行定时查询findDB()
      return setInterval(() => {			//setInterval换个名字就行了
        this.getData(localStorage.getItem("team_id"))
      }, 1000)		//设置时间，这里是1s
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    /* formatter(row, column) {
      return row.address;
    }, */
    filterTag(value, row) {
      return row.role === value;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    getData(id) {
      //查询数据
      console.log(id)
      getAllmember(id).then(res => {
        console.log(res)
        if (res.status === 200) {
          //this.tableData = res.data.data
          //localStorage.getItem('token')
          //console.log(this.tableData.length)
          this.Membernum = 0;
          this.Adminnum = 0;
          res.data.data.forEach((item, index) => {
            // 你可以在这里对每个 item 进行操作，如修改属性值或执行其他操作
            //console.log(item.username)
            item.imgSrc = `http://se.leonardsaikou.top/avatars/${item.username}_avatar.png`
            //console.log(item.imgSrc)
            console.log(item.role); // 打印每个项目
            if (item.role === "Member") {
              this.Membernum++;
            } else if (item.role === "Admin") {
              this.Adminnum++;
            } else {
            }
          });
          this.tableData = res.data.data
        }
      }, err => {

      })
    },
  },
  data() {

    return {
      imgSrc: `http://se.leonardsaikou.top/avatars/${localStorage.getItem("username")}_avatar.png`,
      Membernum: 0,
      Adminnum: 0,
      dVisible: false,
      formLabelWidth: '120px',
      dialogFormVisible: false,
      pin: {

      },
      Name: "",
      tableData: [],
      memberData: [],
      temp_tableData: [],
      form: {
        username: ''
      }
    }
  },
  components: {
    teamaside
  },
  /*   mounted(){
      get1Data().then((data)=>{
        console.log(data)
      })
    } */
  mounted() {
    console.log(localStorage.getItem("team_id"))
    this.getData(localStorage.getItem("team_id"))
    this.startIntro()
    //this.times()         //实时更新
  }
}
</script>
  
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}


.userForm {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-main {
  margin-left: 15px;
}

.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.my-label1 {
  background: #E1F3D8;
  width: 30px;
}

.my-label2 {
  background: #E1F3D8;
  width: 30px;
}

.my-content1{
  width:30px;
}
.my-content2{
  width: 30px;
}

.diatable {
  height: 30vh;
  overflow: auto;
}

.el-table__header {
  height: 40px;
  line-height: 40px;
}

.el-table {
  border-collapse: separate;
  border-radius: 8px;
  overflow: scroll;
}

.el-table .el-table__header {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.el-table .el-table__body {
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
}

.header {
  width: 100%;
  height: 10%;
  background-color: #fff4;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .input-group {
  width: 75%;
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

.header .input-group:hover {
  width: 105%;
  background-color: #fff8;
  box-shadow: 0 5px 40px #0002;
}

.header .input-group img {
  width: 20px;
  height: 20px;
}

.header .input-group input {
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
}

.search {
  cursor: pointer;
}

/* 表格中编辑栏按钮大小 */
.small-button {
  padding: 2px 6px;
  font-size: 5px;
  line-height: 18px;
}


/* 邀请新成员按钮大小 */
.addone {
  padding: 2px 6px;
  font-size: 5px;
  line-height: 18px;
}

.custom-dialog {
  top: '10000px'
}
</style>