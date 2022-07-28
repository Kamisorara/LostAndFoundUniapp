<template>
  <view class="register">
    <view class="avatar" style="display: flex; margin-top: 180rpx">
      <view style="margin: 0 auto"
        ><u-avatar src="src" size="80"></u-avatar
      ></view>
    </view>
    <view class="register-form" style="margin-top: 100rpx">
      <u--form
        labelPosition="left"
        :model="model1"
        :rules="rules"
        ref="registerForm"
      >
        <u-form-item prop="userInfo.userName" borderBottom ref="userName">
          <text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx"
            >用户名</text
          >
          <u--input
            v-model="model1.userInfo.userName"
            border="none"
            placeholder="请输入用户名"
          ></u--input>
        </u-form-item>
        <u-form-item prop="userInfo.email" borderBottom ref="email">
          <text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx"
            >邮箱</text
          >
          <u--input
            v-model="model1.userInfo.email"
            border="none"
            placeholder="请输入邮箱"
          ></u--input>
        </u-form-item>
        <u-form-item prop="userInfo.password1" borderBottom ref="password1">
          <text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx"
            >密码</text
          >
          <u--input
            v-model="model1.userInfo.password1"
            border="none"
            placeholder="请输入密码"
          ></u--input>
        </u-form-item>
        <u-form-item prop="userInfo.password2" borderBottom ref="password2">
          <text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx"
            >再次确认</text
          >
          <u--input
            v-model="model1.userInfo.password2"
            border="none"
            placeholder="请输入的密码一致"
          ></u--input>
        </u-form-item>
        <u-form-item prop="userInfo.code" borderBottom ref="code">
          <text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx"
            >验证码</text
          >
          <u-code-input
            v-model="model1.userInfo.code"
            :space="0"
            mode="line"
          ></u-code-input>
          <view class="wrap">
            <u-toast ref="uToast"></u-toast>
            <u-code
              :seconds="seconds"
              @end="end"
              @start="start"
              ref="uCode"
              @change="codeChange"
            ></u-code>
            <u-button @tap="getCode">{{ tips }}</u-button>
          </view>
        </u-form-item>
      </u--form>
    </view>
    <u-button
      @click="submit()"
      text="注册"
      color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"
    ></u-button>
  </view>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      //验证码部分
      tips: "",
      // refCode: null,
      seconds: 60,
      //表单部分
      model1: {
        userInfo: {
          userName: "",
          email: "",
          password1: "",
          password2: "",
          code: "",
        },
      },
      rules: {
        "userInfo.userName": {
          type: "string",
          min: 2,
          max: 10,
          required: true,
          message: "请输入大于2位小于10位的用户名",
          trigger: ["blur", "change"],
        },
        "userInfo.email": {
          type: "string",
          required: true,
          pattern: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
          // 正则检验前先将值转为字符串
          transform(value) {
            return String(value);
          },
          message: "请输入正确的邮箱",
          trigger: ["blur", "change"],
        },
        "userInfo.password1": {
          type: "string",
          required: true,
          min: 6,
          max: 20,
          message: "请输入大于6位小于20位的密码",
          trigger: ["blur", "change"],
        },
        "userInfo.password2": {
          type: "string",
          required: true,
          asyncValidator: (rule, value, callback) => {
            // 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
            if (
              this.model1.userInfo.password1 != this.model1.userInfo.password2
            ) {
              callback(new Error("请输入两次相同的密码"));
            } else if (this.model1.userInfo.password2 == "") {
              callback(new Error("请再次输入密码"));
            } else {
              // 如果校验通过，也要执行callback()回调
              callback();
            }
          },
          trigger: ["blur", "change"],
        },
      },
      radio: "",
      switchVal: false,
    };
  },
  methods: {
    //验证码部分
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        setTimeout(() => {
          uni.hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        }, 2000);
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
    end() {
      uni.$u.toast("倒计时结束");
    },
    start() {
      uni.$u.toast("倒计时开始");
    },
    //提交表单
    submit() {
      this.$refs.registerForm.validate().then((res) => {
        console.log("校验成功");
      });
    },
  },
  onReady() {
    this.$refs.registerForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
  },
};
</script>

<style lang="scss" scoped>
page {
  background-color: #f4f4f4;
  height: 100%;
}
.wrap {
  padding: 24rpx;
}
</style>
