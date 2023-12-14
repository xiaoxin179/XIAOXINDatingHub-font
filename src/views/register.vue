<template>
  <div
      style="
      height: 100vh;
      overflow: hidden;
      position: relative;
      background-color: #e6c3c3;
    "
  >
    <div class="main">
      <el-form ref="ruleFormRef" :rules="rules" status-icon :model="form">
        <h2 style="text-align: center">注册</h2>
        <el-form-item prop="username">
          <el-input
              v-model="form.username"
              :prefix-icon="User"
              placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
              v-model="form.email"
              :prefix-icon="Message"
              placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="display: flex">
            <el-input
                style="width: 213px"
                placeholder="输入邮箱验证码"
                v-model="form.emailCode"
            >
            </el-input
            >
            <el-button style="margin-left: 3px;width: 100px" @click="sentEmail" :disabled="timeStemp"
            >点击发送<span v-if="timeStemp">{{ timeStemp }}</span>
            </el-button
            >
          </div>
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
        <el-form-item prop="confirm">
          <el-input
              v-model="form.confirm"
              show-password
              :prefix-icon="Lock"
              placeholder="再次输入密码"
              autocomplete="new-password"
          ></el-input>
        </el-form-item>

        <div style="margin-bottom: 0.83em">
          <el-button style="width: 100%" type="primary" @click="register"
          >注册
          </el-button
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
          @click="router.push('/login')"
      >
        已有账号？点击登录
      </div>
    </div>
  </div>
</template>
<script setup>
import {reactive, ref} from "vue";
import {User, Lock, Message, Female} from "@element-plus/icons-vue";
import router from "../router";
import request from "../utils/request.js";

const form = reactive({});
import {ElMessage} from "element-plus";
import {useUserStore} from "../stores/user";

const reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//邮箱的正则表达式
// 创建出一个空的对象，没有任何的属性之后直接在代码中动态的添加属性即可
const ruleFormRef = ref();
const timeStemp = ref(0);
const confirmPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入确认密码"));
  }
  if (form && form.password !== value) {
    callback(new Error("两次输入的密码不一致"));
  }
  callback();
};
const checkEmail = (rule, value, callback) => {
  if (!reg.test(value)) {
    callback(new Error("输入的邮箱不合法！"));
  }
  callback();
};
const interval = ref(-1)
const rules = reactive({
  username: [{required: true, message: "请输入账号", trigger: "blur"}],
  password: [{required: true, message: "请输入密码", trigger: "blur"}],
  confirm: [{validator: confirmPassword, trigger: "blur"}],
  email: [{validator: checkEmail, trigger: "blur"}],
});
const store = useUserStore();
const sentEmail = () => {
  if (!reg.test(form.email)) {
    ElMessage.error("请确认邮箱的格式合法!")
    return
  }
  // 清空定时器
  // 每次点击按钮的时候都会清空一下
  if (interval.value > 0) {
    clearInterval(interval.value)
  }
  timeStemp.value = 10
  if (timeStemp.value > 0) {
    // 设置计时器，不等于0的时候一直是减减
    interval.value = setInterval(() => {
      timeStemp.value--
    }, 1000)
  }
  request.get("/email", {
    params: {
      email: form.email,
      type: "REGISTER"
    }
  }).then(res => {
    if (res.code === '200') {
      timeStemp.value = 10
      ElMessage.success("发送成功,有效期五分钟,尽快填写!");
    } else {
      ElMessage.error(res.msg)
    }
  })
}
const register = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      request.post("/register", form).then((res) => {
        if (res.code === "200") {
          ElMessage.success("注册成功，请登录");
          router.push("/login");
        } else {
          ElMessage.error(res.msg);
        }
      });
    }
  });
};
</script>
<style scoped>
.main {
  width: 360px;
  border-radius: 10px;
  margin: 0 auto;
  background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  box-shadow: 0 0 10px -4px rgba(0, 0, 0, 0.5);
}
</style>