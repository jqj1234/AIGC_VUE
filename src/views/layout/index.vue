<template>
  <el-container class="layout-page">
      <el-header>
        <div class="logo">
        <img src="../../assets/title2.png" width="140px" >
        </div>
        <!-- <div class="title">
          <span style="margin-left: 40px;">泛用式AI参与度检测系统</span>
        </div> -->
        <div class="detail">
          <span>支持</span>
          <span style="margin-left: 20px;">相关帮助</span>
        </div>
        <div class="user">
          <el-avatar
            :size="36"
            :src="avatar"
          ></el-avatar>
          <el-link :underline="false">{{name}}</el-link>
        </div>
        <div class="logout">
          <!-- confirm事件 => 用户点击了确认的时候触发 -->
          <el-popconfirm title="您确认退出吗？" @confirm="handleConfirm">
            <i slot="reference" title="logout" class="el-icon-switch-button"></i>
          </el-popconfirm>
        </div>
      </el-header>
  <el-container>
      <el-aside width="200px">
      <el-menu
        router
        :default-active="$route.path"
        background-color="#0d2c53da"
        text-color="#8391a2"
        active-text-color="#FFF"
      >
        <el-menu-item index="/text">
          <i class="el-icon-tickets"></i>
          <span>文本检测</span>
        </el-menu-item>
        <el-menu-item index="/image">
          <i class="el-icon-picture-outline"></i>
          <span>图片检测</span>
        </el-menu-item>
        <el-menu-item index="/text-record">
          <i class="el-icon-pie-chart"></i>
          <span>文本历史</span>
        </el-menu-item>
        <el-menu-item index="/image-record">
          <i class="el-icon-coin"></i>
          <span>图片历史</span>
        </el-menu-item>
        <el-menu-item index="/user">
          <i class="el-icon-user"></i>
          <span>个人中心</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
  </el-container>
  </el-container>
</template>

<script>
import { getUser } from '@/api/user.js'
export default {
  name: 'layout-page',
  data () {
    return {
      avatar: '',
      name: ''
    }
  },
  created () {
    this.initData()
  },
  methods: {
    async initData () {
      const { data } = await getUser()
      // this.avatar = data.avatar
      // this.name = data.name
      this.avatar = 'http://teachoss.itheima.net/heimaQuestionMiniapp/%E5%AE%98%E6%96%B9%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F%402x.png'
      this.name = data.username
    },
    handleConfirm () {
      this.$store.commit('user/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-page {
  height: 100vh;
  .el-aside {
    background: #0d2c53da;
    .logo {
      color: #fff;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }
    .el-menu {
      border-right: none;
      margin-top: 0px;
      &-item {
        background-color: transparent !important;
        > span, i {
          padding-left: 10px;
          font-size: large;
        }
      }
    }
  }
  .el-header {
    box-shadow: 0px 0px 35px 0px rgba(154, 161, 171, 0.15);
    background: #fff;
    display: flex;
    // justify-content: flex-end;
    align-items: center;
    z-index: 999;
    .user {
      margin-left: auto;
      display: flex;
      align-items: center;
      background: #e7e8ec;
      height: 60px;
      border: 1px solid #f1f3fa;
      padding: 0 15px;
      .el-avatar {
        margin-right: 15px;
      }
    }
    .title {
      display: flex;
      font-size: larger;
      color:#08181b;
      justify-content: flex-start;
    }
    .logout {
      font-size: 20px;
      color: #999;
      cursor: pointer;
      padding: 0 15px;
    }
    .detail {
      justify-content: flex-end;
      margin-left: 65%;
      margin-right: 10px;
    }
  }
  .el-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #aaa;
    border-top: 1px solid rgba(152, 166, 173, 0.2);
    font-size: 14px;
  }
}
</style>
