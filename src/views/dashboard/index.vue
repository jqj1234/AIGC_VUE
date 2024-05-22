<template>
  <div class="text-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>文本检测</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="display: flex; align-items: center;">
    <!-- 文件上传表单 -->
    <input type="file" ref="fileInput" @change="handleFileChange($event)" accept=".docx,.txt" style="display: none;"/>
    <el-button type="primary" size="medium" @click="triggerFileUpload">选择文件</el-button>
    <span style="margin-left: 10px;">{{ selectedFileName }}</span>
    <span style="margin-left: 150px;">当前检测模式:</span>
    <el-select style="margin-left: 20px;" v-model="value" placeholder="请选择">
      <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
    </el-select>
    <el-button style="margin-left: 10%;" size="medium" type="success" @click="handleUpload" :loading="loading">开始检测</el-button>
    </div>
    <el-divider></el-divider>
    <div v-if="!flag" class="default">
      <img src="../../assets/chart-03.png">
    </div>
    <!-- 检测结果 -->
    <div v-if="flag" class="result">
      <h3 style="margin-left: 15px;">检测结果：</h3>
      <ul>
        <li>
          <p>整体AI概率：{{ detectionResult.whole_ai_prob }}%</p>
          <p>整体真实概率：{{ detectionResult.whole_real_prob }}%</p>
        </li>
        <el-divider></el-divider>
        <li v-for="(detail, index) in detectionResult.details" :key="index">
          <p>文本内容：{{ detail.text }}</p>
          <p>真实概率：{{ detail.real_probability }}%</p>
          <p>AI概率：{{ detail.AI_probability }}%</p>
        <div class="feedback-container">
          <p>我要反馈：</p>
          <el-checkbox v-model="check[index]">预测错误</el-checkbox>
      </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { uploadText } from '@/api/user.js'

export default {
  name: 'text-page',
  data () {
    return {
      check: [],
      loading: false,
      fileToUpload: '',
      detectionResult: null,
      options: [{
        value: 1,
        label: '综合类检测'
      }, {
        value: 2,
        label: '学术类检测'
      }, {
        value: 3,
        label: '文学类检测'
      }],
      value: 1,
      flag: false,
      selectedFileName: '未选择文件'
    }
  },
  methods: {
    triggerFileUpload () {
      this.$refs.fileInput.click()
    },
    handleFileChange (event) {
      this.fileToUpload = event.target.files[0]
      this.flag = false
      this.selectedFileName = event.target.files[0].name
      console.log(this.fileToUpload)
    },
    async handleUpload () {
      const maxSize = 3 * 1024 * 1024
      const allowedExtensions = /(\.docx|\.txt)$/i
      if (this.fileToUpload.size > maxSize) {
        this.$message.error('文件大小不能超过3MB')
        return
      }
      // 检查文件后缀
      if (!allowedExtensions.test(this.fileToUpload.name)) {
        this.$message.error('只能上传 Word文档 或 文本文档')
        return
      }
      if (this.fileToUpload) {
        const formData = new FormData()
        formData.append('file', this.fileToUpload)
        formData.append('model', this.value)
        this.loading = true
        try {
          const response = await uploadText(formData)
          this.detectionResult = response.data // 处理响应数据
          this.check = Array(this.detectionResult.details.length).fill(false)
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
.dashboard-page {
  .el-upload {
    margin-bottom: 20px;
  }
  .el-breadcrumb {
    margin-top: 10px;
    margin-bottom: 25px;
    font-size: medium;
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
  .feedback-container {
    display: flex;
    align-items: center; /* 垂直居中 */
    margin-top: 5px; /* 或根据需要调整上边距 */
  }
}
.default {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}
.default img {
  max-width: 100%;
  height: auto;
}
</style>
