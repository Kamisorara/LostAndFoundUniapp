<template>
	<view class="index">
		<view class="search" style="display: flex;height: 100rpx;background-color: #FFFFFF;">
			<view @click="toPersonalPage()" class="avatar" style="margin-top: 15rpx;margin-left: 15rpx;"><u-avatar :src="userBasicInfo.avatarUrl" size="40"></u-avatar></view>
			<view @click="toSearchPage()" class="serach" style="width: 500rpx;margin-left: 30rpx;margin-top: 20rpx;">
				<u-search placeholder="搜索你要的" v-model="keyword" :show-action="false"></u-search>
			</view>
			<view class="addNew" style="margin-top: 16rpx;margin-left: 20rpx;"><u-button @click="show = true" shape="circle" icon="plus-circle"></u-button></view>
		</view>
		<!-- 弹出层 -->
		<u-popup :show="show" mode="top" :round="15" @close="close" @open="open">
			<view style="height: 200rpx;display: flex;">
				<view style="margin-top: 65rpx;margin-left:50rpx;">
					<u-button @click="toCreateLostPage()" type="error" :plain="true" shape="circle" text="T_T我丢东西了"></u-button>
				</view>
				<view style="margin-top: 65rpx;margin-left: 80rpx;">
					<u-button @click="toCreateFoundPage()" type="primary" :plain="true" shape="circle" text="(=~ω~=)我捡到东西啦"></u-button>
				</view>
			</view>
		</u-popup>
		<u-sticky>
			<view class="tab" style="background-color: #FFFFFF;border-bottom-left-radius: 20rpx;border-bottom-right-radius: 20rpx;">
				<u-tabs :list="list1" @click="changeCurrentChoise" :scrollable="false"></u-tabs>
			</view>
		</u-sticky>
		<!-- 组件部分 -->
		<index_index :userIsLogin="userIsLogin" v-if="currentChoise === 0"></index_index>
		<view v-if="currentChoise === 1" class="index_recent">
			<!-- 用户发布 -->
			<view v-for="(item, MesssageIndex) in noticeList" :key="MesssageIndex" class="post-message">
				<view class="tabs" style="margin-left: 20rpx;width: 110rpx;">
					<u-tag text="紧急" plain type="error" size="mini" icon="https://img1.baidu.com/it/u=345396241,529780618&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></u-tag>
				</view>
				<view class="post-message-title" style="display: flex;background-color:#FFFFFF;height: 90rpx;">
					<view class="title-avatar" style="margin-left:30rpx;margin-top: 10rpx;"><u-avatar :src="item.avatarUrl" size="40"></u-avatar></view>
					<view class="post-message-userName" style="font-size: 40rpx;margin-top: 20rpx;margin-left: 40rpx;width: 400rpx;">
						<text>{{ item.userName }}</text>
					</view>
					<view class="views" style="margin-top: 20rpx;">
						<text style="font-size:30rpx;color: darkgray;">浏览:</text>
						<text style="margin-left: 10rpx;font-size:35rpx;color: darkgray;font-weight: 600;">0</text>
					</view>
				</view>
				<view @click="toNoticeDetailPage(item.id)">
					<view class="post-message-message" style="height: 100rpx;background-color:#FFFFFF;margin-left: 140rpx;margin-right: 30rpx;display: inline-block;">
						<text>在{{ item.message }}</text>
					</view>
					<view
						class="post-message-img"
						style="height: 360rpx;background-color:#FFFFFF;margin-top: 20rpx;margin-left: 30rpx;margin-right: 30rpx;display: flex;flex-wrap: wrap;"
					>
						<view v-for="(photo, photoIndex) in item.lafPhotoUrls" :key="photoIndex" class="post-img" style="margin-left: 65rpx;margin-top: 20rpx;">
							<u--image radius="10rpx" :showLoading="true" :src="photo" width="120px" height="80px"></u--image>
						</view>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		</view>
		<!-- 分割线 -->
		<u-divider text="分割线" :dot="true"></u-divider>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
import index_index from '@/common/component/index_index.vue';
import index_recent from '@/common/component/index_recent.vue';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
import { setToken, removeToken } from '@/utils/token.js';
import { getBoardList, getRecentNotice } from '@/common/api/laf/index.js';
export default {
	data() {
		return {
			//用户是否登录
			userIsLogin: false,
			//返回顶部
			scrollTop: 0,
			//当前选择（主页或最近，0主页，1最近）
			currentChoise: 0,
			//弹出层
			show: false,
			//搜索关键词
			keyword: '',
			//顶部标签list
			list1: [
				{
					name: '主页'
				},
				{
					name: '最近'
				}
			],
			//登录用户基本信息
			userBasicInfo: {
				id: '000',
				userName: '',
				avatarUrl: ''
			},
			//page
			pageSize: 3, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			status: 'loading',
			//加载更多状态
			loadMore: {
				loadingText: '正在拼命加载中...',
				loadmoreText: '上滑加载...',
				nomoreText: '---------鄙人不才，实在没有了T_T---------'
			},
			//启示列表
			noticeList: [
				{
					id: '',
					userId: '',
					userName: '',
					type: '',
					message: '',
					avatarUrl: '',
					lafPhotoUrls: []
				}
			]
		};
	},
	methods: {
		//前往搜索界面
		toSearchPage() {
			uni.navigateTo({
				url: '../detail/searchPage'
			});
		},
		//前往个人界面
		toPersonalPage() {
			if (this.userIsLogin === true) {
				uni.navigateTo({
					url: '../detail/personDetail/personalPage'
				});
			}
		},
		//前往启示详情界面
		toNoticeDetailPage(noticeId) {
			if (this.userIsLogin === true) {
				uni.navigateTo({
					url: '../detail/noticeDetail/noticeDetail' + '?id=' + noticeId
				});
			}
		},
		//切换首页和最近
		changeCurrentChoise(item) {
			this.currentChoise = item.index;
		},
		//弹出层open事件
		open() {},
		//弹出层close事件
		close() {
			this.show = false;
		},
		//验证是否登录
		virifyLogin() {
			virifyLoginStatus()
				.then(res => {
					console.log(res);
					if (res.data.code === 200) {
						this.userBasicInfo = res.data.data;
						this.userIsLogin = true;
					} else if (res.data.code === 401) {
						removeToken('token');
						this.userIsLogin = false;
					}
				})
				.catch(err => {
					removeToken('token');
				});
		},
		// （懒加载）列表
		async getRecentNoticeLists() {
			await getRecentNotice(this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.noticeList = res.data.data.records;
				} else {
					this.noticeList = [...this.noticeList, ...res.data.data.records];
				}
				this.pageNum++;
			});
		},
		//前往创建界面
		toCreateLostPage() {
			if (this.userIsLogin === true) {
				uni.navigateTo({
					url: '../detail/createNotice/createLostPage'
				});
			}
		},
		toCreateFoundPage() {
			if (this.userIsLogin === true) {
				uni.navigateTo({
					url: '../detail/createNotice/createFoundPage'
				});
			}
		},
		//前往登录界面
		toLoginPage() {
			uni.navigateTo({
				url: '../detail/login'
			});
		}
	},
	//组件
	components: {
		index_index,
		index_recent
	},
	//返回顶部
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	// 加载更多
	onReachBottom() {
		if (this.currentChoise === 1) {
			if (this.status == 'nomore') {
				return;
			}
			setTimeout(() => {
				this.getRecentNoticeLists(this.pageNum, this.pageSize);
			}, 200);
		}
	},
	onReady() {
		this.virifyLogin();
		this.getRecentNoticeLists();
	},
	onShow() {
		this.virifyLogin();
	},
	//下拉刷新
	onPullDownRefresh() {
		this.getRecentNoticeLists();
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
}
.wrap {
	height: 200vh;
}
.post-message {
	height: 630rpx;
	background-color: #ffffff;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	border-radius: 20rpx;
}
</style>
