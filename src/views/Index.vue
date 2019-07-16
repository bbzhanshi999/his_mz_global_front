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
        }
    }
</script>

<style scoped>

</style>