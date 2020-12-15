<template>
  <div class="login-container">
    <!--navbar-->
    <van-nav-bar
      class="app-nav-bar"
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!--form表单-->
    <van-form
      ref='login-form'
      :show-error='false'
      :show-error-message='false'
      validate-first
      @submit="onLogin"
      @failed='onFailed'>
      <van-field
        v-model="user.mobile"
        class="iconfont"
        icon-prefix='icon'
        left-icon="phone"
        name='mobile'
        placeholder="请输入手机号"
        :rules='formRules.mobile'
      />
      <van-field
        v-model="user.code"
        clearable
        class="iconfont"
        icon-prefix='icon'
        left-icon="suo"
        name='code'
        placeholder="请输入验证码"
        :rules='formRules.code'
      >
        <template #button>
          <van-count-down
          :time="1000*5"
          v-if='isCountDownShow'
          format="ss s"
          @finish='isCountDownShow = false'/>
          <van-button size="mini" round class='send-btn' @click.prevent='sendSms' v-else>发送验证码</van-button>
        </template>
      </van-field>
      <!--登录按钮-->
      <div class='login-btn-wrap'>
        <van-button class='login-btn' type="info" block>登录</van-button>
      </div>
    </van-form>

  </div>
</template>

<script>
import { login } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user:{
        mobile:'17090086870',
        code:'246810'
      },
      formRules: {
        mobile: [
          { required: true, message:'请输入手机号'},
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误'}
        ],
        code: [
          { required: true, message: '请输入验证码'},
          { pattern: /\d{6}/, message: '验证码格式错误'}
        ]
      },
      isCountDownShow: false
    }
  },
 computed: {},
 watch: {},
 created () {},
 mounted () {},
 methods: {
   onFailed (error) {
      console.log('失败信息',error)
      if(error.errors[0]){
        this.$toast({
          message: error.errors[0].message,
          position: 'top' // 防止手机键盘太高看不见
        })
      }
   },
   async sendSms () {
     try{
       await this.$refs['login-form'].validate('mobile')
       this.isCountDownShow = true // 显示倒计时
       // 验证通过，请求发送验证码
       //const res = await sendSms(this.user.mobile)
        // 短信发出去了，隐藏发送按钮，显示倒计时
     }catch(err){
       console.log('发送错误信息', err)
       // try 里面任何代码的错误都会进入 catch
       // 不同的错误需要不同的提示，那就需要判断了
       let message = ''
       if(err && err.response && err.response.status === 429) {
         message = '发送太频繁了，请稍后重试'
       }else if (err.name === 'mobile') {
         // 表单验证失败的错误提示
         message = err.message
       }else {
          // 未知错误
          message = '发送失败，请稍后重试'
       }
       this.$toast({
         message,
         position: 'top'
       })
     }
   },
   async onLogin(){
     Toast.loading({
       message: '登录中...',
       forbidClick: true,
       duration: 0
     });
     try{
      const { data:res } = await login(this.user)
      if(res.message === 'OK') {
        Toast.success('登录成功');
        //路径从哪里来就跳回那里
        this.$router.back() // 暂时用这种方式 但是有缺点
      }
      // 登录成功后，将后端返送回来的数据存储到 vuex 容器中
      this.$store.commit('setUser',res.data)

     }catch(e){
       console.log('失败信息',e)
       Toast.fail('登录失败，手机号或验证码错误');
     }
   }
 }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    /deep/.van-field__left-icon {
      font-size:18px;
      color:#666;
    }
  }
  .send-btn {
    width:76px;
    height:23px;
    background:#ededed;
    .van-button__text {
      font-size:11px;
      color:#666;
    }

  }
  .login-btn-wrap {
    padding:26px 16px;
    .login-btn {
      background:#6db4fb;
      border:none;
      font-size:14px;
    }
  }
}
</style>
