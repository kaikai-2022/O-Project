<template lang="">
  <div>
    <div class="message-wrapper">
      <div class="group-list-box">
        <div class="group-list-header">
          <div class="return-button" @click="returnTeam"><i class="el-icon-arrow-left"></i></div>
          <div class="title" @click="groupSetting">团队交流</div>
        </div>
        <div class="group-list">
          <ul  v-if="!showGroupSetting">
            <li v-for="item in groupList"
            :key="item.group_id"
            >
              <div class="group-item"
              :class="{ 'selected-group' : item.group_id === selectedGroup.group_id }"
              v-if="onlyShowTeamGroup === false || item.group_id === teamId + '_default'"
              @click="selectGroup(item)"
              >
                {{ groupName(item.group_name) }} <br>
                <span style="color:rgb(186, 228, 232, 1);">{{ item.group_type}}</span>
              </div>
            </li>
          </ul>
          <div class="group-list-setting" v-if="showGroupSetting">
            <div class="group-list-item" 
            @click="onlyShowTeamGroup = !onlyShowTeamGroup"
            :class="{ 'group-list-item-on' : onlyShowTeamGroup }"
            >
              仅显示本团队群聊
            </div>
            <div class="group-list-item"
            @click="createGroupPopup">
              创建群聊
            </div>
          </div>
        </div>
      </div>
      
      <div class="message-box">
        <div class="group-info-header" >
          <div class="group-name-box">{{ groupName(selectedGroup.group_name) }}</div>
          <div class="more-info-icon" 
          v-if="Object.keys(selectedGroup).length > 0 "
          @click="GroupInfoMore"><div @click="GroupInfoMore"><i class="el-icon-more-outline" @click="GroupInfoMore"></i></div></div>
        </div>
        <div class="message-list">
          <ul v-if="Object.keys(selectedGroup).length > 0 && !showGroupInfo">
            <li v-for="(item, index) in msgList"
            class="message-item"
            :class="{ 'my-message' : item.sender_uname === username }"
            :key="item.message_id"
            >
              <div class="user-item">
                {{ item.sender_uname }}  <br>
                <el-avatar><div><img :src="imgSrc(item.sender_uname)" alt="Avatar" class="imgUser_t"></img></div></el-avatar>
              </div>
              <div class="message-background-color" :ref="'messageRef' + index">
                  {{ item.content }}
              </div>
            </li>
          </ul>
          <div v-else-if="!showGroupInfo" class="note-selcet-group">____________select a group to start____________</div>
          <div v-else class="group-info-wrapper">
            <div class="group-info-item" style="border: #d3dce6 solid 1px; height: ">
              <div>群公告</div>
              <textarea name="group-notice" id="" cols="30" rows="10" v-model="groupNotice"></textarea>
            </div>
            <div class="member-list-box">
              <div class="member-item-box"
              v-for="item in groupMembers">
                <img :src="imgSrc(item.username)" alt="Avatar" @click="showUserPopupMenu(item)" class="imgUser"></img>
                {{ item.username }}
              </div>
              <div v-if="showUserPopup" class="popup-background">
                <div class="user-popup-content">
                  <!-- 这里可以显示头像等信息 -->
                    <div class="user-popup-content-img">
                      <img :src="imgSrc(selectedMember.username)" alt="Avatar"></img>
                    </div>
                    <div class="popup-info-list">
                      <div class="popup-info-list-item">{{ selectedMember.username }}</div>
                      <div class="popup-info-list-item" @click="chatPrivate">私聊</div>
                      <div class="popup-info-list-item" @click="remindSomeone">提醒</div>
                      <div class="popup-info-list-item button-danger" @click="deletePublicGroupMember">移除</div>
                    </div>
                  <!-- 添加其他弹窗内容 -->
                  <button @click="closePopup" style="margin-left: 60px; margin-top:6px">关闭弹窗</button>
                </div>
              </div>
            </div>
            <div class="group-info-item" style="text-align: center;">
              <span>添加群成员</span>
              <span><input type="text" v-model="addMemberName" placeholder="请输入用户ID" style="padding:4px; margin-left:-45px"></span>
              <span><button @click="addPublicGroupMember" style="padding:4px; margin-left:-40px">添加成员</button></span>
              </div>
            <div class="group-info-item" 
            v-if="checkPermission()"
            @click="remindEveryone">
              @所有人
            </div>
            <div class="group-info-item">
              <div>搜索聊天记录：</div>
              <textarea name="text" id="" cols="30" v-model='msgSearch' style="border: #d3dce6 solid 1px; border-radius:8px; margin-top:3px; margin-right:10px; height: 40px"></textarea>
              <!-- <button @click="searchMessage" style="padding:4px; ">搜索</button> -->
              <img style=" height: 4%; width: 2%" src="../assets/img/search.png"
            id="submint" @click="searchMessage" /></i>
            </div>
            <div class="group-info-item button-danger" style="width:150px;margin-left: 370px">
              <div @click="deletePublicGroup">删除群聊</div>
            </div>
          </div>
          
          <div v-if="showGroupCreatePopup" class="popup-background">
            <div class="create-group-box">
              <div class="create-group-item">
                组名：<input type="text" v-model="createGroupName">
              </div>
              <div class="create-group-item">
                <button @click="createPublicGroup">创建群聊</button>
              </div>
              <div class="create-group-item">
                <button @click="closeGroupCreatePopup">关闭弹窗</button>
              </div>
            </div>
          </div>
        </div>
        <div class="text-box">
          <textarea name="text" id="" cols="30" v-model='msg'></textarea>
          <div class="send-btn">
            <!-- <i class="el-icon-position" @click="sendMessageToGroup"></i> -->
            <img style="position: fixed; bottom: 72px; right: 83px; height: 12%; width:8%" src="../assets/img/pamu.gif" id="submint" @click="sendMessageToGroup"/></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
  getGroupByUser,
  getMessageList,
  getGroupMemberList,
  getPrivateChat,
  createGroupChat,
  deleteGroupChat,
  addGroupMember,
  deleteGroupMember,
} from "../api/api.js";
import introJs from 'intro.js'
import 'intro.js/introjs.css';
export default {
  data() {
    return {
      teamId: "",
      username: localStorage.getItem("username"),
      groupList: [],
      selectedGroup: {},
      msg: "",
      msgList: [],
      stompClient: null,
      showGroupInfo: false,
      groupMembers: [],
      showUserPopup: false,
      selectedMember: null,
      msgSearch: "",
      firstMatchIndex: -1,
      groupNotice: "",
      showGroupSetting: false,
      onlyShowTeamGroup: false,
      showGroupCreatePopup: false,
      createGroupName: '',
      addMemberName: '',
    };
  },
  computed: {
    groupName() {
      return function (group_name) {
        if (!group_name) return;
        const parts = group_name.split("_");
        return parts[0];
      };
    },
    imgSrc() {
      return function (username) {
        return `http://se.leonardsaikou.top/avatars/${username}_avatar.png`;
      };
    },
  },
  methods: {
    startIntro(){
      if (localStorage.getItem("MessageNewB") === "false") {
        const intro = introJs();
        intro.setOptions({
          exitOnOverlayClick: false,
          disableInteraction: true,
          scrollToElement: false,
          steps: [
            {
              element: document.querySelector('.group-list-header'),
              title: '返回团队',
              intro: '在此处可以返回团队',
              position: 'right'
            },
            {
              element: document.querySelector('.group-list'),
              title: '群聊and私聊',
              intro: '在这里显示着所有的聊天室，也可以自己创建哦~',
              position: 'right'
            },
            {
              element: document.querySelector('.group-info-header'),
              title: '群聊名称and更多信息',
              intro: '这是群聊名称（目前没点群大概没有），点击右侧可以看到更多信息哦',
              position: 'top'
            },
            {
              element: document.querySelector('.message-list'),
              title: '聊天页面',
              intro: '这里就是大家聊天的地方哦，也可以@他人来看（当然得是一个团队的）',
              position: 'top'
            }, {
              element: document.querySelector('.text-box'),
              title: '聊天框',
              intro: '在这里输入消息，请大家快来试一试@功能吧~！',
              position: 'top'
            }],
          //overlayOpacity: 1.0, // 设置遮罩层透明度
          disableInteraction: true, // 禁止用户与遮罩层下方的元素进行交互
        }).start();
        localStorage.setItem("MessageNewB", true);
      }
    },
    // 装载群组列表
    joinGroup(groupId) {
      if (!this.stompClient) {
        console.error("stompClient is not initialized.");
        return;
      }
      const component = this;
      this.stompClient.subscribe(
        `/topic/messages/${groupId}`,
        function (messageOutput) {
          let message = JSON.parse(messageOutput.body);
          console.log(`Received message from group ${groupId}: `, message);
          // 在这里你可以更新你的 UI
          component.msgList.push(message);
        }
      );
    },
    loadGroupList() {
      for (let i = 0; i < this.groupList.length; i++) {
        this.joinGroup(this.groupList[i].group_id);
      }
    },
    async getGroupList(username) {
      try {
        const res = await getGroupByUser(username);
        console.log("getGroupByUser : ", res);
        this.groupList = res.data.data;
        this.$nextTick(() => {
          const groupItems = document.querySelectorAll(".group-item");
          for (let i = 0; i < groupItems.length; i++) {
            groupItems[i].style.opacity = "0";
            groupItems[i].style.transform = "translateY(70vh)";
            setTimeout(() => {
              groupItems[i].style.opacity = "1";
              groupItems[i].style.transform = "translateY(0)";
            }, i * 150);
          }
        });
      } catch (error) {
        console.error("Error fetching groupList:", error);
      }
    },
    // 选定群组
    selectGroup(group) {
      this.selectedGroup = group;
      getMessageList(group.group_id)
        .then((res) => {
          this.msgList = res.data.data;
          console.log("select group : ", this.selectedGroup);
          console.log("msgList : ", this.msgList);
          this.$nextTick(() => {
            const messages = document.querySelectorAll(".message-item");
            messages.forEach((message) => {
              message.style.opacity = "0";
              setTimeout(() => {
                message.style.opacity = "1";
              }, 150);
            });
          });
        })
        .catch((error) => {
          console.log("Error fetching msgList:", error);
        });
      this.getGroupMembers();
    },
    // 发送消息
    sendMessageToGroup() {
      if (!this.stompClient) {
        console.error("stompClient is not initialized.");
        return;
      }
      if (this.selectedGroup === {} || this.msg.trim() === "") return;
      const groupId = this.selectedGroup.group_id;
      this.stompClient.publish({
        destination: `/send/${groupId}`,
        body: JSON.stringify({
          content: this.msg.trim(),
          sender_uname: this.username,
          group_id: this.selectedGroup.group_id,
        }),
      });
      console.log(this.stompClient);
      this.msg = "";
    },
    // 展示群组信息
    GroupInfoMore() {
      this.showGroupInfo = !this.showGroupInfo;
      this.showGroupCreatePopup = false;
      console.log("group info is show");
    },
    // 获取群组成员列表
    getGroupMembers() {
      console.log("get group members: ", this.selectedGroup);
      getGroupMemberList(this.selectedGroup.group_id)
        .then((res) => {
          this.groupMembers = res.data.data;
          console.log("getGroupMemberList : ", res);
        })
        .catch((error) => {
          console.log("Error fetching groupMemberList:", error);
        });
    },
    // 查看用户详情
    showUserPopupMenu(item) {
      this.selectedMember = item;
      this.showUserPopup = true;
    },
    closePopup() {
      this.showUserPopup = false;
      this.selectedMember = null;
    },
    // 私聊
    chatPrivate() {
      this.showUserPopup = false;
      getPrivateChat(this.selectedMember.username)
        .then((res) => {
          console.log("getPrivateChat : ", res);
          const group = res.data.data;
          if (res.data.status === "success") {
            this.groupList = [...this.groupList, group];
            this.joinGroup(group.group_id);
          }
          this.selectGroup(group);
          this.showGroupInfo = false;
          this.getGroupList(this.username);
        })
        .catch((error) => {
          console.log("Error fetching private chat:", error);
        });
    },
    // 提醒用户
    remindSomeone() {
      this.showUserPopup = false;
      this.showGroupInfo = false;
      this.msg = "/@/" + this.selectedMember.username + " ";
    },
    // 提醒所有人
    remindEveryone() {
      this.showUserPopup = false;
      this.showGroupInfo = false;
      this.msg = "/@/*ALL* ";
    },
    // 查看权限
    checkPermission() {
      for (let i = 0; i < this.groupMembers.length; i++) {
        if (
          this.groupMembers[i].username === this.username &&
          (this.groupMembers[i].role === "Creator" ||
            this.groupMembers[i].role === "Admin")
        ) {
          return true;
        }
      }
      return false;
    },
    // 搜索消息
    searchMessage() {
      this.showGroupInfo = false; // 关闭群组信息
      this.firstMatchIndex = -1; // 重置索引
      for (let i = 0; i < this.msgList.length; i++) {
        if (this.msgList[i].content.includes(this.msgSearch)) {
          this.firstMatchIndex = i;
          break; // 找到第一个匹配消息后立即退出循环
        }
      }
      console.log("msgList:", this.msgList);
      console.log("refs:", this.$refs);
      console.log("firstMatchIndex:", this.firstMatchIndex);
      // 如果找到了匹配消息，执行滚动
      if (this.firstMatchIndex !== -1) {
        this.scrollToMessage(this.firstMatchIndex);
      }
    },
    scrollToMessage(index) {
      if (index >= 0 && index < this.msgList.length) {
        console.log("Scrolling to message with index:", index);
        this.$nextTick(() => {
          const messageElement = this.$refs["messageRef" + index];
          console.log("Message element:", messageElement);
          if (messageElement && messageElement[0]) {
            setTimeout(() => {
              messageElement[messageElement.length - 1].scrollIntoView({
                behavior: "smooth",
                block: "nearest", // 或 "center"
                inline: "nearest", // 或 "start" 或 "end"
              });
            }, 500); // 增加一个小的延迟
          }
        });
      }
    },
    // 显示群聊设置
    groupSetting() {
      this.showGroupSetting = !this.showGroupSetting;
      if (!this.showGroupSetting) {
        this.getGroupList(this.username);
      }
    },
    // 创建公开群聊
    createPublicGroup() {
      this.showGroupSetting = false;
      console.log("create group name: ", this.createGroupName);
      createGroupChat(this.createGroupName)
        .then((res) => {
          console.log("createGroupChat : ", res);
          const group = res.data.data;
          console.log("group: ", group);
          console.log("groupList: ", this.groupList);
          if (res.data.status === "success") {
            this.groupList = [...this.groupList, group];
            this.joinGroup(group.group_id);
          }
          this.selectGroup(group);
          this.showGroupInfo = false;
          this.showGroupCreatePopup = false;
          this.getGroupList(this.username);
        })
        .catch((error) => {
          console.log("Error fetching private chat:", error);
        });
      this.createGroupName = '';
    },
    createGroupPopup() {
      this.showGroupCreatePopup = true;
    },
    closeGroupCreatePopup() {
      this.showGroupCreatePopup = false;
    },
    // 删除公开群聊
    deletePublicGroup() {
      this.showGroupInfo = false;
      this.showGroupSetting = false;
      deleteGroupChat(this.selectedGroup.group_id)
        .then((res) => {
          console.log("deleteGroupChat : ", res);
          this.selectedGroup = {};
          this.getGroupList(this.username);
          // if (res.data.status === "success") {
          //   this.groupList = this.groupList.filter(
          //     (item) => item.group_id !== this.selectedGroup.group_id
          //   );
          // }
          // this.selectGroup(this.groupList[0]);
        })
        .catch((error) => {
          console.log("Error fetching private chat:", error);
        });
    },
    //添加公开群聊成员
    addPublicGroupMember() {
      addGroupMember(this.selectedGroup.group_id, this.addMemberName)
        .then((res) => {
          console.log("addGroupMember : ", res);
          this.getGroupMembers();
        })
        .catch((error) => {
          console.log("Error fetching private chat:", error);
        });
    },
    // 删除公开群聊成员
    deletePublicGroupMember() {
      deleteGroupMember(this.selectedGroup.group_id, this.selectedMember.username)
        .then((res) => {
          console.log("deleteGroupMember : ", res);
          this.getGroupMembers();
          this.showUserPopup = false;
        })
        .catch((error) => {
          console.log("Error fetching private chat:", error);
        });
    },
    // 返回团队
    returnTeam() {
      this.$router.push("/control-team");
    },
  },
  created() {
    this.username = window.localStorage.getItem("username");
    this.getGroupList(this.username);
    this.teamId = window.localStorage.getItem("team_id");
  },
  mounted() {
    console.log("Mounted hook executed");
    const socket = new SockJS("http://23.94.102.135:8001/websocket");
    this.stompClient = new Client({ webSocketFactory: () => socket });
    this.stompClient.onConnect = (frame) => {
      console.log("Connected: " + frame);
      // 在连接成功后执行相关操作
      this.loadGroupList();
    };
    this.stompClient.activate();
    this.startIntro()
  },
};
</script>

<style lang="css">
.message-wrapper {
  position: relative;
  width: 100%;
  height: 85vh;
}

/* 右边框 */
.message-box {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 55vw;
  height: 85vh;
  margin-left: 5px;
  margin-top: -25px;
  border-radius: 8px;
}

/*信息框*/
.message-list {
  overflow-y: scroll;
  height: 57.8vh;
  border: 6px solid rgb(186, 228, 232, 0.5);
  border-radius: 8px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
}

.message-background-color {
  margin: 10px 3vw 20px 3vw;
  display: inline-block;
  padding: 10px 10px;
  background-color: rgb(214, 214, 214, 0.4);
  overflow-wrap: break-word;
  width: auto;
  text-align: left;
  border-radius: 10px;
}

/*气泡*/
.message-item {
  transition: opacity 1s ease, transform 1s ease;
  /* margin: 5px 3vw 15px 3vw;
  display: inline-block;
  padding: 10px 20px;
  background-color: #f4f5f9;
  overflow-wrap: break-word;
  width: 70%;
  text-align: left;
  border-radius: 7px;
  font-family: JingNanFont;
  font-size: 15px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.08); */
}

/*用户信息字体*/
.my-message {
  text-align: right;
  margin-right: 1.5vw;
}

.my-message .message-background-color {
  text-align: right;
}

/*用户名*/
.user-item {
  margin-left: 1vw;
  padding-left: 5px;
  margin-right: 1vw;
  font-family: JingNanFont;
  font-size: 15px;
}

/*输入框*/
textarea {
  width: 85%;
  height: 13.6vh;
  resize: none;
  border: none;
  padding: 12px;
  box-sizing: border-box;
  outline: none;
  font-size: 15px;
  font-family: JingNanFont;
  font-size: 17px;
}

.text-box {
  border: 5px solid rgb(241, 167, 167, 0.3);
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
  margin-top: 10px;
  border-radius: 8px;
}

/* 发送按钮 */
.send-btn {
  display: inline-block;
  width: 3%;
  vertical-align: top;
  text-align: right;
  height: auto;
  position: relative;
  margin-top: 73px;
  margin-bottom: 4px;
  margin-right: 30px;
}

*{
  font-family: JingNanFont;
}

.el-icon-position {
  color: #6e727796;
  font-size: 25px;
}

.message-list::-webkit-scrollbar {
  display: none;
  /* WebKit 浏览器（如 Chrome 和 Safari）隐藏滚动条 */
}

/* 左边框 */
.group-list-box {
  display: inline-block;
  position: relative;
  vertical-align: top;
  width: 16vw;
  height: 83.5vh;
  margin-left: 1vw;
  margin-top: -25px;
  border-radius: 8px;
  border: 6px solid rgb(186, 228, 232, 1);
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
}

/* 左上角返回框 */
.group-list-header {
  position: relative;
  height: 8.5vh;
  width: 15vw;
  margin-bottom: 1.5vh;
}

/* 群聊框 */
.group-list {
  /* display: inline-block; */
  position: relative;
  vertical-align: top;
  width: 101%;
  height: 72.9vh;
  margin-left: -0.4vw;
  border: 4px solid rgb(186, 228, 232, 0.7);
  /* border-radius: 8px; */
  overflow-y: scroll;
}

.group-list::-webkit-scrollbar {
  display: none;
}

/* 群聊单元格 */
.group-item {
  width: 90%;
  min-height: 50px;
  border-radius: 7px;
  margin: 5px auto;
  align-items: center;
  justify-content: center;
  display: flex;
  overflow-wrap: break-word;
  /* 自动换行 */
  opacity: 0;
  transition: opacity 1s ease, transform 1s ease;
  border: 5px solid rgb(241, 167, 167, 0.3);
}

.group-item:hover {
  /* background-color: #f7f9fc; */
  border: 5px solid rgb(241, 167, 167, 0.5);
  margin-top: 10px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  /* 可以添加这个来去除列表项的内边距 */
}

.selected-group {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  border: 5px solid rgb(241, 167, 167, 0.5);
}

.note-selcet-group {
  color: #d3dce6;
  text-align: center;
  font-weight: 5;
  font-size: 17px;
  margin-top: 4px;
}

/* 群名框 */
.group-info-header {
  height: 6.5vh;
  margin-bottom: 1.0vh;
  position: relative;
  border: 5px solid rgb(241, 167, 167, 0.3);
  border-radius: 10px;
  box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.05);
}

/* 群名文字 */
.group-name-box {
  text-align: center;
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 25px;
}

/* ...按钮 */
.more-info-icon {
  display: inline-block;
  position: absolute;
  right: 1.5vw;
  top: 55%;
  transform: translateY(-50%);
  font-size: 26px;
}

/* 群成员列表 */
.member-list-box {
  max-height: 50vh;
  overflow-y: scroll;
  margin: 1vh;
  /* border: #d3dce6 solid 1px; */
  border-radius: 10px;
}

.member-list-box::-webkit-scrollbar {
  display: none;
  /* WebKit 浏览器（如 Chrome 和 Safari）隐藏滚动条 */
}

/* 成员头像 */
.member-item-box {
  display: inline-block;
  position: relative;
  width: 6vw;
  height: 6vw;
  border: #d3dce6 solid 1px;
  margin: 2vh 1vw;
  overflow: hidden;
  border-radius: 10px;
}

.popup-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 头像弹窗 */
.user-popup-content {
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  height: 39vh;
  min-height: 200px;
  width: 12vw;
  min-width: 150px;
  overflow-y: scroll;
}

.user-popup-content::-webkit-scrollbar {
  display: none;
}

.user-popup-content-img {
  display: flex;
  justify-content: center;
  align-items: top;
  border-radius: 5px;
  overflow: hidden;
  margin: 5px;
  width: 12vw;
  min-width: 120px;
  height: 8vw;
  min-height: 120px;
}

/* 头像弹窗内容 */
.popup-info-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 7px;
  width: 8vw;
  min-width: 120px;
  margin-left: 30px;
  border-radius: 5px;
  padding: 3px;
}

.group-info-wrapper {
  position: relative;
  height: 90%;
  width: 100%;
}

.group-info-item {
  max-height: 50vh;
  margin: 1vh;
  /* border: #d3dce6 solid 1px; */
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  overflow-y: scroll;
}

.group-info-item::-webkit-scrollbar {
  display: none;
}

textarea::-webkit-scrollbar {
  display: none;
}

/* 团队交流 */
.title {
  position: absolute;
  left: 4.5vw;
  top: 60%;
  transform: translateY(-50%);
  color: rgb(154, 202, 208);
  font-size: 30px;
  font-weight: 10;
  opacity: 1;
  font-family: yousheFont;
}

/* 群聊设定 */
.group-list-item {
  width: 90%;
  margin-top: 1.1vh;
  margin-left: 0.7vw;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: center;
  border: 3px solid rgb(241, 167, 167, 0.4);
  opacity: 0.7;
}

.group-list-item-on {
  background-color: #f7f9fc;
}

.group-list-item:hover {
  /* background-color: #f7f9fc; */
  border: 3px solid rgb(241, 167, 167, 0.4);
  opacity: 1;
}

.create-group-box {
  margin: 1vh;
  border: #d3dce6 solid 1px;
  padding: 5px;
  text-align: center;
  border-radius: 10px;
  background-color: #f7f9fc;
}

.create-group-item {
  width: 90%;
  border: #d3dce6 solid 1px;
  margin-top: 1vh;
  margin-bottom: 1vh;
  margin-left: 1vw;
  border-radius: 5px;
  padding-top: 1vh;
  padding-bottom: 1vh;
  text-align: center;
}

.button-danger {
  background-color: #f56c6c;
  color: #fff;
  border-color: #f56c6c;
}

.group-info-item span {
  text-align: left;
  margin-left: 3vw;
}

/* 返回团队按钮 */
.return-button {
  display: inline-block;
  color: rgb(186, 228, 232, 1);
  font-size: 30px;
  margin-top: 22px;
  margin-left: 20px;
}

.return-button:hover {
  font-size: 33px;
  margin-bottom: 2px;
}

.imgUser {
  width: 100px;
  height: 100px;
}

.imgUser_t {
  width: 40px;
  height: 40px;
}
</style>