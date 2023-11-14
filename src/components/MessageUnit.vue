<template>
    <div class="message-unit">
        <span>{{ messageText }}</span>
        <el-button style="margin-right: 15px; width: 80px;">已读</el-button>
    </div>
</template>
<script>
export default{
    props:{messageText:String},
    data(){
        return{

        }
    }
}
</script>
<style scoped lang="scss">
.message-unit{
    width: 450px;
    height: 60px;
    background-color: rgba(225, 225, 225, 0.7);
    margin-top: 20px;
    border-radius: 10px;
}
span{
    display: block;
    float: left;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 320px;
    height: 60px;
    line-height: 60px;
    font-size: 16px;
    white-space: nowrap;
    margin-left: 8px;
}
.el-button{
    float: right;
    margin-top: 2%;
}
</style>