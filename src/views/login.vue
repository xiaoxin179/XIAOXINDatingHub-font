<template>
  <div
    style="
      height: 100vh;
      overflow: hidden;
      position: relative;
      background-color: #ebe4e4;
    "
  >
    <div
      style="
        width: 300px;
        border-radius: 10px; 
        margin: 0 auto;
        background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
        padding: 20px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        box-shadow: 0 0 10px -4px rgba(0, 0, 0, 0.5);
      "
    >
      <el-form ref="ruleFormRef" :rules="rules" status-icon :model="form">
        <h2 style="text-align: center">后台登录</h2>
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            :prefix-icon="User"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            show-password
            :prefix-icon="Lock"
            placeholder="请输入密码"
            autocomplete="new-password"
          ></el-input>
        </el-form-item>
        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="login"
            >登录</el-button
          >
        </div>
      </el-form>
      <div
        style="
          text-align: right;
          font-size: small;
          color: rgb(115, 115, 218);
          cursor: pointer;
        "
        @click="router.push('/register')"
      >
        没有账号？点击注册
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import router from "../router";
import request from "../utils/request.js"
import { ElMessage } from "element-plus";
// 创建出一个空的对象，没有任何的属性之后直接在代码中动态的添加属性即可
const ruleFormRef = ref();
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const form = reactive({});
const login = () => {
  ruleFormRef.value.validate(valid => {
    request.post("/login",form).then(res=>{
      if(res.code==='200'){
        ElMessage.success('登录成功')
        router.push('/')
      }else{
        ElMessage.error(res.msg)
      }
    })
  })
}
</script>
<style>
</style>