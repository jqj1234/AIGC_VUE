<template>
  <div class="login-page">
    <el-card class="my-card" v-if="isLoginForm">
      <template #header>
        <div>明甄谛听</div>
      </template>
      <el-form ref="myForm" :model="form" :rules="rules" >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item class="tc">
        <el-button type="primary" @click="clickLogin">登录</el-button>
        <el-button @click="changeForm">注册</el-button> <!-- 点击时切换到注册表单 -->
      </el-form-item>
      </el-form>
    </el-card>
    <el-card class="my-card" v-else>
      <template #header><div>注册</div></template>
      <el-form ref="registerForm" :model="form" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" @blur="checkUsername"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="tc">
        <el-button type="primary" @click="clickRegister">注册</el-button>
        <el-button @click="changeForm">返回登录</el-button> <!-- 点击时切换回登录表单 -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 原则：每次写导入的时候思考一下，要导入的是按需（多个导出） 还是 默认（单个导出）
import { login, register, checkUsernameExist } from '@/api/user.js'

export default {
  name: 'LoginIndex',
  data () {
    return {
      isLoginForm: true,
      form: {
        username: '',
        password: ''
      },
      rules: {
        // 设置对应字段的校验规则
        // 1. required: true 必填
        // 2. message: xx    错误提示消息
        // 3. trigger: 'blur' / 'change' 设置触发校验的时机，可选项就两个值
        //    (1) blur 失去焦点校验 （常规）
        //    (2) change 实时校验, 类似于输入框input事件的效果
        username: [
          { required: true, message: '请输入账户名称', trigger: ['change', 'blur'] },
          { min: 5, max: 11, message: '长度必须是5-11位', trigger: ['change', 'blur'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['change', 'blur'] },
          // \d 0-9
          // \w 数字字母下滑线
          // {m,n} 前一个字符可以出现 m ~ n 次 （包含m n）
          { pattern: /^\w{5,11}$/, message: '请输入5-11位的字符', trigger: ['change', 'blur'] }
        ]
      }
    }
  },
  methods: {
    changeForm () {
      this.isLoginForm = !this.isLoginForm // 切换表单
    },
    async clickLogin () {
      // 先校验整个表单，通过了校验，才发请求
      // console.log('发请求')
      try {
        // validate 方法会得到一个 promise 对象，前面可以 await 处理
        // 调用api的login方法，发送请求
        const res = await login(this.form)
        // 公司里面实际规范：将token等个人信息，存入vuex，便于各个页面组件访问 => 存storage（持久化存储）
        // vuex中的数据，类似于data中的数据, 一旦刷新页面，就会重新初始化（vuex刷新会丢失数据）
        // 所有访问token，访问个人信息，一律找vuex。存本地就一个目的：保证刷新之后，vuex的数据还在
        // console.log(res.data.token)
        if (res.code === 0) {
          this.$message.error(res.msg)
        }
        this.$store.commit('user/setUserToken', res.data.token)
        // 注意：一定要等vuex token存好了，再跳首页
        this.$router.push('/text')
        if (res.code === 1) {
          this.$message.success('登录成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async checkUsername () {
      // 检查用户名是否已存在，这需要后端的支持
      if (!this.form.username) {
        return
      }
      const res = await checkUsernameExist(this.form.username)
      if (res.isExist) {
        this.$message.error('用户名已存在')
      }
    },
    async clickRegister () {
      if (!this.form.username || !this.form.password) {
        this.$message.error('用户名和密码不能为空')
        return
      }
      const res = await checkUsernameExist(this.form.username)
      if (res.isExist) {
        this.$message.error('用户名已存在')
        return
      }
      // 在这里添加注册逻辑
      try {
        const res = await register(this.form)
        this.$message.success(res.data)
      } catch (e) {
        this.$message.error('注册失败，请重试')
        return
      }
      this.changeForm()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  // 利用flex水平垂直居中
  display: flex;
  justify-content: center;
  align-items: center;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: rgba(114,124,245,1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}

</style>
