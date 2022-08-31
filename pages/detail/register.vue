<template>
	<view class="register">
		<view class="avatar" style="display: flex; margin-top: 180rpx">
			<view style="margin: 0 auto"><u-avatar src="src" size="80"></u-avatar></view>
		</view>
		<view class="register-form" style="margin-top: 100rpx">
			<u--form labelPosition="left" :model="model1" ref="registerForm">
				<u-form-item prop="userInfo.userName" borderBottom ref="userName">
					<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">用户名</text>
					<u--input
						@focus="inputFocusStatus.userNameInputFocus = true"
						@blur="inputFocusStatus.userNameInputFocus = false"
						v-model="model1.userInfo.userName"
						border="none"
						placeholder="请输入用户名"
					></u--input>
				</u-form-item>
				<u-form-item prop="userInfo.email" borderBottom ref="email">
					<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">邮箱</text>
					<u--input
						@focus="inputFocusStatus.emailInputFocus = true"
						@blur="inputFocusStatus.emailInputFocus = false"
						v-model="model1.userInfo.email"
						border="none"
						placeholder="请输入邮箱"
					></u--input>
				</u-form-item>
				<u-form-item prop="userInfo.password" borderBottom ref="password">
					<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">密码</text>
					<u--input v-model="model1.userInfo.password" :password="true" border="none" placeholder="请输入密码"></u--input>
				</u-form-item>
				<u-form-item prop="userInfo.password2" borderBottom ref="password2">
					<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">再次确认</text>
					<u--input v-model="model1.userInfo.password2" :password="true" border="none" placeholder="请输入的密码一致"></u--input>
				</u-form-item>
				<u-form-item prop="userInfo.verify" borderBottom ref="verify">
					<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">验证码</text>
					<u-code-input v-model="model1.userInfo.verify" :maxlength="5" :space="0" mode="line"></u-code-input>
					<view class="wrap">
						<u-toast ref="uToast"></u-toast>
						<u-code :seconds="seconds" ref="uCode" @change="codeChange"></u-code>
						<u-button @tap="submitGetEmailVerifyCode">{{ tips }}</u-button>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<u-button @click="submit()" text="注册" color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"></u-button>
		<!-- 验证码弹窗 -->
		<u-modal :show="codeVerifyshow" @confirm="registerAccount()" :title="title">
			<view>
				<view style="display: flex;">
					<view style="margin: auto;" class="code_img" @click="getverifyCode()">
						<u--image :showLoading="true" :src="RegisterCodeVerifyCodeForm.img" mode="widthFix" width="200rpx" height="50px"></u--image>
					</view>
				</view>
				<view style="width: 60%;margin: auto;" class="user_code_input">
					<u--input placeholder="输入验证码" border="surround" v-model="model1.userInfo.verifyCode"></u--input>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
import { register, verifyCode, getLoginverifyCode, judgeEmailOnlyOne, judgeUserNameOnlyOne } from '@/common/api/sys/userCommon.js';
export default {
	name: 'register',
	data() {
		return {
			//是否可以submit
			couldSubmit: {
				sendVerifyCode: false,
				sendRegisterForm: false
			},
			//用户名和邮箱输入框聚焦
			inputFocusStatus: {
				userNameInputFocus: false,
				emailInputFocus: false
			},
			//验证码验证表单
			RegisterCodeVerifyCodeForm: {
				uuid: '',
				img: ''
			},
			//用户输入的验证码
			verifyCode: '',
			//验证码弹窗
			codeVerifyshow: false,
			title: '请输入验证码',
			//验证码部分
			tips: '',
			// refCode: null,
			seconds: 180,
			//表单部分
			model1: {
				userInfo: {
					//验证码uuid
					uuid: '',
					//验证码
					verifyCode: '',
					userName: '',
					email: '',
					password: '',
					password2: '',
					verify: ''
				}
			},
			rules: {
				'userInfo.userName': {
					type: 'string',
					min: 2,
					max: 10,
					required: true,
					asyncValidator: (rule, value, callback) => {
						if (this.model1.userInfo.userName == '') {
							callback(new Error('请输入大于2位小于10位的用户名'));
						} else if (this.inputFocusStatus.userNameInputFocus === false) {
							judgeUserNameOnlyOne(this.model1.userInfo.userName).then(res => {
								console.log(res);
								if (res.data.code === 200) {
									// 如果校验通过，也要执行callback()回调
									callback();
									//再加一重验证
									this.couldSubmit.sendRegisterForm = true;
								} else if (res.data.code === 400) {
									this.couldSubmit.sendRegisterForm = false;
									callback(new Error('已存在该用户名,请更换用户名'));
								}
							});
						}
					},
					trigger: ['blur', 'change']
				},
				'userInfo.email': {
					type: 'string',
					required: true,
					pattern: /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/,
					// 正则检验前先将值转为字符串
					transform(value) {
						return String(value);
					},
					asyncValidator: (rule, value, callback) => {
						if (value == '') {
							callback(new Error('请输入邮箱号'));
						} else if (!/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)) {
							callback(new Error('请按正确的邮箱格式输入邮箱号'));
						} else if (this.inputFocusStatus.emailInputFocus === false) {
							judgeEmailOnlyOne(this.model1.userInfo.email).then(res => {
								console.log(res);
								if (res.data.code === 200) {
									//再加一重验证
									this.couldSubmit.sendVerifyCode = true;
									// 如果校验通过，也要执行callback()回调
									callback();
								} else if (res.data.code === 400) {
									this.couldSubmit.sendVerifyCode = false;
									callback(new Error('已存在该邮箱,请更换邮箱'));
								}
							});
						}
					},
					trigger: ['blur', 'change']
				},
				'userInfo.password': {
					type: 'string',
					required: true,
					min: 6,
					max: 20,
					message: '请输入大于6位小于20位的密码',
					trigger: ['blur', 'change']
				},
				'userInfo.password2': {
					type: 'string',
					required: true,
					asyncValidator: (rule, value, callback) => {
						// 如果验证不通过，需要在callback()抛出new Error('错误提示信息')
						if (this.model1.userInfo.password != this.model1.userInfo.password2) {
							callback(new Error('请输入两次相同的密码'));
						} else if (this.model1.userInfo.password2 == '') {
							callback(new Error('请再次输入密码'));
						} else {
							// 如果校验通过，也要执行callback()回调
							callback();
						}
					},
					trigger: ['blur', 'change']
				}
			},
			radio: '',
			switchVal: false
		};
	},
	methods: {
		//验证码部分
		codeChange(text) {
			this.tips = text;
		},
		//获取验证码的验证码
		getverifyCode() {
			getLoginverifyCode().then(res => {
				console.log(res);
				this.model1.userInfo.uuid = res.data.uuid;
				this.RegisterCodeVerifyCodeForm = res.data;
			});
		},
		//获取邮箱验证码
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				// 模拟向后端请求验证码
				uni.showLoading({
					title: '正在获取验证码'
				});
				verifyCode(this.model1.userInfo.email).then(res => {
					console.log(res);
					if (res.data.code === 200) {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					} else if (res.data.code === 400) {
						uni.showLoading({
							title: '验证码获取失败！'
						});
						setTimeout(() => {
							uni.reLaunch({
								url: 'register'
							});
						}, 1000);
					}
				});
			} else {
				uni.$u.toast('倒计时结束后再发送');
			}
		},
		//注册method
		registerAccount() {
			register(this.model1.userInfo).then(res => {
				console.log(res);
				//注册成功
				if (res.data.code === 200) {
					this.showSuccessToast();
					setTimeout(() => {
						uni.reLaunch({
							url: './login'
						});
					}, 1000);
				} else if (res.data.code === 400) {
					this.showFileToast(res.data.msg);
				}
			});
		},
		//提交表单
		submit() {
			this.$refs.registerForm.validate().then(res => {
				console.log('初步校验完成校验成功');
				//打开验证码的验证框框
				//再加一重验证
				if (this.couldSubmit.sendVerifyCode && this.couldSubmit.sendRegisterForm) {
					this.codeVerifyshow = true;
				}
			});
		},
		//提交验证码申请
		submitGetEmailVerifyCode() {
			this.$refs.registerForm.validateField('userInfo.email', valid => {
				if (valid == '' && this.couldSubmit.sendVerifyCode) {
					this.getCode();
				}
			});
		},
		//注册成功提示
		showSuccessToast() {
			this.$refs.uToast.show({
				title: '注册成功',
				type: 'success',
				message: '注册成功，请前往登录!'
			});
		},
		//登录失败提示
		showFileToast(data) {
			this.$refs.uToast.show({
				title: '注册失败',
				type: 'error',
				message: data
			});
		}
	},
	onReady() {
		this.$refs.registerForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
		//获取验证码base64 img
		this.getverifyCode();
	}
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
