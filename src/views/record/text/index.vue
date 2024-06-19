<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="medium" :inline="true">
            <el-form-item label="文件名称" prop="roleName">
                <el-input v-model="queryParams.fileName" placeholder="请输入文件名称" clearable style="width: 240px"
                    @keyup.enter.native="handleQuery" />
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker v-model="queryParams.startTime" style="width: 150px" value-format="yyyy-MM-dd"
                    placeholder="开始日期"></el-date-picker>
                -
                <el-date-picker v-model="queryParams.endTime" style="width: 150px" value-format="yyyy-MM-dd"
                    placeholder="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
            </el-form-item>
        </el-form>

        <el-row :gutter="10" class="mb8">
            <el-col :span="1.5">
                <el-button type="danger" plain icon="el-icon-delete" size="mini" @click="handleDelete"
                    :disabled="multiple">删除</el-button>
            </el-col>
            <el-col :span="1.5">
                <el-button type="warning" plain icon="el-icon-download" size="mini">导出</el-button>
            </el-col>
        </el-row>

        <el-table :data="tableData" height="650" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="id" label="文件编号" align="center" />
            <el-table-column prop="fileName" label="文件名" align="center">
            </el-table-column>
            <el-table-column prop="type" label="检测类型" align="center">
                <template slot-scope="scope">
                    <span>{{ getTypeText(scope.row.type) }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="wholeAiProb" label="AI概率" align="center">
            </el-table-column>
            <el-table-column prop="wholeRealProb" label="真实概率" align="center">
            </el-table-column>
            <el-table-column prop="dateTime" label="检测时间" align="center">
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-delete"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize" @pagination="getRecordText" /> -->
        <el-pagination @size-change="getRecordText" @current-change="getRecordText"
            :current-page="queryParams.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>

<script>

import { recordText, delFile } from "@/api/text.js"
import { getUser } from '@/api/user.js'
export default {
    name: 'text-page',
    data() {
        return {
            // 非多个禁用
            multiple: true,
            // 展示数据
            tableData: [],
            // 选中数组
            ids: [],
            // 总条数
            total: 0,
            // 查询参数
            queryParams: {
                pageNum: 1,
                pageSize: 10,
                startTime: '',
                endTime: '',
                fileName: '',
                userId: ''
            }
        };
    },
    created() {
        this.getRecordText()
    },
    methods: {
        getTypeText(type) {
            switch (type) {
                case 1:
                    return '综合检测';
                case 2:
                    return '学术检测';
                case 3:
                    return '文学检测';
                default:
                    return '未知检测'; // 或者你可以返回一个空字符串或其他默认值  
            }
        },
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.multiple = !selection.length
            // console.log(this.ids)
        },
        async getRecordText() {
            this.loading = true;
            const userInfo = await getUser()
            this.queryParams.userId = userInfo.data.id;
            recordText(this.queryParams).then(response => {
                this.tableData = response.data.rows;
                this.total = response.data.totalRows;
            })
            this.loading = false;
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            // this.getList();
            this.getRecordText();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.fileName = '';
            this.queryParams.startTime = '';
            this.queryParams.endTime = '';
            this.handleQuery();
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            console.log(row);
            const fileIds = row.id || this.ids;
            console.log(fileIds)
            this.$confirm('是否确认删除文件编号为"' + fileIds + '"的数据项？').then(function () {
                return delFile(fileIds);
            }).then(() => {
                this.getRecordText();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        }
    }
};
</script>

<style lang="scss" scoped></style>