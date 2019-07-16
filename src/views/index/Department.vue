<template>
    <div>
        <el-row :gutter="10">
            <el-col :span="4">
                <el-input size="mini">
                    <template slot="prepend">
                        部门名称
                    </template>
                </el-input>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" placeholder="请选择部门类型">
                    <el-option v-for="type in departTypes"
                        :label="type.val" :value="type.keyword"></el-option>
                </el-select>
            </el-col>
            <el-col :span="2">
                <el-button size="mini">查询</el-button>
            </el-col>
            <el-col :span="2">
                <el-button size="mini" type="primary">新增部门</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-table :data="departList">
                <el-table-column prop="departName" label="部门名称" />
                <el-table-column prop="departCode" label="部门代号" />
                <el-table-column prop="departLevel" label="部门级别" />
                <el-table-column prop="departType" label="部门种类" />
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
            layout="prev,pager,next,total" :total="10" :page-size="5"></el-pagination>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "Department",
        created () {
            this.axios.post("/api/global/department/lisr",{}).then(res=>console.log(res))
        },
        data () {
            return {
                departList:[
                    {
                        id:'1',
                        departName:'人事部',
                        departCode:'rsb',
                        departLevel:'一级',
                        departType:'行政'
                    },{
                        id:'2',
                        departName:'内科',
                        departCode:'nk',
                        departLevel:'一级',
                        departType:'医疗'
                    },{
                        id:'3',
                        departName:'药房',
                        departCode:'yf',
                        departLevel:'二级',
                        departType:'医疗'
                    }
                ],
                departTypes:[
                    {keyword:'medical',val:'医疗'},{keyword:'admin',val:'行政'}
                ]
            }
        },
        methods:{
            handleEdit(row){
                console.log(row)
            },
            handleDelete(row){
                console.log(row)
            }
        }
    }
</script>

<style scoped>

</style>