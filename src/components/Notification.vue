<template>
    <div class="message-unit">
        <span @click="openDialog()">{{ messageText }}</span>
        <el-button v-if="!isRead" @click="CallRead()">已读</el-button>
    </div>
</template>
<script>
export default {
    props: { messageText: String, messageID: String, isRead: Boolean, messageTime: String },
    data() {
        return {

        }
    },
    methods: {
        openDialog() {
            this.$emit('openDia', this.messageText, this.messageTime,this.isRead,this.messageID)
        },
        CallRead() {
            this.$emit('readMeg', this.messageID)
        }
    }
}
</script>
<style scoped lang="scss">
.message-unit {
    width: 450px;
    height: 60px;
    background-color: rgba(225, 225, 225, 0.7);
    margin-top: 20px;
    border-radius: 10px;
}

span {
    display: block;
    float: left;
    // margin-top: 4%
    text-overflow: ellipsis;
    overflow: hidden;
    width: 300px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    white-space: nowrap;
    margin-left: 8px;
}

.el-button {
    float: right;
    margin-top: 2%;
}
</style>