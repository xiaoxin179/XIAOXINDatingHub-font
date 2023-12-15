<template>
  <div style="display: flex;" class="container-height">
    <div style="width: 240px; padding: 20px;margin-top:100px" class="box">
      <ul>
        <li class="li-radius" @click="changePagePath('myInfo')" :class="pagePath === 'myInfo' ? 'menu-active' : ''">
          <el-icon class="menu-icon">
            <User/>
          </el-icon>
          <span class="item-all">个人资料</span>
        </li>
        <li class="li-radius" @click="changePagePath('forAi')" :class="pagePath==='forAi'?'menu-active':''">
          <Icon icon="arcticons:openai-chatgpt" style="margin-right: 5px;position:relative;top:10px"/>
          <span class="item-all">账户管理</span>
        </li>
          <li class="li-radius" @click="changePagePath('updatepassword')" :class="pagePath==='updatepassword'?'menu-active':''">
            <el-icon class="menu-icon">
              <Lock/>
            </el-icon>
            <span class="item-all">修改密码</span>
          </li>
          <li class="li-radius" @click="changePagePath('messageAlert')" :class="pagePath==='messageAlert'?'menu-active':''">
            <el-icon class="menu-icon">
              <Message/>
            </el-icon>
            <span class="item-all">消息提醒</span>
          </li>
          <li class="li-radius" @click="changePagePath('myDynamic')" :class="pagePath === 'myDynamic' ? 'menu-active' : ''">
            <el-icon class="menu-icon">
              <Histogram/>
            </el-icon>
            <span class="item-all">我的动态</span>
          </li>
      </ul>
    </div>

    <div style="flex: 1; margin-left: 20px; padding: 30px 100px" class="box">
      <MyInfo v-if="pagePath === 'myInfo'"/>
      <MyDynamic v-if="pagePath === 'myDynamic'"/>
      <updatepassword v-if="pagePath==='updatepassword'"/>
      <MessageAlert v-if="pagePath==='messageAlert'"/>
      <ForAi v-if="pagePath==='forAi'"/>
    </div>
  </div>
</template>

<script setup>
import {User, Message, Histogram, Lock} from '@element-plus/icons-vue'
import MyInfo from "@/components/MyInfo.vue";
import MyDynamic from "@/components/MyDynamic.vue";
import {useRoute} from "vue-router";
import router from "@/router";
import {inject} from "vue";
import Updatepassword from "../components/updatepassword.vue";
import MessageAlert from "../components/MessageAlert.vue";
import { Icon } from '@iconify/vue';
import ForAi from "../components/forAi.vue";

const reload = inject('reload')

const route = useRoute()
const pagePath = route.query.page

const changePagePath = (pagePath) => {
  router.push({query: {page: pagePath}})  // 触发页面参数的更改
  route.query.page = pagePath     // 触发菜单的高亮和页面你内容的更改
  console.log(pagePath)
  reload()    // 重新渲染页面
}


</script>

<style scoped>
.box {
  background-color: white;
  border-radius: 10px;
}

li {
  text-align: center;
  margin: 20px 0;
  height: 50px;
  cursor: pointer;
  font-size: 16px;
}

li {
  list-style-type: none;
}

.menu-icon {
  margin-right: 10px;
  position: relative;
  top:13px;

}

.menu-active {
  color: dodgerblue;
  background-color: #a6c1ee;
}
.item-all {
  font-weight: bolder;
  color: gray;
  font-size: large;
  position: relative;
  top: 10px;

}
.li-radius{
  border-radius: 5px;
}
</style>
