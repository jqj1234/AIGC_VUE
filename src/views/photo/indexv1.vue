<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>图片检测</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex; align-items: center;">
    <!-- 文件上传表单 -->
    <input type="file" ref="fileInput" @change="handleFileChange($event)" accept=".png,.jpg" style="display: none;"/>
    <el-button type="primary" size="medium" @click="triggerFileUpload">选择图片</el-button>
    <span style="margin-left: 10px;">{{ selectedFileName }}</span>
    <el-button style="margin-left: 10%;" size="medium" type="success" @click="handleUpload" :loading="loading">开始检测</el-button>
    </div>
    <el-divider></el-divider>
    <div v-if="flag" class="result">
    <!-- 图片预览 -->
    <div v-if="imageUrl" class="image-preview">
      <span>待检测图片：</span>
      <img :src="imageUrl" alt="Image preview"  style="display: block; margin-left: 10px; margin-top: 20px; width: 50%;"/>
    </div>
    <div v-if="flag" class="image-preview">
      <el-divider></el-divider>
      <h3>检测结果：</h3>
      <li>
        <span>AI合成概率：{{ detectionResult.ai_prob }}%</span>
      </li>
    </div>
    <!-- <div v-if="imageUrl" class="default">
      <img src="../../assets/chart-03.png">
    </div> -->
  </div>
</div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { uploadImage } from '@/api/user.js'
export default {
  name: 'article-page',
  data () {
    return {
      loading: false,
      flag: false,
      selectedFileName: '未选择图片',
      fileToUpload: '',
      imageUrl: '', // 图片预览URL
      detectionResult: null
    }
  },
  components: {
  },
  methods: {
    triggerFileUpload () {
      this.$refs.fileInput.click()
    },
    handleFileChange (event) {
      const file = event.target.files[0]
      if (file) {
        this.fileToUpload = file
        this.flag = false
        this.selectedFileName = file.name
        // 生成图片预览URL
        this.imageUrl = URL.createObjectURL(file)
        console.log(this.fileToUpload)
      }
    },
    async handleUpload () {
      const maxSize = 3 * 1024 * 1024
      const allowedExtensions = /(\.png|\.jpg)$/i
      if (this.fileToUpload.size > maxSize) {
        this.$message.error('图片大小不能超过3MB')
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
          const response = await uploadImage(formData)
          this.detectionResult = response.data // 处理响应数据
          this.flag = true
        } catch (error) {
          console.error('上传失败：', error)
          this.$message.error('上传失败')
        }
        this.loading = false
      } else {
        this.$message.error('请先选择一个文件。')
      }
    }
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
    > i:hover {
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
  > h5 {
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
  background-color:white;
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
