<template>
    <div class="container">
        <div class="box1">
            <form action="" name="form1" style="margin-bottom: 15px;">
                <h1 style="font-size: 30px;">创建团队</h1>
                <!-- 团队图片 <input type="file" name="" id="" accept="image/*" ref="fileInput"> -->
                团队ID <input class="acc1" type="text" placeholder="请输入团队ID" v-model="team_id" required>
                <br>
                团队名<input class="acc1" type="text" placeholder="请输入团队名称" style="margin-left: 55px;" v-model="team_name" required>
                <br>
                介绍<input class="acc1" type="text" placeholder="请输入团队介绍" style="margin-left: 70px;"
                    v-model="team_description" required>
            </form>
            <!-- background: linear-gradient(90deg,#BBFFEE,#FFCCCC) -->
            <button
                style="padding: 8px; border-radius: 24px; background-color: black ; border: #fff;
              box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.25); margin-left: 235px; margin-top: 8px; padding-left: 12px;cursor:pointer;"
                @click="submitForm()">
                <span style="color: #fff;  font-family: yousheFont; font-size: 25px; ">立即创建团队</span>
                <i class="el-icon-arrow-right" style="color: #fff; font-size: 25px; margin-right: 2px;"></i>
            </button>

        </div>

        <!-- 背景 -->
        <div class="box_1"></div>
        <div class="bear"></div>
    </div>
</template>
  
  
<style scoped>
* {
    font-family: yousheFont;
    font-size: 20px;
}

/* 上传封面 */
.avatar-uploader .el-upload {
    border: 10px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 168px;
    height: 168px;
    line-height: 168px;
    text-align: center;
    font-size: 25px;
}

.avatar {
    width: 168px;
    height: 168px;
    display: block;
}

.container {
    width: 600px;
    height: 560px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 5vh;
    background: rgba(255, 255, 255, 0.7);
    border-radius: 1.5rem;
    box-shadow: 4px 4px 3px rgba(0, 0, 0, 0.2);
}

.box1 {
    width: 70%;
    margin: auto;
    padding-top: 5px;
    align-items: center;
}

.acc1 {
    height: 40px;
    width: 60%;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 25px;
    background-size: 25px;
    background-repeat: no-repeat;
    background-position: 10px;
    padding-left: 40px;
    overflow-wrap: break-word;
}

.acc2 {
    height: 40px;
    width: 63%;
    margin-left: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    border: none;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 25px;
    font-size: 18px;
    background-size: 25px;
    background-repeat: no-repeat;
    background-position: 10px;
    padding-left: 40px;
}

.box2 {
    margin-top: 10px;
    float: right;
}

a {
    text-decoration: none;
    color: #666666;
}

.submit {
    float: right;
    margin-top: 20px;
    font-size: 20px;
    width: 130px;
    height: 50px;
    border: none;
    background-color: rgba(255, 255, 255, 0.4);
    color: #666666;
    border-radius: 30px;
}

/* 背景 */
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.box_1 {
    z-index: 2;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 336px;
    width: 100%;
    background: url(../assets/img/bg1.png) no-repeat;
    animation: bg 30s linear infinite;
    margin-bottom: 0px;
    z-index: -10;
}

.bear {
    z-index: 3;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100px;
    width: 200px;
    background: url(../assets/img/bear.png) no-repeat;
    animation: bear 0.5s steps(8) infinite, move 6s forwards 0.2s;
    margin-bottom: 40px;
    bottom: 10px;
    z-index: -5;
}

@keyframes bear {
    from {
        background-position: 0, 0;
    }

    to {
        background-position: -1600px, 0;
    }
}

@keyframes move {
    from {
        left: 0;
    }

    to {
        left: 50%;
        transform: translateX(-50%);
    }
}

@keyframes bg {
    from {
        background-position: 0, 0;
    }

    to {
        background-position: -1200px, 0;
    }
}
</style>
  
<script>
import { createteam } from "../api/api"
export default {
    data() {
        return {
            ruleForm: {

                //imageUrl: '',
                team_img:'',
                team_id: '',
                team_name: '',
                /*                 date1: '',
                                type: [], */
                team_description: ''
            },
            rules: {
                img: [
                    { required: true, message: '请选择图片', trigger: 'blur' }
                ],
                id: [
                    { required: true, message: '请输入ID', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入团队名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                region: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                date2: [
                    { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个团队性质', trigger: 'change' }
                ],
                resource: [
                    { required: true, message: '请选择活动资源', trigger: 'change' }
                ],
                desc: [
                    { required: true, message: '请填写团队介绍', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        test() {
            alert("1")
        },
        submitForm() {
            //console.log(form)
            this.ruleForm.team_id = this.team_id
            this.ruleForm.team_name = this.team_name
            this.ruleForm.team_description = this.team_description
            console.log(this.ruleForm)
            console.log(this.ruleForm.team_img)
            createteam(this.ruleForm).then(res => {
                console.log(res)
                if (res.status === 201) {
                    alert('submit!');
                    this.$router.push('/teamlist')
                } else {
                    alert('团队昵称已存在')
                    return false;
                }
            }, err => {
                console.log(err)
                switch (err.response.status) {
                    case 409:
                        alert("团队ID重复，创建失败")
                        break;
                }
            })
            /*             this.$refs[formName].validate((valid) => {
                            if (valid) {
                                console.log(formName),
                                    createteam(form).then(res => {
                                        if (res.status === 200) {
                                            console.log(res)
                                        }
                                    })
                                alert('submit!');
                                this.$router.push('/teamlist')
                                //this.createteam
                            } else {
                                console.log('error submit!!');
                                return false;
                            }
                        }); */
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        }
    }
}
</script>