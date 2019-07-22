<template>
    <el-container>
        <el-header>
            <el-menu mode="horizontal" background-color="#545c64"
                     text-color="#fff"
                     active-text-color="#ffd04b"
                     :router="true"
                     default-active="/index/department">
                <el-menu-item index="/index/department">部门管理</el-menu-item>
                <el-menu-item index="/index/user">用户管理</el-menu-item>
                <el-menu-item index="/index/employee">雇员管理</el-menu-item>
                <el-menu-item index="/index/charge">收费项目管理</el-menu-item>
                <el-menu-item index="/index/dict">字典管理</el-menu-item>
                <div>
                    <el-dropdown style="line-height: 60px;float: right;right: 50px" @command="handleCommand">
                        <span style="color:white">
                            {{username}},您好<i class="el-icon-arrow-down"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="info">个人信息</el-dropdown-item>
                            <el-dropdown-item command="logout">退出</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-menu>
        </el-header>
        <el-main>
            <router-view />
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Index",
        computed: {
            username () {
                return this.$store.getters.userInfo.username;
            }
        },
        created(){
            this.$router.push({path:'/index/department'})
        },
        methods:{
            handleCommand (command) {
                if(command==='logout'){
                    this.$confirm('是否退出系统?','提示',{
                        type:'warning'
                    }).then(()=>{
                      //向后台发送退出请求，并且让前台跳转到登录页
                      this.axios.post("/api/global/logout").then(res=>{
                          this.$router.push({path:'/'})
                      })
                    })
                }
            }
        }
    }
</script>

<style scoped>



</style>