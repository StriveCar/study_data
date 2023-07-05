<template>
  <div class="login_container">
    <div class="login_box">

      <div class="avatar_box">
        <img src="./ikun1.0.jpg" alt="" />
      </div>

      <el-form
        :rules="loginFormRules"
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm">

        <el-form-item prop="username">
          <el-input 
            placeholder="用户账号"
            v-model="loginForm.username"
            prefix-icon="iconfont icon-iconuser">
          </el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            placeholder="用户密码"
            type="password"
            v-model="loginForm.password"
            prefix-icon="iconfont icon-suoding"
            show-password>
          </el-input>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="doLogin" 
            style="width: 100%;" :loading="loginLoading">登录</el-button>
        </el-form-item>

        <el-row style="text-align: center;padding-bottom: 10px;">
          <el-link type="primary" @click="toRegister">用户注册</el-link>
        </el-row>
        
      </el-form>
    </div>
  </div>
</template>

<script>
    import {requestData} from "../../http/api"
    
export default {
  name: "Login",
  data() {
    return {
      loginLoading: false,
      loginForm: {
        username: "kkx2",
        password: "123456",
      },
      loginFormRules: {
        username: [
          { required: true, message: "请输入登录账号", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          }
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    toRegister(){
      this.$router.push('/register')
    },
    doLogin() {
      this.loginLoading = true;
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return (this.loginLoading = false)
        }
        const res = await requestData("/user/login?",{
          name:this.loginForm.username,
          password:this.loginForm.password
        })
        this.loginLoading = false
        if(res.code=="ERR_BAD_RESPONSE" || !res.data)
        {
          return this.$message.error("登录超时!");
        }
        else if (res.data == "invalid") {
          return this.$message.error('登录失败 帐号或密码错误!')
        }
        this.$message.success('恭喜你,登录成功!')
        // pubsub.publish('token',res.data)
        window.sessionStorage.setItem('token', res.data)
        this.$router.push('/commodity')
      })
      // requestData("/user/login?",{
      //   name:this.loginForm.username,
      //   password:this.loginForm.password
      // })
      // .then((res) => {
      //   if(res.data == "invalid")
      //   {
      //     return this.$message.error("账号或密码错误!");
      //   }
      //   this.loginLoading = false;
      //   this.$message({
      //       message: "恭喜你，登陆成功!",
      //       type: "success",
      //     });
      //   window.sessionStorage.setItem('token',res.data)
      //   })
      // .catch((err) => {
      //     this.loginLoading = false;
      //     if(err.code==="ERR_BAD_RESPONSE")
      //     {
      //       this.$message.error("登录超时");
      //     }
      //   });
    },
  },
};
</script>

<style lang="css" scoped>
.login_container {
  height: 753px;
  /* background-color: #475163; */
}
.login_box {
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
.login_box .avatar_box {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  width: 120px;
  height: 120px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  background-color: #fff;
}
.login_box .avatar_box img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eeeeee;
}
.login_box .login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 40px;
}

</style>