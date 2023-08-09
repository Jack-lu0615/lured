<template>
  <div class='myLogin'>
    <div class='myLoginForm'>
      <el-form :model='loginForm'
               ref='form'
               :rules='loginRules'
               class='loginContainer'
               v-loading='loading'
               element-loading-text='正在登录...'
               element-loading-spinner='el-icon-loading'
               element-loading-background='rgba (0, 0, 0, 0.8)'>
        <h3 class='loginTitle'>用户登录</h3>
        <!-- prefix-icon='el-icon-user' -->
        <div class='myLoginBody'>
          <el-form-item prop='loginName'>
            <el-input placeholder='请输入用户名'
                      v-model='loginForm.loginName'
                      class='userInput'
                      autocomplete='off'>
            </el-input>
          </el-form-item>
          <el-form-item prop='password'>
            <!-- prefix-icon='el-icon-lock' -->
            <el-input type='password'
                      v-model='loginForm.password'
                      placeholder='请输入密码'
                      clearable
                      auto-complete='false'
                      class='passwordInput'
                      @keyup.enter.native='submitLogin'
                      autocomplete='off'></el-input>
          </el-form-item>
          <el-form-item class='btnClicks'>
            <!-- <el-button class='registerBtn' type='text' size='medium' @click='registerSub'>注册账户</el-button> -->
            <div class='changeFontBtn'>
              <el-button class='sureBtn'
                         type='primary'
                         @click='submitLogin'>登录</el-button>
            </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class='bottomlogo'>
      <img src='../../../static/image/公司标志-02.png'
           alt='' />
      <span>北京国遥新天地信息技术股份有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      mainSystemTitle: '',
      // captchaUrl: '/api/auth/captcha?time=' + new Date (),
      loginForm: {
        loginName: '',
        password: '',
      },
      registerVisible: false, //注册账户弹框显隐控制
      loading: false,
      checked: true,
      loginRules: {
        loginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      },
    }
  },
  methods: {
    updateCaptcha () { },
    // 注册账户
    registerSub () {
      this.registerVisible = true
    },
    // 注册账户关闭提示
    registerClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          // this.commonClearForm ()
          this.$refs.registerForm.cancelReigister()
          done()
        })
        .catch((_) => { })
    },
    // 公用清空注册表
    commonClearForm () {
      this.$refs.registerForm.formRegister = {
        name: '',
        password: '',
        checkPassword: '',
        type: '',
        telephone: '',
      }
      this.$refs.registerForm.clearWrongMessage()
    },
    // 提交账户注册申请
    submitRegister () {
      // this.commonClearForm ()
      this.$refs.registerForm.submitReigisters()
      // this.$refs.registerForm.cancelReigister ()
      // this.registerVisible = false
    },
    // 关闭账户注册
    closeRegister () {
      // this.commonClearForm ()
      this.$refs.registerForm.cancelReigister()
      this.registerVisible = false
    },
    // 登录账户
    submitLogin () {
      let that = this
      // eslint-disable-next-line quotes
      let url = 'http://192.168.124.60:8999/user/doLogin'
      console.log(this.$refs.form.validate())
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http
            .get(
              url +
              '?userName=' +
              this.loginForm.loginName +
              '&password=' +
              this.loginForm.password
            )
            .then((resp) => {
              if (resp) {
                if (
                  resp.data.code === 500 ||
                  resp.data.code == 401 ||
                  resp.data.code == 403
                ) {
                  that.$message.error({
                    message: resp.data.message,
                    duration: 1500,
                  })
                  that.updateCaptcha()
                  return
                }
                if (resp.data.code == 200) {
                  if (resp.data.result && resp.data.result != false) {
                    // //保存登录用户信息
                    // window.sessionStorage.setItem ('token', resp.data.result.token)
                    // window.sessionStorage.setItem ('permission', JSON.stringify (resp.data.result.permission))

                    // //跳转页面
                    that.$router.push({ path: '/home' })
                  } else {
                    console.log(resp.data.message, 'resp.data.message')
                    that.$message.error({
                      message: resp.data.message,
                      duration: 1500,
                    })
                  }
                }
              }
            })
            .catch((error) => {
              if (error.response) {
                this.$message.error({
                  message: '登录失败',
                  duration: 1500,
                })
              }
            })
        } else {
          that.$message.error({
            message: '请输入所有字段',
            duration: 1500,
          })
          return false
        }
      })
    },
    checkStatus () {
      if (window.sessionStorage.getItem('token')) {
        let path = this.$route.query.redirect
        this.$router.push(path == '/' || path == undefined ? '/home' : path)
      }
    },
  },
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
.myLogin {
  width: 100%;
  height: 100%;
  background-image: url ("../../../static/image/火箭军登录背景.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  /* padding-top: 297px */
}
.myLogin .bottomlogo {
  position: absolute;
  bottom: 10px;
  color: #fff;
  text-align: center;
  width: 100%;
}
.myLogin .bottomlogo img {
  width: 60px;
  height: 25px;
  vertical-align: middle;
  margin-right: 12px;
}
.myLogin .bottomlogo span {
  vertical-align: middle;
  line-height: 25px;
  font-size: 20px;
  font-family: "Microsoft YaHei";
}
.myLoginForm {
  position: absolute;
  left: calc (50% - 371.5px);
  top: calc (50% - 205px);
  width: 743px;
  height: 411px;
  background-image: url ("../../../static/image/登录背景-02.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myLoginForm .loginContainer {
  padding: 0 !important;
}
.myBodyContainerLogin >>> .el-dialog__header {
  border-bottom: 1px solid #999;
}
.myLoginTitle {
  margin-top: 138px;
  position: absolute;
  width: 100%;
}
.myLoginTitle h1 {
  width: 100%;
  text-align: center;
  font-size: 40px;
  color: #fff;
}
.myLogin .changeFontBtn {
  width: 148px;
  height: 42px;
  display: inline-block;
  background-image: url ("../../../static/image/登录未点击-02.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.myLogin .changeFontBtn:hover {
  background-image: url ("../../../static/image/登录已点击-02.png");
  background-size: cover;
  background-repeat: no-repeat;
}

.myLogin .sureBtn {
  margin-top: 0;
  width: 148px;
  height: 42px;
  background-color: transparent;
  border: none;
  font-size: 20px;
  font-weight: bold;
  background-image: linear-gradient (rgb (14, 252, 252), rgb (239, 240, 241));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.loginArea {
  width: 387px;
  height: 402px;
  border-radius: 23px;
  background-image: url ("../../../static/image/登录背景-02.png");
  position: absolute;
  left: calc (50% - 215px);
  top: calc (50% - 201px);
  padding: 0 30px;
}
.loginContainer {
  padding-left: 15px;
  /* margin-top: 30px */
  width: 100%;
}
.loginContainer h3 {
  padding: 48px 0 40px 0;
  opacity: 0.7;
  color: #fff;
  font-size: 30px;
  /* margin-bottom: 15px */
  width: 100%;
  font-weight: bold;
  margin: 0;
  /* background-image: linear-gradient (rgb (14,252,252), rgb (239,240,241))
  background-clip: text
  -webkit-background-clip: text
  color: transparent
  text-align: center */
}
.myLoginForm .loginTitle {
  text-align: center;
  width: 100%;
  background-image: linear-gradient (rgb (0, 252, 252), rgb (255, 255, 255));
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.myLoginBody >>> .el-form-item__content {
  margin-left: 167px !important;
  text-align: left;
  height: 41px;
}
input:-webkit-autofill .myLoginBody >>> .el-input__inner {
  -webkit-appearance: none;
  /* background-color: #303133 !important */
  /* opacity: 0.8 */
  /* border: none !important */
  height: 41px;
  color: #fff !important;
  /* background-color: transparent !important */
  /* border-image-source: url ('../../../static/image/用户框架-02.png')
  border-image-slice: 20%
  border-image-width: auto */
  /* width:  */
}
.myLoginBody >>> .el-form-item__content input {
  background-color: transparent !important;
  border: none !important;
  padding-left: 80px;
  color: #fff !important;
}
.userInput {
  background-image: url ("../../../static/image/用户框架-02.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.passwordInput {
  background-image: url ("../../../static/image/密码框架-02.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
}
.myLoginBody .btnClicks >>> .el-form-item__content {
  text-align: center !important;
  margin-left: 0 !important;
}
.myLoginBody >>> .el-form-item {
  margin-bottom: 38px !important;
}
.myLoginBody >>> .el-form-item__content .el-input {
  width: 407px !important;
}
.myBodyContainerLogin .myLoginBody {
  width: 100%;
  padding: 29px 0px 35px 20px;
  height: 234px;
  width: 294px;
}
.sureBtn {
  margin-left: 0px !important;
  margin-top: 15px;
  width: 258px;
}

.myBodyContainerLogin .myLoginBody >>> .el-form-item__label {
  color: #fff !important;
}

input:-webkit-autofill {
  transition: background-color 99999s ease-in-out 0s;
}
/* input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: rgba (255, 255, 255, 0.85)
} */
.loginRemember {
  text-align: center;
  margin: 0px 0px 15px 0px;
}
.el-form-item__content {
  display: flex;
  align-items: center;
}
.loginArea .registerBtn {
  margin-left: 0;
  color: #fff;
  float: right;
}
.loginArea .registerBtn:hover {
  color: red;
}
.myBodyContainerLogin >>> .el-dialog__header {
  font-size: 16px !important;
}
.myBodyContainerLogin >>> .el-input__inner {
  color: #fff;
  /* color: #000 */
}
.myBodyContainerLogin >>> .el-dialog__footer {
  font-size: 16px !important;
}
/* .myBodyContainerLogin .myRegisters >>> .el-input__inner{
  color: #000
} */
</style>
