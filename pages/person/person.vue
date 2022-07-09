<template>
	<view class="person" :style="{ backgroundImage: 'url(' + userInfo.photoUrl + ')' }" style="height:1600rpx">
		<!-- 背景图片有bug暂时只能这么解决 -->
		<view class="person-title" style="height: 1rpx;"></view>
		<view class="person-main" style="margin-right: 20rpx;margin-left: 20rpx;background-color: #FFFFFF;height: 400rpx;border-radius: 20rpx;margin-top: 60rpx;">
			<view class="person-main-head" style="height: 200rpx;display: flex;">
				<view @click="toLoginPage()" class="avatar" style="margin-left: 70rpx;margin-top: 40rpx;">
					<u-avatar src="https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/12/e22baa33-df30-46d4-81bf-e6dcb44cb148.png" size="50"></u-avatar>
				</view>
				<view class="name" style="margin-top: 50rpx;margin-left: 30rpx;;width: 450rpx;">
					<text style="font-weight: 600">{{ userInfo.userName }}</text>
					<view class="helped" style="font-size: 30rpx;color: darkgray;">
						<text>已帮助:</text>
						<text style="font-size: 30rpx;color: darkgray;font-weight: 600;margin-left: 10rpx;">{{ userInfo.helpTimes }}</text>
						<text style="margin-left: 10rpx;">人</text>
					</view>
				</view>
				<view class="setting" style="margin-top: 10rpx;"><u-icon name="setting-fill" size="28"></u-icon></view>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserDetailInfo } from '@/common/api/laf/person.js';
export default {
	name: 'person',
	data() {
		return {
			//背景图片
			imageURL: 'https://img2.baidu.com/it/u=2985725512,645211557&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1657213200&t=bf2b60bfd8a9ca7c5f15f09f4be3af91',
			//用户信息
			userInfo: {
				id: '001',
				userName: 'Kamisora',
				helpTimes: 0,
				avatarUrl: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/29/3a22a87c-a150-4165-a453-5d69566a3094.png',
				photoUrl: 'https://img1.baidu.com/it/u=2450882350,2728090557&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=39bc271d8dd1398fdd48487c355f5423'
			}
		};
	},
	methods: {
		toLoginPage() {
			uni.navigateTo({
				url: '../detail/login'
			});
		},
		//根据token获取用户信息
		getUserDetailInfoByToken() {
			getUserDetailInfo().then(res => {
				console.log(res);
				this.userInfo = res.data.data;
			});
		}
	},
	onReady() {
		this.getUserDetailInfoByToken();
	}
};
</script>

<style lang="scss" scoped></style>
