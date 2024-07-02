<template>
    <div class="article-page">
        <div style="display: flex; align-items: center; margin-top: 1.5%; margin-left: 1%;">
            <!-- 文件上传表单 -->
            <input type="file" ref="fileInput" @change="handleFileChange($event)" accept=".png,.jpg"
                style="display: none;" />
            <el-button type="primary" size="medium" @click="triggerFileUpload">选择图片</el-button>
            <span style="margin-left: 10px;">{{ selectedFileName }}</span>
            <el-button style="margin-left: 15%;" size="medium" type="success" @click="handleUpload"
                :loading="loading">开始检测</el-button>
            <el-button style="margin-left: 5%;" size="medium" type="info" @click="goToRecordImage">历史记录</el-button>

        </div>
        <el-divider></el-divider>
        <div v-if="fileToUpload" class="result">
            <!-- 图片预览 -->
            <div v-if="imageUrl" class="image-preview">
                <span>待检测图片：</span>
                <img :src="imageUrl" alt="Image preview"
                    style="display: block; margin-left: 10px; margin-top: 20px; width: 50%;" />
            </div>
            <div v-if="detectionResult" class="image-preview">
                <el-divider></el-divider>
                <h3 style="font-size: x-large;">检测结果：</h3>
                <li>
                    <span style="font-size: larger;">AI合成概率：{{ detectionResult.ai_prob }}%</span>
                </li>
            </div>
            <!-- <div v-if="imageUrl" class="default">
      <img src="../../assets/chart-03.png">
    </div> -->
        </div>
    </div>
</template>

<script>
import { checkImage, uploadImage } from '@/api/photo.js'
import { getUser } from '@/api/user.js'
export default {
    name: "photo-page",
    data() {
        return {
            loading: false,
            flag: false,
            selectedFileName: '未选择图片',
            fileToUpload: '',
            imageUrl: '', // 图片预览URL
            detectionResult: ''
        }
    },
    components: {
    },
    methods: {
        goToRecordImage() {
            this.$router.push('/record/photo')
        },
        triggerFileUpload() {
            this.$refs.fileInput.click()
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            if (file) {
                this.fileToUpload = file
                this.flag = false
                this.selectedFileName = file.name
                // 生成图片预览URL
                this.imageUrl = URL.createObjectURL(file)
                // console.log(this.fileToUpload)
                // console.log(this.imageUrl)
            }
        },
        async handleUpload() {
            const maxSize = 5 * 1024 * 1024
            const allowedExtensions = /(\.png|\.jpg)$/i
            if (this.fileToUpload.size > maxSize) {
                this.$message.error('图片大小不能超过5MB')
                return
            }
            // 检查文件后缀
            if (!allowedExtensions.test(this.fileToUpload.name)) {
                this.$message.error('只能上传图片')
                return
            }
            if (this.fileToUpload) {
                const formData = new FormData()
                formData.append('file', this.fileToUpload)
                this.loading = true
                try {
                    // 上传文件
                    const response = await uploadImage(formData)
                    const userInfo = await getUser()
                    const info = {
                        url: response.data.url,
                        type: this.fileToUpload.name.substring(this.fileToUpload.name.lastIndexOf('.') + 1),
                        username: userInfo.data.username,
                        id: userInfo.data.id
                    }
                    const response1 = await checkImage(info)
                    this.detectionResult = response1.data // 处理响应数据
                    this.flag = true
                } catch (error) {
                    console.error('上传失败：', error)
                    this.$message.error('上传失败')
                }
                this.loading = false
            } else {
                this.$message.error('请先选择一个文件。')
            }
        },
        open() {
            const h = this.$createElement;
            this.$notify({
                title: '提示',
                message: h('i', { style: 'color: teal' }, '该功能用于检测图片由AI生成的概率,可以提交PNG、JPG格式图片检测，限制文件大小5MB'),
                offset: 50
            });
        }
    },
    mounted() {
        this.open();
    }
}
</script>
<style lang="scss" scoped>
.el-card {
    margin-top: 25px;

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 16px;
    }

    .actions {
        font-size: 18px;
        display: flex;
        justify-content: space-around;
        color: #666;

        >i:hover {
            color: rgba(114, 124, 245, 1);
            cursor: pointer;
        }
    }
}

.el-pagination {
    margin-top: 20px;
    text-align: center;
}

.el-breadcrumb {
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: medium;
}

.el-form {
    padding-right: 40px;
}

.quill-editor {
    ::v-deep .ql-editor {
        height: 300px;
    }
}

.el-rate {
    padding: 10px 0;
}

.article-preview {
    padding: 0 40px 40px 40px;

    >h5 {
        font-size: 20px;
        color: #666;
        border-bottom: 1px dashed #ccc;
        padding-bottom: 30px;
        margin: 0 0 20px 0;
    }
}

.result {
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 20px;
    background-color: white;
    border-width: 2px;
    border-style: dashed;
    border-color: black;

    .image-preview {
        margin-left: 15px;
        margin-top: 10px;
        font-weight: bolder;
    }
}
</style>
