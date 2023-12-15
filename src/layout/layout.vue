<template>
  <div id="app">
    <!-- 头部 -->
    <div style="display:flex; height: 60px; background-color: white; line-height: 60px; border-bottom: 1px solid #ddd">
      <div style="width: 300px; display: flex">
        <div style="width: 100px; padding-left: 30px">
          <img src="../assets/imgs/logo.png" alt="" style="width: 60px; display: inline">
        </div>
        <div style="flex: 1; color: SlateBlue; font-size: 16px"><b style="font-weight: bolder">校园学习交友平台</b>
        </div>
      </div> <!-- logo -->
      <div style="flex: 1; padding-left: 50px">
        <el-menu
            style="border: none"
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            router
        >
          <el-menu-item index="/home">首页</el-menu-item>
          <el-menu-item index="/im">聊天室</el-menu-item>
          <el-menu-item index="/ai">Ai助学问答</el-menu-item>
        </el-menu>
      </div> <!-- 菜单区域 -->

      <div style="width: 200px; text-align: right; padding-right: 10px">

        <el-dropdown>
          <div class="el-dropdown-link" style="line-height: 60px">
            <el-avatar :size="40" :src="avatar" style="position: relative; top: 10px; right: 5px"/>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>
                <div @click="router.push('/personCenter?page=myInfo')">个人中心</div>
              </el-dropdown-item>
              <el-dropdown-item>
                <div @click="logout">退出登录</div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span style="font-weight: bolder;margin-left:20px;font-family: 宋体;font-size: larger">{{ user.username }}</span>
      </div> <!-- 头像和下拉菜单 -->
    </div>
    <!--  主体 -->
    <div style="margin: 10px auto 0 auto; width: 60%;height: calc(100vh - 110px)">
      <router-view/>  <!--  加载子路由的视图 -->
    </div>
    <div style="width: 100%;background-color: #8c8989;color:white;font-weight:bold;height: 40px;text-align: center;font-size: large">
      <span
          style="position: relative;top:7px;float: right;margin-right: 50px">@copyright 软件工程专业综合实训  小组成员：邓高勇 李华先 张静 郭帅 隆国强</span>
    </div>

  </div>
</template>

<script setup>
import {useUserStore} from "@/stores/user";
import router from "@/router";
import {ref} from "vue";

const store = useUserStore()

const logout = () => {
  localStorage.removeItem("user")
  router.push('/login')
}
const avatar = ref('')
const user = store.user  // {}
if (user.avatar) {
  avatar.value = user.avatar
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
}
.el-menu-item{
  font-size: larger;
  font-weight: bold;
  color: gray;

}
</style>
