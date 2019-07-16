<template>
    <div>
       <!-- 用户名：<input type="text" v-model="userInfo.username"/><br/>
        密码：<input type="text"  v-model="userInfo.password"/><br/>
        <button @click="submit">登录</button>
        <button @click="reset">重置</button>-->
        <el-row>
            <el-col :span="24">
                <el-image style="width: 300px;height: 200px" :src="imageSrc" fit="contain"></el-image>
            </el-col>
        </el-row>
        <el-row>
            <h1>his门诊后台管理系统</h1>
        </el-row>
        <el-row type="flex" justify="space-around" >
            <el-col :span="5" >
                <el-input v-model="userInfo.username" placeholder="请输入用户名"/>
            </el-col>
        </el-row>
        <el-row type="flex" justify="space-around" >
            <el-col :span="5" >
                <el-input type="password" v-model="userInfo.password" placeholder="请输入密码"/>
            </el-col>
        </el-row>
        <el-row>
            <el-button @click="submit" type="primary" plain>登录</el-button>
            <el-button @click="reset">清空</el-button>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                userInfo:{
                    username:'',
                    password:''
                },
                imageSrc:require('./../assets/logo.svg')
            }
        },
        methods:{
            submit () {
                //1.获得axios的对象，获得对象的途径：window.axios,Vue.axios,this.axios,this.$axios
                axios.post('/api/global/login',this.userInfo)
                    .then(res=>{
                        if(res.data && res.data.username){
                            //登录成功后，跳转到首页，更新vux store中的userInfo状态
                            this.$store.commit("updateUserInfo",res.data);
                            this.$router.push({path:'/index'})
                        }else{
                            //在页面上显示用户名密码错误
                            this.$message.error("用户名或密码输入错误");
                        }
                    })
                    .catch(err=>console.log(err))
            },
            reset () {
                this.userInfo.username = '';
                this.userInfo.password = '';
            }
        }
    }
</script>

<style scoped>
    .el-row{
        margin-bottom: 20px;
    }
</style>