<template>
	<view class="loginPage">
		<view class="login-head" style="height: 400rpx;display: flex;">
			<view style="margin: 0 auto;margin-top: 160rpx;"><u-avatar size="80" :src="avatarUrl"></u-avatar></view>
		</view>
		<!-- 输入框部分 -->
		<view class="input" style="display: flex;flex-wrap: wrap;margin-top: 100rpx;">
			<view style="margin: auto;">
				<u--form labelPosition="left" :model="model1" :rules="rules" ref="loginForm">
					<u-form-item prop="userInfo.username" borderBottom ref="userName">
						<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">用户名</text>
						<u--input @blur="getLoginUserAvatar()" v-model="model1.userInfo.username" border="none" placeholder="请输入用户名"></u--input>
					</u-form-item>
					<u-form-item prop="userInfo.password" borderBottom ref="password">
						<text style="font-weight: 600; font-size: 35rpx; margin-right: 40rpx">密码</text>
						<u--input v-model="model1.userInfo.password" :password="true" border="none" placeholder="请输入密码"></u--input>
					</u-form-item>
				</u--form>
			</view>
		</view>
		<view style="display: flex;">
			<view style="width: 50%;"></view>
			<view @click="toRegister()" class="no-register" style="margin: 30rpx 0 0 30rpx;">
				<text style="font-size: 20rpx;text-decoration: underline;color:gray;">没有注册?立即注册</text>
			</view>
		</view>

		<!-- 登录按钮 -->
		<view class="login-main" style="display: flex;">
			<view class="login" style="margin: 70rpx auto 0 auto;width: 150px;">
				<u-button v-if="!isClick" @click="submitLogin()" text="登录" color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"></u-button>
				<u-button v-if="isClick" loading loadingText="加载中" color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"></u-button>
			</view>
		</view>
		<view class="rememberMe">
			<u-radio-group :disabled="true" v-model="rememberMe"><u-radio shape="circle" label="记住我"></u-radio></u-radio-group>
		</view>

		<!-- 验证码弹窗 -->
		<u-modal :show="codeVerifyshow" @confirm="loginMethod()" :title="title">
			<view>
				<view style="display: flex;">
					<view style="margin: auto;" class="code_img" @click="getLoginverifyCodeImg()">
						<u--image :showLoading="true" :src="LoginCodeVerifyCodeForm.img" mode="widthFix" width="200rpx" height="50px"></u--image>
					</view>
				</view>
				<view style="width: 60%;margin: auto;" class="user_code_input">
					<u--input placeholder="输入验证码" border="surround" v-model="model1.userInfo.verifyCode"></u--input>
				</view>
			</view>
		</u-modal>
		<!-- toast弹窗 -->
		<view><u-toast ref="uToast"></u-toast></view>
	</view>
</template>

<script>
import { login, getLoginverifyCode, getLoginUserAvatarByUserName } from '@/common/api/sys/userCommon.js';
import { setToken, removeToken } from '@/utils/token.js';
export default {
	name: 'login',
	data() {
		return {
			//用户头像
			avatarUrl: '',
			//是否可以submit
			couldSubmit: {
				sendLoginPost: false
			},
			//用户名输入框聚焦
			inputFocusStatus: {
				userNameInputFocus: false
			},
			//验证码验证表单
			LoginCodeVerifyCodeForm: {
				img: 'https://img1.baidu.com/it/u=358105290,730157327&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=7849921314e7abf94a336061c0f659c8'
			},
			//验证码弹窗
			codeVerifyshow: false,
			title: '请输入验证码',
			//是否按下按钮
			isClick: false,
			//记住我
			rememberMe: true,
			//用户登录信息
			userInfo: {
				username: '',
				password: '',
				uuid: '',
				verifyCode: ''
			},
			show: false,
			//表单部分
			model1: {
				userInfo: {
					username: '',
					password: '',
					uuid: '',
					verifyCode: ''
				}
			},
			rules: {
				'userInfo.userName': {
					type: 'string',
					min: 2,
					max: 10,
					required: true,
					message: '请输入正确的用户名',
					trigger: ['blur', 'change']
				},
				'userInfo.password': {
					type: 'string',
					required: true,
					min: 6,
					max: 20,
					message: '请输入大于6位小于20位的密码',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		//提交登录请求
		submitLogin() {
			this.$refs.loginForm.validate().then(res => {
				this.codeVerifyshow = true;
			});
		},
		//登录api调用
		loginMethod() {
			this.codeVerifyshow = false;
			removeToken('token');
			login(this.model1.userInfo)
				.then(res => {
					console.log(res);
					this.isClick = true;
					if (res.data.code === 200) {
						//存储token
						setToken('token', res.data.data.token);
						this.showSuccessToast();
						//登录成功后跳转
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1500);
					} else if (res.data.code === 401) {
						this.showFileToast(res.data.msg);
						this.isClick = false;
					} else if (res.data.code === 400) {
						this.showFileToast(res.data.msg);
						this.isClick = false;
					}
				})
				.catch(err => {
					Error(err);
					this.showFileToast('发生未知错误,登录失败!');
				});
		},
		//未注册前往注册界面
		toRegister() {
			uni.navigateTo({
				url: 'register'
			});
		},
		//登录成功提示
		showSuccessToast() {
			this.$refs.uToast.show({
				title: '登录成功',
				type: 'success',
				message: '登录成功，即将跳转!'
			});
		},
		//登录失败提示
		showFileToast(data) {
			this.$refs.uToast.show({
				title: '登录失败',
				type: 'error',
				message: data
			});
		},
		//获取登录验证码
		getLoginverifyCodeImg() {
			getLoginverifyCode().then(res => {
				console.log(res);
				this.LoginCodeVerifyCodeForm = res.data;
				this.model1.userInfo.uuid = res.data.uuid;
			});
		},
		//根据用户名获取用户头像
		getLoginUserAvatar() {
			getLoginUserAvatarByUserName(this.model1.userInfo.username).then(res => {
				console.log(res);
				this.avatarUrl = res.data.data;
			});
		}
	},
	onReady() {
		this.$refs.loginForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
		this.getLoginverifyCodeImg();
	}
};
</script>

<style lang="scss" scoped></style>
