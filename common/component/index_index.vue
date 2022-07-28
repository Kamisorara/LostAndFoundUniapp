<template>
	<view class="index_index">
		<!-- 通告 -->
		<u-notice-bar :text="text1"></u-notice-bar>
		<!-- 公告板 -->
		<view class="main" style="height: 300rpx;background-color: #fffdde;margin-top: 40rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;">
			<view class="board_head" style="text-align: center"><text style="font-size: 35rpx;font-weight: 800;color:black">今日公告</text></view>
			<u-divider text="分割线" :dot="true"></u-divider>
			<view v-for="(item, index) in boardList" :key="index" class="board-position">
				<text class="non-urgency">● {{ item.message }}</text>
			</view>
		</view>
		<!-- 排行榜和今日多帮助他人 -->
		<view class="rank-best" style="display: flex;">
			<view class="rank" style="height: 300rpx;width:345rpx;background-color: #dfd5de;margin-top: 50rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;">
				<view class="rank-title" style="text-align: center;margin-top: 20rpx;font-weight: 600;"><text>排行榜</text></view>
				<view
					class="rank-main"
					v-for="(item, index) in rankList"
					:key="index"
					:class="{ no1: index === 0, no2: index === 1, no3: index === 2 }"
					style="display: flex;margin-top: 20rpx;margin-left: 10rpx;"
				>
					<text style="font-weight: 600;font-size: 40rpx;">{{ index + 1 }}.</text>
					<u-avatar :src="item.avatarUrl" size="30"></u-avatar>
					<text style="margin-left: 30rpx;margin-top: 5rpx;">{{ item.userName }}</text>
				</view>
			</view>
			<view class="best" style="height: 300rpx;width:345rpx;background-color: #9be9e9;margin-top: 50rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;">
				<view class="best-title" style="text-align: center;margin-top: 20rpx;font-weight: 600;"><text>今日最佳</text></view>
				<view class="best-main" style="margin-left: 130rpx;margin-top: 30rpx;"><u-avatar :src="todayBest.avatar" size="40"></u-avatar></view>
				<view class="best-main-name" style="margin-top: 30rpx;text-align: center;">
					<text style="font-size: 40rpx;color: coral;">{{ todayBest.userName }}</text>
				</view>
			</view>
		</view>
		<!-- 紧急寻物启事 -->
		<view class="urgency-lost-titile" style="margin-left: 35rpx;margin-top: 100rpx;font-weight: 700;font-size: 45rpx;color: #ff0000;"><text>我真的很急o (≧口≦)o</text></view>
		<view
			class="urgency-lost"
			style="height: 450rpx;backdrop-filter: blur(40px);
  color: #fff;
  box-shadow: 0 0 30px 10px rgba(130, 130, 130, 0.3);margin-top: 30rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;"
		>
			<view class="post-title" style="height: 50rpx;">
				<view style="display: flex;margin-left: 530rpx;">
					<text style="font-size: 30rpx;color: #939393;">查看全部</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view
						v-for="(item, index) in urgencyLostList"
						:key="index"
						style="height: 180rpx;background-color: #e4e6ca;width: 340rpx;margin-left: 12rpx;margin-top: 20rpx;"
					>
						<view @click="toNoticeDetailPage(item.id)" style="margin: 5rpx;">
							<u--image :showLoading="true" :src="item.lafPhotoUrl" width="330rpx" height="170rpx"></u--image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 非紧急寻物启事 -->
		<view class="non-urgency-lost-titile" style="margin-left: 35rpx;margin-top: 70rpx;font-weight: 700;font-size: 45rpx;color: #939393;"><text>我丢了东西T_T</text></view>
		<view
			class="non-urgency-lost"
			style="height: 450rpx;backdrop-filter: blur(40px);
  color: #fff;
  box-shadow: 0 0 30px 10px rgba(130, 130, 130, 0.3);margin-top: 30rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;"
		>
			<view class="post-title" style="height: 50rpx;">
				<view style="display: flex;margin-left: 540rpx;">
					<text style="font-size: 30rpx;color: #939393;">查看全部</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(item, index) in lostList" :key="index" style="height: 180rpx;background-color: #e4e6ca;width: 340rpx;margin-left: 12rpx;margin-top: 20rpx;">
						<view @click="toNoticeDetailPage(item.id)" style="margin: 5rpx;">
							<u--image :showLoading="true" :src="item.lafPhotoUrl" width="330rpx" height="170rpx"></u--image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 拾物启事 -->
		<view class="non-urgency-lost-titile" style="margin-left: 35rpx;margin-top: 70rpx;font-weight: 700;font-size: 45rpx;color: #939393;">
			<text>我捡到东西啦(๑•̀ㅂ•́)و✧</text>
		</view>

		<view
			class="non-urgency-lost"
			style="height: 450rpx;backdrop-filter: blur(40px);
  color: #fff;
  box-shadow: 0 0 30px 10px rgba(130, 130, 130, 0.3);margin-top: 30rpx;margin-left: 20rpx;margin-right: 20rpx;border-radius: 20rpx;"
		>
			<view class="post-title" style="height: 50rpx;">
				<view style="display: flex;margin-left: 540rpx;">
					<text style="font-size: 30rpx;color: #939393;">查看全部</text>
					<u-icon name="arrow-right"></u-icon>
				</view>
				<view style="display: flex;flex-wrap: wrap;">
					<view v-for="(item, index) in foundList" :key="index" style="height: 180rpx;background-color: #e4e6ca;width: 340rpx;margin-left: 12rpx;margin-top: 20rpx;">
						<view @click="toNoticeDetailPage(item.id)" style="margin: 5rpx;">
							<u--image :showLoading="true" :src="item.lafPhotoUrl" width="330rpx" height="170rpx"></u--image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
import { setToken, removeToken } from '@/utils/token.js';
import { getBoardList, getTop3UserList, getSimpleLostInfo, getSimpleFoundList, getSimpleUrgencyLostList } from '@/common/api/laf/index.js';
export default {
	name: 'index_index',
	props: {
		userIsLogin: false
	},
	data() {
		return {
			//顶部公告
			text1: '本网站仅作测试使用,如有bug请发送邮件至kamisola2020@163.com',
			//boardList公告列表
			boardList: [
				{
					message: '本网站仅作测试',
					boardUrl: 'http://www.kamisora.xyz',
					urgency: 0
				}
			],
			//排行列表
			rankList: [
				{
					userName: 'Kamisora',
					avatarUrl: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/12/e22baa33-df30-46d4-81bf-e6dcb44cb148.png'
				}
			],
			//今日最佳
			todayBest: {
				userName: 'Kamisora',
				avatar: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/12/e22baa33-df30-46d4-81bf-e6dcb44cb148.png'
			},
			//紧急寻物列表
			urgencyLostList: [
				{
					id: '1',
					userId: '1',
					lafPhotoUrl: 'https://img1.baidu.com/it/u=2476734823,214005944&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656694800&t=e2ffb2460abb3981af1b947b22c5b29c'
				}
			],
			//寻物列表
			lostList: [
				{
					id: '1',
					userId: '1',
					lafPhotoUrl: 'https://img1.baidu.com/it/u=2476734823,214005944&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656694800&t=e2ffb2460abb3981af1b947b22c5b29c'
				}
			],
			//拾物列表
			foundList: [
				{
					id: '1',
					userId: '1',
					lafPhotoUrl: 'https://img1.baidu.com/it/u=2476734823,214005944&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656694800&t=e2ffb2460abb3981af1b947b22c5b29c'
				}
			]
		};
	},
	methods: {
		//前往启示详情界面
		toNoticeDetailPage(noticeId) {
			if (this.userIsLogin === true) {
				uni.navigateTo({
					url: '/pages/detail/noticeDetail/noticeDetail' + '?id=' + noticeId
				});
			}
		},
		//获取公告板
		getBoardLists() {
			getBoardList().then(res => {
				console.log(res);
				this.boardList = res.data.data;
			});
		},
		//获取排行榜
		getTop3UserLists() {
			getTop3UserList().then(res => {
				console.log(res);
				this.rankList = res.data.data;
			});
		},
		//获取紧急寻物启事列表
		getSimpleUrgencyLostLists() {
			getSimpleUrgencyLostList().then(res => {
				console.log(res);
				this.urgencyLostList = res.data.data;
			});
		},
		//获取寻物启事列表
		getSimpleLostList() {
			getSimpleLostInfo().then(res => {
				console.log(res);
				this.lostList = res.data.data;
			});
		},
		//获取拾物启示列表
		getSimpleFoundLists() {
			getSimpleFoundList().then(res => {
				console.log(res);
				this.foundList = res.data.data;
			});
		}
	},
	mounted() {
		this.getSimpleFoundLists();
		this.getSimpleLostList();
		this.getSimpleUrgencyLostLists();
		this.getBoardLists();
		this.getTop3UserLists();
	}
};
</script>

<style lang="scss" scoped>
// 紧急和非紧急动态渲染
.urgency {
	font-size: 30rpx;
	font-weight: 700;
	color: red;
}
.non-urgency {
	font-size: 30rpx;
	color: darkgray;
}
// ------

//renk css
.no1 {
	color: #fbff02;
}
.no2 {
	color: #0aff1a;
}
.no3 {
	color: #ff4aed;
}
</style>
