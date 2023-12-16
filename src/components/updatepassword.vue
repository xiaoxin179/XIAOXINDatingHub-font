<template>
    <el-form :model="updateForm">
      <div style="margin-top: 150px">
        <el-input
            placeholder="输入用户身份证"
            style="width: 380px; margin: 50px 10px 10px;"
            v-model="updateForm.idcard"
            prop="idcard"
            :disabled="isUpdate === false"
            size="large"

        ></el-input>
      </div>
      <div>
        <el-input
            placeholder="输入新的密码"
            type="password"
            style="width: 380px; margin: 10px"
            v-model="updateForm.password"
            prop="password"
            :disabled="isUpdate === false"
            size="large"
        ></el-input>
      </div>
      <div>
        <el-input
            placeholder="确认密码"
            type="password"
            style="width: 380px; margin: 10px"
              v-model="updateForm.confirmPwd"
            prop="confirmPwd"
            :disabled="isUpdate === false"
            size="large"
        ></el-input>
      </div>
      <el-button style="margin: 10px;width: 25%" @click="update">修改</el-button>
      <el-button type="primary" style="width: 25%;margin-left: 25px" @click="save"
      >提交</el-button
      >
    </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
const updateForm = reactive({});
const isUpdate = ref(false);
import request from "../utils/request";
import { useUserStore } from "../stores/user";
import { ElMessage } from "element-plus";
import router from "../router";
const update = () => {
  isUpdate.value = true;
};

const store = useUserStore();
const form = reactive();
const user = store.user;
const save = () => {
  user.password = updateForm.password;
  user.idcard = updateForm.idcard;
  request.put("/user/updatepassword", user).then((res) => {
    if (res.code === "200") {
      ElMessage.success("用户密码修改成功！");
      router.push("/login");
    } else {
      ElMessage.error(res.msg);
      isUpdate.value=false
    }
  });
  updateForm.idcard = "";
  updateForm.password = "";
  updateForm.confirmPwd = "";
};
</script>
<style scoped>
</style>