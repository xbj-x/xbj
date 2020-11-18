<template>
  <div>
    <el-container class="con">
      <el-aside width="200px">
        <!-- 侧边栏导航
            unique-opened 只有一个子菜单展开
            router 路由模式
        -->
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#20222a"
          text-color="#fff"
          active-text-color="#ffd04b"
          unique-opened
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <!-- 动态侧边栏 -->
          <div v-for="item in userInfo.menus" :key="item.id">
            <!-- 目录 -->
            <el-submenu :index="item.id+''" v-if="item.children">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
            </el-submenu>
            <!-- 菜单 -->
            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="hd-r">
            <span class="user-head">您好，{{userInfo.username}}</span>
            <el-button type="primary" @click="logout" class="tuichu">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{path:'/'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>
              <a href="/">{{$route.name}}</a>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="main"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  methods: {
    ...mapActions({
      changeUser: "changeUser",
    }),
    // 退出
    logout() {
      // 清掉vuex+本地存储
      this.changeUser({});
      // 跳转页面
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style scoped>
.con {
  height: 100vh;
}
.el-aside {
  background-color: #20222a;
}
.el-header {
  background-color: #b3c0d1;
  text-align: center;
}
.main {
  padding-top: 20px;
}
.hd-r{
  float: right;
}
.user-head {
  line-height: 55px;
}
.tuichu {
  margin-top: 10px;
}
</style>