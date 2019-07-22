<template>
    <div>
        <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="300px">
            <el-form :model="targetDepart" ref="departForm" :rules="rules" size="mini">
                <el-form-item label="部门名称" :label-width="labelWidth" prop="departName">
                    <el-input v-model="targetDepart.departName"></el-input>
                </el-form-item>
                <el-form-item label="部门种类" :label-width="labelWidth" prop="departType">
                    <el-select v-model="targetDepart.departType" style="text-align: left">
                        <el-option v-for="type in departTypes"
                                   :label="type.val" :value="type.keyword"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="部门级别" :label-width="labelWidth" prop="departLevel">
                    <el-select v-model="targetDepart.departLevel">
                        <el-option v-for="level in departLevels"
                                   :label="level.val" :value="level.keyword"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button type="primary" @click="handleSave">提交</el-button>
                <el-button type="danger" @click="dialogVisible=false">取消</el-button>
            </div>
        </el-dialog>
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input size="mini" v-model="departName">
                    <template slot="prepend">
                        部门名称
                    </template>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" placeholder="请选择部门类型" v-model="departType">
                    <el-option v-for="type in departTypes"
                               :label="type.val" :value="type.keyword"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" @click="getPage">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary" @click="handleInsert">新增部门</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="departList">
                <el-table-column prop="departName" label="部门名称" />
                <el-table-column prop="departLevel" label="部门级别" :formatter="tableFormatter"/>
                <el-table-column prop="departType" label="部门种类"/>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-pagination
                    layout="prev,pager,next,total" :total="pageInfo.total" @current-change="getPage"
                    :page-size="pageInfo.pageSize" :current-page.sync="pageInfo.pageNum"></el-pagination>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Department",
        created() {
            //当当前页面（vue的实例对象，vue的组件对象）创建之时，向后台请求数据
            this.getPage();
        },
        data() {
            return {
                labelWidth: '80px',
                dialogTitle: '新建部门',
                dialogVisible: false,
                departName: '',
                departType: '',
                pageInfo: {
                    total: 0,
                    pageSize: 5,
                    pageNum: 1
                },
                targetDepart: {
                    id: '',
                    departName: '',
                    departType: '',
                    departLevel: ''
                },
                rules: {
                    departName: [
                        {required: true, message: '不能为空', trigger: 'blur'},
                        {max: 10, message: '部门名称不能超过10个字符', trigger: 'blur'}
                    ],
                    departType: [{required: true, message: '不能为空', trigger: 'blur'}],
                    departLevel: [{required: true, message: '不能为空', trigger: 'blur'}],
                },
                departList: [],
                departTypes: [
                    {keyword: 'medical', val: '医疗'}, {keyword: 'admin', val: '行政'}
                ],
                departLevels: [
                    {keyword: '1', val: '一级'}, {keyword: '2', val: '二级'}, {keyword: '3', val: '三级'}
                ]
            }
        },
        methods: {
            tableFormatter(row, column, cellValue, index){
                //todo

            },


            handleSave() {
                //将targetDepart通过ajax发送到后台，存入数据库
                this.$refs['departForm'].validate(result=>{
                   if(result){
                       this.axios.post("/api/global/department/save", this.targetDepart).then(res => {
                           this.$notify({
                               title: '提示',
                               message: '部门保存成功！',
                               type: 'success'
                           });

                           //属性table的数据
                           this.getPage();
                       }).catch(err => {
                           this.$notify({
                               title: '提示',
                               message: '部门保存失败！',
                               type: 'error'
                           })
                       });
                       // 关闭窗体
                       this.dialogVisible = false;
                   }else{
                       return false;
                   }
                });



            },
            handleEdit(row) {
                // row对象代表的就是当前行的数据
                //改变窗体的title ，将row中的值赋给targetDepart对象
                this.dialogTitle = "编辑部门";
                this.dialogVisible = true;
                this.targetDepart.id = row.id;
                this.targetDepart.departName = row.departName;
                this.targetDepart.departType = row.departType;
                this.targetDepart.departLevel = row.departLevel;
            },
            handleDelete(row) {
                //打卡确认框，提示是否删除，确认了，就向后台发送删除请求；
                this.$confirm('是否确认删除该条记录？', '警告', {
                    type: 'error',
                }).then(() => {
                    this.axios.delete('/api/global/department/delete/' + row.id).then(res => {
                        this.$notify({
                            title: '提示',
                            message: '删除成功',
                            type: 'success'
                        });
                        //刷新table数据
                        this.getPage();
                    }).catch(err => {
                        this.$notify({
                            title: '提示',
                            message: '删除失败',
                            type: 'error'
                        })
                    })
                })
            },
            //打开新增页面
            handleInsert() {
                // 1 title设置为新增部门， 2.打开窗口 3.将targetDepart中的值清空
                this.targetDepart.departName = '';
                this.targetDepart.departType = '';
                this.targetDepart.departLevel = '';
                this.targetDepart.id = "";
                this.dialogTitle = "新增部门";
                this.dialogVisible = true;
            },
            //向后台拿到数据，并且将数据赋给departList，pageInfo
            getPage() {
                this.axios.post("/api/global/department/page", null, {
                    //切记，axios默认提交的是json数据，所以Content-type：application/json;charest=utf-8
                    //由于我们需要带分页参数pageNum，pageSize，
                    // 所以数据以表单的形式提交，Content-type为：application/x-www-form-urlencoded
                    //在axios中，第二参数为null，在第三个参数中通过params属性封装查询条件数据
                    params: {
                        departName: this.departName,
                        departType: this.departType,
                        pageNum: this.pageInfo.pageNum,
                        pageSize: this.pageInfo.pageSize
                    }
                }).then(res => {
                    //处理获得的PageInfo数据,给pageSize，pageNum，total,departList
                    this.departList = res.data.list;
                    this.pageInfo.pageNum = res.data.pageNum;
                    this.pageInfo.pageSize = res.data.pageSize;
                    this.pageInfo.total = res.data.total;
                })
            }
        }
    }
</script>

<style scoped>
</style>