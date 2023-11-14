<template>
    <div class="contain-box">
        <div class="left-box">
            <div class="img-unit" v-for="( img, index ) in imgUrl" :style="{ backgroundImage: 'url(' + img + ')' }"
                :key="index" @click="displayUrl = img">
                <span>{{ dataArr[index].prototype_name }}</span>
            </div>
        </div>
        <div class="right-box">
            <div class="display-box" :style="{ backgroundImage: 'url(' + displayUrl + ')' }"> </div>
        </div>
    </div>
</template>
<script>
import { getPreview } from '@/api/api'
export default {
    data() {
        return {
            imgUrl: []
            ,
            displayUrl: '',
            dataArr: []
        }
    }
    ,
    mounted() {
        console.log(window.location.href)
        console.log(this.projectid)
    },
    created() {
        // getAllPrototype()
        getPreview(this.projectid).then(res => {
            console.log(res.data.data)
            this.dataArr = res.data.data
            for (let i = 0; i < res.data.data.length; i++) {
                console.log(res.data.data[i])
                fetch(`https://se.leonardsaikou.top/prototype_previews/${res.data.data[i].prototype_id}_preview_data.txt?nocache=${new Date().getTime()}`).then(response => response.text()).then(data => {
                    // console.log(data)
                    this.imgUrl.push(data)
                })
            }
        })

    },
    props: ['projectid']

}
</script>

<style scoped lang="scss">
.contain-box {
    float: left;
    width: 100%;
    height: 100%;
    // background-color: aqua;
    overflow: auto;
    // background-color: aqua;
}

.left-box {
    float: left;
    width: 30%;
    height: 100%;
    // background-color: blue;
    // position: absolute;
}

.right-box {
    float: right;
    height: 100%;
    width: 65%;
    // background-color: yellow;
    // position: absolute;
    padding: 20px;


}

.img-unit {
    width: 70%;
    height: 200px;
    // background-color: red;
    margin-top: 25px;
    margin-left: 15%;
    background-size: 100% 100%;
}

.display-box {
    width: 70%;
    height: 600px;
    position: fixed;
    // background-color: cadetblue;
    margin-top: 50px;
    background-size: 100% 100%;
    margin-right: 100px;
    // padding: 20px;
    // padding-color:red;
    border: 5px solid red($color: #000000);
}
</style>