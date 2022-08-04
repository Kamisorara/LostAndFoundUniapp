<template>
	<view class="settingPage">
		<view class="setting_title"><text style="font-size:65rpx;font-weight: 600;">设置</text></view>
		<view class="setting_01">
			<u-cell-group>
				<u-cell @click="toPersonalPage()" icon="account-fill" title="个人中心" url="personalPage" :isLink="true"></u-cell>
				<u-cell @click="toEditBackGroundPage()" icon="photo-fill" title="个性背景" :isLink="true"></u-cell>
				<u-cell icon="setting" title="通用" :isLink="true"></u-cell>
				<u-cell :border="false" icon="github-circle-fill" title="Bug反馈" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		<view class="logout">
			<view @click="AccountLogout()" style="margin: auto;"><text style="font-size:35rpx;font-weight: 600;">退出登录</text></view>
		</view>
	</view>
</template>

<script>
import { removeToken } from '@/utils/token.js';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
import { logout } from '@/common/api/sys/userAccount.js';

export default {
	name: 'sittingPage',
	data() {
		return {
			userInfo: {
				id: ''
			}
		};
	},
	methods: {
		//退出
		AccountLogout() {
			logout().then(res => {
				console.log(res);
				if (res.data.code === 200) {
					removeToken('token');
					uni.reLaunch({
						url: '../../index/index'
					});
				}
			});
		},
		//前往个人中心界面
		toPersonalPage() {
			uni.navigateTo({
				url: 'personalPage' + '?id=' + this.userInfo.id
			});
		},
		//前往个性背景界面
		toEditBackGroundPage() {
			uni.navigateTo({
				url: 'personalData/edit/editBackground'
			});
		},
		//从token中获取id
		getUserFromToken() {
			virifyLoginStatus().then(res => {
				console.log(res);
				this.userInfo = res.data.data;
			});
		}
	},
	onReady() {
		this.getUserFromToken();
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
	height: 100%;
}
.setting_title {
	margin: 20rpx 0 0 40rpx;
}
.setting_01 {
	border-radius: 20rpx;
	margin: 20rpx 20rpx 0 20rpx;
	height: 340rpx;
	background-color: #ffffff;
}
.logout {
	background-color: #ffffff;
	height: 80rpx;
	margin: 20rpx 20rpx 0 20rpx;
	border-radius: 30rpx;
	display: flex;
}
</style>
