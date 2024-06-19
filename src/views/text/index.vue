<template>
  <div class="text-page">
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>文本检测</el-breadcrumb-item>
      </el-breadcrumb> -->
    <div style="display: flex; align-items: center; margin-top: 1.5%; margin-left: 1%;">
      <!-- 文件上传表单 -->
      <input type="file" ref="fileInput" @change="handleFileChange($event)" accept=".docx,.txt"
        style="display: none;" />
      <el-button type="primary" size="medium" @click="triggerFileUpload">选择文件</el-button>
      <span style="margin-left: 10px;">{{ selectedFileName }}</span>
      <span style="margin-left: 150px;">当前检测模式:</span>
      <el-select style="margin-left: 20px;" v-model="value" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button style="margin-left: 5%;" size="medium" type="success" @click="handleUpload"
        :loading="loading">开始检测</el-button>
        <el-button style="margin-left: 5%;" size="medium" type="info" @click="goToRecordText">历史记录</el-button>
    </div>

    <el-divider></el-divider>
    <!-- <div v-if="!flag" class="default">
        <img src="../../assets/chart-03.png">
      </div> -->
    <!-- 检测结果 -->

    <div v-if="!flag" class="result" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div style="display: flex; justify-content: center;">
        <h2>结果示例</h2>
      </div>
      <h3 style="margin-left: 15px;">检测结果：</h3>
      <ul style="font-size: x-large; color: red;">
        <li>整体AI概率：87.103%</li>
        <li>整体真实概率：12.897%</li>
      </ul>
      <el-divider></el-divider>
      <ul style="font-size: large;">
        <li>
          <p>文本内容：人工智能（Artificial Intelligence, AI）是指由人制造出来的系统所表现出来的智能。自20世纪50年代起，人工智能经历了几次繁荣与低谷，如今正处于一个新的高潮。
            当前，人工智能因其对各行各业潜在的深刻影响而备受关注，被认为是新一轮科技革命和产业变革的核心动力。
          </p>
          <span>真实概率：30.205%</span>
          <span style="margin-left: 10%;">AI概率：69.795%</span>
        </li>
        <el-divider></el-divider>
        <li>
          <p>文本内容：人工智能（AI）技术的发展是多方面的，其中机器学习、深度学习和自然语言处理是当前AI技术发展的三大热点。
          </p>
          <span>真实概率：45.655%</span>
          <span style="margin-left: 10%;">AI概率：54.345%</span>
          <el-divider></el-divider>
        </li>
        <li>
          <p>
            文本内容：首先，机器学习是AI技术的核心组成部分之一。机器学习是一种使计算机系统能够从数据中学习和改进的技术。它通过训练模型来识别数据中的模式和规律，从而使计算机能够预测未知数据的结果。机器学习在许多领域都有广泛的应用，如推荐系统、语音识别、图像识别等。
          </p>
          <span>真实概率：36.455%</span>
          <span style="margin-left: 10%;">AI概率：63.545%</span>
          <el-divider></el-divider>
        </li>
        <li>
          <p>
            文本内容：其次，深度学习是机器学习的一个子领域，它模拟了人类大脑的神经网络结构，通过多层神经元的学习和推理来处理复杂的数据。深度学习在图像识别、语音识别等领域取得了显著成就。例如，通过深度学习训练的模型能够准确识别图像中的物体，使得计算机能够像人类一样理解和解析图像内容。
          </p>
          <span>真实概率：43.328%</span>
          <span style="margin-left: 10%;">AI概率：56.672%</span>
          <el-divider></el-divider>
        </li>
        <li>
          <p>
            文本内容：另外，自然语言处理是AI技术的另一个重要方向。自然语言处理致力于使计算机能够理解和响应人类语言。通过自然语言处理技术，计算机能够进行文本分析、情感分析、机器翻译等应用。例如，智能翻译应用利用自然语言处理技术将一种语言翻译成另一种语言，使得跨语言交流变得更加便捷。
          </p>
          <span>真实概率：17.438%</span>
          <span style="margin-left: 10%;">AI概率：82.562%</span>
          <el-divider></el-divider>
        </li>
        <li>
          <p>
            文本内容：......
          </p>
          <span>真实概率：......</span>
          <span style="margin-left: 13%;">AI概率：......</span>
          <el-divider></el-divider>
        </li>

      </ul>
    </div>


    <div v-if="flag" class="result" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <div style="display: flex; justify-content: center;">
        <span style="font-size: xx-large; margin-bottom: 1%; margin-top: 1%;">{{ selectedFileName }}</span>
      </div>
      <!-- <div>
        <div>
          <h3 style="margin-left: 15px;">检测结果：</h3>
          <ul style="font-size: x-large; color: red;">
            <li>整体AI概率：{{ detectionResult.whole_ai_prob }}%</li>
            <li>整体真实概率：{{ detectionResult.whole_real_prob }}%</li>
          </ul>
        </div>
        <div>
          <p style="display: flex; justify-content: center;">注意</p>
          <span>自动标红AI概率超过65%的文本</span>
        </div>
      </div> -->
      <div style="display: flex; justify-content: space-between;">
        <div style="flex: 1; border: 1px solid black;margin-left: 1%; margin-right: 10%;">
          <h3 style="margin-left: 15px;">检测结果：</h3>
          <ul style="font-size: x-large;">
            <li>
              <span v-if="detectionResult.whole_ai_prob > '65'" style="color: red; ">整体AI概率：</span>
              <span v-else>整体AI概率：</span>
              {{ detectionResult.whole_ai_prob }}%
            </li>
            <li>整体真实概率：{{ detectionResult.whole_real_prob }}%</li>
          </ul>
        </div>
        <div
          style="flex: 1; text-align: center; font-size: x-large; border: 1px solid black;margin-right: 1%;margin-left: 10%;">
          <p>注意</p>
          <span>自动标红AI概率超过65%的文本</span>
        </div>
      </div>
      <el-divider></el-divider>
      <ul style="font-size: large;">
        <li v-for="(detail, index) in detectionResult.details" :key="index">
          <p :style="{ color: detail.AI_probability > '65' ? 'red' : '' }">文本内容：{{ detail.text }}</p>
          <span>真实概率：{{ detail.real_probability }}%</span>
          <span :style="{ marginLeft: '10%', color: detail.AI_probability > '65' ? 'red' : '' }">AI概率：{{
            detail.AI_probability }}%</span>
          <el-divider></el-divider>
          <!-- <div class="feedback-container">
            <p>我要反馈：</p>
            <el-checkbox v-model="check[index]">预测错误</el-checkbox>
        </div> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { checkText, uploadText } from '@/api/text.js'
import { getUser } from '@/api/user.js'
export default {
  name: 'text-page',
  data() {
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
    goToRecordText() {  
      this.$router.push('/record/text')  
    },
    triggerFileUpload() {
      this.$refs.fileInput.click()
    },
    handleFileChange(event) {
      this.fileToUpload = event.target.files[0]
      this.flag = false
      this.selectedFileName = event.target.files[0].name
      console.log(this.fileToUpload)
    },
    async handleUpload() {
      const maxSize = 5 * 1024 * 1024
      const allowedExtensions = /(\.docx|\.txt)$/i
      if (this.fileToUpload.size > maxSize) {
        this.$message.error('文件大小不能超过5MB')
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
        // formData.append('model', this.value)
        this.loading = true
        try {
          // 上传文件
          const response = await uploadText(formData)
          const userInfo = await getUser()
          const info = {
            url: response.data.url,
            originalFilename: response.data.originalFilename,
            id: userInfo.data.id,
            username: userInfo.data.id,
            model: this.value
          }
          // const formData2 = new FormData()
          // formData2.append('info', info)
          // 提交新文件的url，和检测模式
          const response2 = await checkText(info)
          this.detectionResult = response2.data // 处理响应数据
          this.check = Array(this.detectionResult.details.length).fill(false)
          this.loading = false
          this.flag = true
        } catch (error) {
          console.error('上传失败：', error)
          this.$message.error('上传失败')
        }
      } else {
        this.$message.error('请先选择一个文件。')
      }
    },
    open() {
      const h = this.$createElement;
      this.$notify({
        title: '提示',
        message: h('i', { style: 'color: teal' }, '该功能用于检测文本由AI生成的概率,可以提交Word文档，TXT文档检测，限制文件大小5MB'),
        offset: 50,
        duration: 5500
      });
    }
  },
  watch: {
    // detectionResult: {
    //   handler(val) {
    //     // 存储到本地
    //     localStorage.setItem('todolist', JSON.stringify(val))
    //   },
    //   deep: true
    // }
  },
  components: {
  },
  mounted() {
    this.open();
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
  background-color: white;
  border-width: 2px;
  border-style: dashed;
  border-color: black;

  .feedback-container {
    display: flex;
    align-items: center;
    /* 垂直居中 */
    margin-top: 5px;
    /* 或根据需要调整上边距 */
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