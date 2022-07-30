<template>
	<view class="person" :style="{ backgroundImage: 'url(' + userInfo.photoUrl + ')' }" style="height:100vh">
		<!-- 背景图片有bug暂时只能这么解决 -->
		<view class="person-title" style="height: 1rpx;"></view>
		<!-- 已登录显示 -->
		<view
			v-if="loginStatus.isLogin == true"
			class="person-main"
			style="margin-right: 20rpx;margin-left: 20rpx;height: 400rpx;border-radius: 20rpx;margin-top: 60rpx;backdrop-filter: blur(40px);
  color: #fff;
  box-shadow: 0 0 30px 10px rgba(130, 130, 130, 0.3);"
		>
			<view class="person-main-head" style="height: 200rpx;display: flex;">
				<view @click="toPersonalPage()" class="avatar" style="margin-left: 70rpx;margin-top: 40rpx;"><u-avatar :src="userInfo.avatarUrl" size="50"></u-avatar></view>
				<view class="name" style="margin-top: 50rpx;margin-left: 30rpx;;width: 450rpx;">
					<text @click="toPersonalPage()" style="font-weight: 600">{{ userInfo.userName }}</text>
					<view class="helped" style="font-size: 30rpx;color: #858585;">
						<text>已帮助:</text>
						<text style="font-size: 30rpx;color: darkgray;font-weight: 600;margin-left: 10rpx;">{{ userInfo.helpTimes }}</text>
						<text style="margin-left: 10rpx;">人</text>
					</view>
				</view>
				<view @click="toSettingPage()" class="setting" style="margin-top: 10rpx;"><u-icon name="setting-fill" size="28"></u-icon></view>
			</view>
			<!-- 宫格布局 -->
			<view style="margin-top: 60rpx;">
				<u-grid :border="false" @click="click">
					<u-grid-item v-for="(baseListItem, baseListIndex) in baseList" :key="baseListIndex">
						<view style="display: flex;">
							<view style="margin-left: 50rpx" v-if="badgeList[baseListIndex] != 0">
								<u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon>
							</view>
							<view v-if="badgeList[baseListIndex] === 0"><u-icon :customStyle="{ paddingTop: 20 + 'rpx' }" :name="baseListItem.name" :size="22"></u-icon></view>
							<view class="box"><u-badge max="99" shape="horn" :type="badgeTypeList[baseListIndex].type" :value="badgeList[baseListIndex]"></u-badge></view>
						</view>
						<text class="grid-text">{{ baseListItem.title }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 未登录显示 -->
		<view
			v-if="loginStatus.isLogin === false"
			class="person-main"
			style="margin-right: 20rpx;margin-left: 20rpx;height: 400rpx;border-radius: 20rpx;margin-top: 60rpx;background-color: #FFFFFF;
		color: #fff;"
		>
			<view @click="toLoginPage()" class="person-main-head" style="height: 200rpx;display: flex;">
				<view class="avatar" style="margin-left: 70rpx;margin-top: 40rpx;"><u-avatar :src="userInfo.avatarUrl" size="70"></u-avatar></view>
				<view style="margin-top: 75rpx;margin-left: 40rpx;"><u--text  type="info" size="20" text="用户未登录,点击登录"></u--text></view>
			</view>
			<view @click="toRegisterPage()" style="margin-top: 140rpx;margin-left: 470rpx;"><u--text decoration="underline" type="info" size="10" text="没有账号?点击注册"></u--text></view>
		</view>
	</view>
</template>

<script>
import { getUserDetailInfo, getUserNoticeBadgeValue } from '@/common/api/laf/person.js';
import { setToken, removeToken } from '@/utils/token.js';
export default {
	name: 'person',
	data() {
		return {
			//登录状态
			loginStatus: {
				isLogin: false,
				userId: 0
			},
			//背景图片
			imageURL: 'https://img2.baidu.com/it/u=2985725512,645211557&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657213200&t=bf2b60bfd8a9ca7c5f15f09f4be3af91',
			//用户信息
			userInfo: {
				id: '001',
				userName: 'Kamisora',
				helpTimes: 0,
				avatarUrl: '',
				photoUrl: 'https://img0.baidu.com/it/u=3453439557,3514241062&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=729'
			},
			//宫格布局列表
			baseList: [
				{
					name: 'tags-fill',
					title: '我发布的'
				},
				{
					name: 'clock-fill',
					title: '待处理'
				},
				{
					name: 'checkmark-circle-fill',
					title: '我帮助的'
				}
			],
			//宫格徽标类型列表
			badgeTypeList: [
				{
					type: 'primary'
				},
				{
					type: 'warning'
				},
				{
					type: 'success'
				}
			],
			//宫格徽标
			badgeList: [],
			//跳转页面名称
			pageNameList: [
				{
					name: 'myReleased'
				},
				{
					name: 'myWaiting'
				},
				{
					name: 'myHelped'
				}
			]
		};
	},
	methods: {
		//前往个人中心
		toPersonalPage() {
			uni.navigateTo({
				url: '../detail/personDetail/personalPage'
			});
		},
		//前往设置界面
		toSettingPage() {
			uni.navigateTo({
				url: '../detail/personDetail/settingPage'
			});
		},
		//前往宫格界面界面
		toMyPage(pageName) {
			uni.navigateTo({
				url: '../detail/personDetail/' + pageName
			});
		},
		//前往登录界面
		toLoginPage() {
			uni.navigateTo({
				url: '../detail/login'
			});
		},
		//前往注册界面
		toRegisterPage() {
			uni.navigateTo({
				url: '../detail/register'
			});
		},
		//获取用户启示相关徽标值
		UserNoticeBadgeValue() {
			getUserNoticeBadgeValue().then(res => {
				console.log(res);
				this.badgeList = res.data.data;
			});
		},
		//根据token获取用户信息
		getUserDetailInfoByToken() {
			getUserDetailInfo().then(res => {
				console.log(res);
				if (res.data.code === 200) {
					this.loginStatus.isLogin = true;
					this.userInfo = res.data.data;
					this.UserNoticeBadgeValue();
				} else if (res.data.code === 401) {
					removeToken('token');
					this.loginStatus.isLogin = false;
				}
			});
		},
		//测试点击事件
		click(name) {
			this.toMyPage(this.pageNameList[name].name);
		}
	},
	onReady() {
		this.getUserDetailInfoByToken();
	},
	onShow() {
		this.getUserDetailInfoByToken();
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
	height: 100%;
}
//宫格布局
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
</style>
