<template>
    <div class="app-container">
        <el-form :model="queryParams" ref="queryForm" size="medium" :inline="true">
            <el-form-item label="图片类型"></el-form-item>
            <el-select v-model="queryParams.type" placeholder="图片类型">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-form-item label="创建时间" style="margin-left: 5%;">
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
            <el-table-column prop="id" label="图片编号" width="120" align="center" />
            <el-table-column label="图片预览" align="center"> <!-- 调整宽度以适应图片大小 -->
                <template slot-scope="scope">
                    <el-image :src="scope.row.url" fit="cover" style="width: 100%; height: auto;"></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="type" label="图片类型" align="center">
            </el-table-column>
            <el-table-column prop="aiProb" label="AI概率" align="center">
            </el-table-column>
            <el-table-column prop="datetime" label="检测时间" align="center">
            </el-table-column>
            <el-table-column label="操作" width="100" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" icon="el-icon-delete"
                        @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination @size-change="getRecordImage" @current-change="getRecordImage"
            :current-page="queryParams.pageNum" :page-sizes="[10, 20, 30, 40]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
    </div>
</template>


<script>
import { recordImage, delImage } from "@/api/photo.js"
import { getUser } from '@/api/user.js'
export default {
    name: 'image-page',
    data() {
        return {
            options: [{
                value: '',
                label: '全部图片'
            }, {
                value: 'png',
                label: 'PNG'
            }, {
                value: 'jpg',
                label: 'JPG'
            }],
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
                type: '',
                userId: ''
            }
        }
    },
    created () {
        this.getRecordImage()
    },
    methods: {
        handleSelectionChange(selection) {
            this.ids = selection.map(item => item.id)
            this.multiple = !selection.length
            // console.log(this.ids)
        },
        async getRecordImage() {
            this.loading = true;
            const userInfo = await getUser()
            this.queryParams.userId = userInfo.data.id;
            recordImage(this.queryParams).then(response => {
                this.tableData = response.rows;
                this.total = response.total;
            })
            this.loading = false;
        },
        /** 搜索按钮操作 */
        handleQuery() {
            this.queryParams.pageNum = 1;
            // this.getList();
            this.getRecordImage();
        },
        /** 重置按钮操作 */
        resetQuery() {
            this.queryParams.type = '';
            this.queryParams.startTime = '';
            this.queryParams.endTime = '';
            this.handleQuery();
        },
        /** 删除按钮操作 */
        handleDelete(row) {
            // console.log(row);
            const fileIds = row.id || this.ids;
            // console.log(fileIds)
            this.$modal.confirm('是否确认删除图片编号为"' + fileIds + '"的数据项？').then(function () {
                return delImage(fileIds);
            }).then(() => {
                this.getRecordImage();
                this.$modal.msgSuccess("删除成功");
            }).catch(() => { });
        }

    }
}
</script>

<style lang="scss" scoped></style>