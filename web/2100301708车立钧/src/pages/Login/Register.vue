<template>
  <div class="register_container">
    <div class="register_box">
      
      <h1 class="title">用户注册</h1>

      <el-form
        :rules="registerFormRules"
        ref="registerFormRef"
        label-width="0px"
        class="register_form"
        :model="registerForm">

        <el-form-item prop="username">
          <el-input
            placeholder="用户账号"
            v-model="registerForm.username"
            prefix-icon="iconfont icon-iconuser">
          </el-input>
        </el-form-item>


        <el-form-item prop="password">
          <el-input
            placeholder="用户密码"
            type="password"
            v-model="registerForm.password"
            prefix-icon="iconfont icon-suoding"
            show-password>
          </el-input>
        </el-form-item>

        <el-form-item prop="checkPass">
          <el-input
            type="password"
            placeholder="确认密码"
            prefix-icon="iconfont icon-suoding"
            v-model="registerForm.checkPass"
            autocomplete="off"
            show-password>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" 
            @click="doRegister" style="width: 48%" 
            :loading="registerLoading">注册
          </el-button>

          <el-button type="primary" 
          @click="toregister" style="width: 48%">返回登录
          </el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
  import { requestData } from "../../http/api";
export default {
  name: "Register",
  data() {
    var validateCheckPass = (rule,value,callback)=>{
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.registerForm.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    };

    var valueCheck=(rule,value,callback)=>{
      let reg= /^[a-zA-Z][a-zA-Z0-9]{3,10}$/
      if (!reg.test(value)) {
            callback(new Error('账号必须以字母开头且是字母与数字的组合'));
      } else {
          callback();
      }
    };

    var passCheck=(rule,value,callback)=>{
      let reg2=/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z0-9]{6,15}/;
      if (!reg2.test(value)) {
            callback(new Error('密码至少包括大写字母,小写字母和数字,不能含有符号'));
      } else {
          callback();
      }
    };

    return {
      registerLoading: false,
      registerForm: {
        username: "",
        password: "",
        checkPass: "",
      },

      registerFormRules: {
        username: [
          { required: true, message: "请输入注册账号", trigger: "blur" },
          {min: 3,max: 10,message: "长度在 3 到 10 个字符",trigger: "blur",},
          {validator: valueCheck, trigger: 'blur'}],
        password: [
          { required: true, message: "请输入注册密码", trigger: "blur" },
          {min: 6,max: 15,message: "长度在 6 到 15 个字符",trigger: "blur",},
          {validator: passCheck, trigger: 'blur'}],
        checkPass:[
          { required: true, message: "请再次输入注册密码", trigger: "blur" },
          {min: 6,max: 15,message: "长度在 6 到 15 个字符",trigger: "blur",},
          {validator: validateCheckPass, trigger: 'blur'}],
      },
    };
  },
  methods: {
    resetregisterForm() {
      this.$refs.registerFormRef.resetFields();
    },
    toregister() {
      this.$router.push("/login");
    },
    doRegister(){
      this.registerLoading = true;
      this.$refs.registerFormRef.validate(async valid => {
        if (!valid) {
          return (this.registerLoading = false)
        }
        const res = await requestData("/user/register?",{
          name:this.registerForm.username,
          password:this.registerForm.password
        })
        if(!res.data) return this.$message.error('注册失败!')
        if (res.data == "isexist") {
          this.registerLoading = false
          return this.$message.error('帐号已经存在!')
        }
        this.registerLoading = false
        this.$message.success('恭喜你,注册成功!')
        this.$router.push('/login');
      })
    }
  },
};
</script>

<style lang="css" scoped>
.register_container {
  height: 753px;
}

.register_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 320px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.register_box .register_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
}

.title {
  margin: 10px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
