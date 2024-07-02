<template>
  <div class="user-page">
    <el-card class="box-card" style="width: 400px; margin: 0 auto;">
    <div slot="header" class="clearfix">
      <span>个人中心</span>
    </div>
    <el-form :model="userData">
      <el-form-item label="用户名：">
        {{ userData.username }}
      </el-form-item>
      <el-form-item label="真实姓名：">
        <el-input v-model="userData.realName"></el-input>
      </el-form-item>
      <el-form-item label="昵称：">
        <el-input v-model="userData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="电话：">
        <el-input v-model="userData.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱：">
        <el-input v-model="userData.email"></el-input>
      </el-form-item>
      <el-form-item label="性别：">
        <el-radio-group v-model="userData.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item style="margin-left: 35%;">
        <el-button type="primary" @click="updateInfo">更新信息</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>

<script>
import { getUser, updateUser } from '@/api/user.js'
export default {
  name: 'user-page',
  data () {
    // 服务端返回的数据
    return {
      userData: {
        id: '',
        username: '',
        realName: '',
        nickName: '',
        phone: '',
        email: '',
        sex: ''
      }
    }
  },
  methods: {
    async updateInfo () {
      try {
        await updateUser(this.userData)
        this.$message({ type: 'success', message: '更新成功' })
      } catch (error) {
        this.$message({ type: 'error', message: '更新失败' })
      }
    },
    async getUserData () {
      try {
        const response = await getUser() // 使用你导入的 getUser 函数
        this.userData = response.data // 将取得的数据赋值给 userData
      } catch (error) {
        console.error(error)
      }
    }
  },
  created () {
    this.getUserData()
  }
}
</script>

<style scoped>
.profile {
  width: 200px;
  padding: 20px;
  background-color: #f9f9f9;
}
.profile ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.profile li {
  margin-bottom: 10px;
}
.profile li span {
  font-weight: bold;
}
</style>

