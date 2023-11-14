<template>
    <!-- 测试用，测试ProjectUnit子组件 -->
    <!-- <div>
        <ProjectUnit v-for="(name,index) in names" :key="index" :name="name"></ProjectUnit>
        <iframe width="1000px" height="1000px" src="https://devops.aliyun.com/workbench?_userId=64e5bdd03f15d5487d9b552e" frameborder="0"></iframe>
    </div> -->
    <!-- <div>
        <div id="map"> </div>
    </div> -->
    <div class="contain-box">
        <el-button @click="deleteRead">删除已读</el-button>
        <el-button @click="readAllMsg">一键已读</el-button>
        <div class="left-box">
            <h1>@我的</h1>
            <MessageList class="unit" v-for="(ate, index) in atNotification" :key="index" :message-text="ate.content"
                @openDia="openDiag" @readMeg="readMeg" :message-i-d="ate.notification_id
                    " :is-read="ate.is_read" :message-time="ate.created_at"></MessageList>
        </div>
        <div class="right-box">
            <h1>团队通知</h1>
            <Notification class="unit" v-for="(system, index) in systemNotification" :key="index"
                :message-text="system.content" @openDia="openDiag" @readMeg="readMeg" :message-i-d="system.notification_id
                    " :is-read="system.is_read" :message-time="system.created_at"></Notification>
        </div>
        <el-dialog title="消息通知" :visible.sync="dialogVisible" width="30%"  :modal="false">
            <span>{{ messageTime }}</span><br>
            <span>{{ messageText }}</span>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
                <el-button type="primary" v-if="!messageIsRead" @click="readMessage">已读</el-button>
            </span>
        </el-dialog>
        <img style="position: fixed; bottom: 72px; left: 83px; height: 15%; width: 9%" src="../assets/img/wuwubo.gif"
            id="submint"/>
    </div>
</template>

<script>
import ProjectUnit from '@/components/ProjectUnit.vue';
import MessageList from '../components/MessageUnit.vue';
import Notification from '@/components/Notification.vue';
import { getUserNotification, updateNotification, deleteAllRead, readAll } from '@/api/api';
export default {
    data() {
        return {
            names: ['Johngagadsgasdgasdgasdgdsg', 'Tom', 'Peter', '', '', '', '', '', ''],
            systemNotification: [],
            atNotification: [],
            dialogVisible: false,
            messageText: '',
            messageTime: '',
            messageIsRead: false,
            messageID: ''
        };
    },
    components: { ProjectUnit, MessageList, Notification },
    mounted() {
    },
    methods: {
        readAllMsg() {
            readAll(localStorage.getItem('token')).then(res => {
                console.log(res)
                this.getAll()
            })
        },
        deleteRead() {
            deleteAllRead(localStorage.getItem('token')).then(res => {
                console.log(res)
                this.getAll()
            })
        },
        getAll() {
            getUserNotification(localStorage.getItem('username'), 'system', localStorage.getItem('token')).then(res => {
                console.log(res)
                this.systemNotification = res.data.data
                console.log(this.systemNotification)
            })
            getUserNotification(localStorage.getItem('username'), '@', localStorage.getItem('token')).then(res => {
                console.log(res)
                this.atNotification = res.data.data
                console.log(this.atNotification)
            })
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => { });
        },
        openDiag(text, time, isread, id) {
            console.log(text, time)
            this.messageText = text
            var parsedDate = new Date(time)
            // 格式化日期和时间
            var options = {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",

                // timeZoneName: "undefined",
                // timeZone: "Asia/Shanghai" // 设置时区为中国上海时区
            };
            var formattedDate = parsedDate.toLocaleString("zh-CN", options);
            this.messageIsRead = isread
            console.log(formattedDate);
            this.messageTime = formattedDate
            this.messageID = id
            console.log(id)
            this.dialogVisible = true
        },
        readMeg(id) {
            console.log(id)
            updateNotification(id, 1, localStorage.getItem('token')).then(res => {
                console.log(res)
                this.getAll()
            })
        },
        readMessage() {
            updateNotification(this.messageID, 1, localStorage.getItem('token')).then(res => {
                console.log(res)
                this.getAll()
            })
            this.dialogVisible = false
        }
    },
    created() {
        // console.log(localStorage.getItem('username'))
        this.getAll()
    }
}
</script>

<style scoped lang="scss">
.contain-box {
    height: 600px;
    position: relative;
    margin: 0 200px;
    width: 1000px;
    overflow: auto;
}

.left-box {
    left: 0;
    width: 45%;
    height: 85%;
    position: absolute;
    border-radius: 10px;
    border-bottom: none;
    border: #d3dce6 solid 1px;
    margin-top: 20px;
    padding: 12px;
    overflow: auto;
}

.right-box {
    right: 0;
    width: 45%;
    height: 85%;
    position: absolute;
    border-radius: 10px;
    border-bottom: none;
    border: #d3dce6 solid 1px;
    margin-top: 20px;
    padding: 8px;
    overflow: auto;
}

.unit {
    margin: 0 auto;
    margin-top: 20px;
    margin-left: 0px;
}

::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
}
</style>