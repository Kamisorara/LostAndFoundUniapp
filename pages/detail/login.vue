<template>
	<view class="loginPage">
		<view class="login-head" style="height: 400rpx;display: flex;">
			<view style="margin: 0 auto;margin-top: 160rpx;">
				<image
					style="width: 100px;height: 100px;"
					src="https://img1.baidu.com/it/u=3347816102,2373294506&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657299600&t=dff9ee1fa5dc0c6a34bac05620e0faa0"
				></image>
			</view>
		</view>
		<!-- 输入框部分 -->
		<view class="input" style="display: flex;flex-wrap: wrap;margin-top: 100rpx;">
			<view>
				<view class="username" style="width: 240px;margin-left: 130rpx;margin-top: 100rpx;display: flex;">
					<text style="margin-top: 10rpx;color:darkgrey;">账号</text>
					<u--input placeholder="请输入账号" border="bottom" clearable v-model="userInfo.username"></u--input>
				</view>
			</view>
			<view>
				<view class="password" style="width: 240px;margin-left: 130rpx;margin-top: 30rpx;display: flex;">
					<text style="margin-top: 10rpx;color:darkgrey;">密码</text>
					<u--input placeholder="请输入密码" border="bottom" clearable type="password" v-model="userInfo.password"></u--input>
				</view>
			</view>
		</view>

		<!-- 登录和记住我部分 -->
		<view class="login-main" style="display: flex;">
			<view class="rememberMe" style="margin-top: 100rpx;">
				<u-radio-group :disabled="true" v-model="rememberMe"><u-radio shape="circle" label="记住我"></u-radio></u-radio-group>
			</view>
			<view class="login" style="margin-top: 80rpx;width: 100px;margin-left: 100rpx;">
				<u-button v-show="!isClick" @click="loginMethod()" text="登录" color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"></u-button>
				<u-button v-show="isClick" loading loadingText="加载中" color="linear-gradient(to right, rgb(170, 255, 255), rgb(213, 132, 207))"></u-button>
			</view>
		</view>
		<!-- toast弹窗 -->
		<view><u-toast ref="uToast"></u-toast></view>
	</view>
</template>

<script>
import { login } from '@/common/api/sys/userCommon.js';
import { setToken, removeToken } from '@/utils/token.js';
export default {
	name: 'login',
	data() {
		return {
			//是否按下按钮
			isClick: false,
			//记住我
			rememberMe: true,
			//用户登录信息
			userInfo: {
				username: '',
				password: ''
			},
			show: false
		};
	},
	methods: {
		//登录api调用
		loginMethod() {
			removeToken('token');
			login(this.userInfo)
				.then(res => {
					console.log(res);
					this.isClick = true;
					//存储token
					setToken('token', res.data.data.token);
					this.showSuccessToast();
					if (res.data.code === 200) {
						//登录成功后跳转
						setTimeout(() => {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1500);
					} else if (res.data.code === 401) {
						this.showFileToast();
					}
				})
				.catch(err => {
					this.showFileToast();
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
		showFileToast() {
			this.$refs.uToast.show({
				title: '登录失败',
				type: 'error',
				message: '账号或密码输入错误，请重试!'
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
