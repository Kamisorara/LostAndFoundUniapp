<template>
	<view class="lost">
		<view class="lost-title" style="font-weight: 600;font-size: 60rpx;color: darkorange;"><text style="margin-left:50rpx">(~▽~)~*</text></view>
		<u-sticky>
			<view
				class="tabTitle"
				style="margin-top: 50rpx;
	height: 80rpx;
	width: 100%;
	border-bottom-left-radius: 15rpx;border-bottom-right-radius: 15rpx;
	background: rgba(252, 252, 252, 0.5);
	backdrop-filter: blur(5px);
	"
			>
				<u-tabs :scrollable="false" :list="tabLists" @change="switchTab"></u-tabs>
			</view>
		</u-sticky>

		<!-- 寻物启事部分 -->
		<view v-if="currentChoose === 0" class="lost-main" style="margin-top: 30rpx;display: flex;flex-wrap: wrap;">
			<view
				v-for="(item, index) in noticeLists"
				:key="index"
				:class="{ 'position-left': (index + 1) % 2 != 0, 'position-right': (index + 1) % 2 == 0 }"
				style="background-color: #FFFFFF;height:500rpx;width: 345rpx;border-radius: 20rpx;"
			>
				<view @click="toNoticeDetailPage(item.id)" class="lost-img" style="margin: auto;margin-top:10rpx;height: 370rpx;width:320rpx;background-color: antiquewhite;">
					<u--image :showLoading="true" :src="item.lafPhotoUrl" width="320rpx" height="370rpx"></u--image>
				</view>
				<view class="lost-text" style="display: flex;">
					<!-- <u-tag text="紧急" plain type="error" size="mini" icon="https://img1.baidu.com/it/u=345396241,529780618&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"></u-tag> -->
					<u-tag text="寻物" plain type="error" size="mini"></u-tag>
					<view class="u-line-2">
						<text style="font-size: 25rpx;margin-left: 10rpx;margin-top: 5rpx;">{{ item.message }}</text>
					</view>
				</view>
				<view class="lost-user" style="display: flex;">
					<view class="lost-user-avatar"><u-avatar :src="item.avatarUrl" size="25"></u-avatar></view>
					<view class="lost-user-name" style="margin-left: 20rpx;font-weight: 600;font-size: 25rpx;">
						<text>{{ item.userName }}</text>
					</view>
					<view class="u-line-1" style="margin-left: 50rpx;color: darkgray;">
						<text style="font-size:20rpx">浏览:</text>
						<text style="font-size: 30rpx;margin-left: 5rpx;">0</text>
					</view>
				</view>
			</view>
		</view>

		<view v-if="currentChoose === 1" class="found-main" style="margin-top: 30rpx;display: flex;flex-wrap: wrap;">
			<view
				v-for="(item, index) in noticeLists"
				:key="index"
				:class="{ 'position-left': (index + 1) % 2 != 0, 'position-right': (index + 1) % 2 == 0 }"
				style="background-color: #FFFFFF;height:500rpx;width: 345rpx;border-radius: 20rpx;"
			>
				<view @click="toNoticeDetailPage(item.id)" class="found-img" style="margin: auto;margin-top:10rpx;height: 370rpx;width:320rpx;background-color: antiquewhite;">
					<u--image :showLoading="true" :src="item.lafPhotoUrl" width="320rpx" height="370rpx"></u--image>
				</view>
				<view class="found-text" style="display: flex;">
					<u-tag text="拾物" plain size="mini"></u-tag>
					<view class="u-line-2">
						<text style="font-size: 25rpx;margin-left: 10rpx;margin-top: 5rpx;">{{ item.message }}</text>
					</view>
				</view>
				<view class="found-user" style="display: flex;">
					<view class="found-user-avatar"><u-avatar :src="item.avatarUrl" size="25"></u-avatar></view>
					<view class="found-user-name" style="margin-left: 20rpx;font-weight: 600;font-size: 25rpx;">
						<text>{{ item.userName }}</text>
					</view>
					<view class="u-line-1" style="margin-left: 50rpx;color: darkgray;">
						<text style="font-size:20rpx">浏览:</text>
						<text style="font-size: 30rpx;margin-left: 5rpx;">0</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 加载更多 -->
		<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		<!-- toast弹窗 -->
		<view><u-toast ref="uToast"></u-toast></view>
	</view>
</template>

<script>
import { getAllLostNotice } from '@/common/api/laf/lost.js';
import { getAllFoundList } from '@/common/api/laf/found.js';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
export default {
	name: '',
	data() {
		return {
			userLoginStatus:{
				isLogin :false
			},
			tabLists: [
				{
					name: '寻物启示'
				},
				{
					name: '拾物启示'
				}
			],
			//寻物启事列表
			noticeLists: [],
			//page
			pageSize: 6, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			status: 'loading',
			currentChoose: 0, //默认为寻物启示
			//加载更多状态
			loadMore: {
				loadingText: '正在拼命加载中...',
				loadmoreText: '上滑加载...',
				nomoreText: '---------鄙人不才，实在没有了T_T---------'
			}
		};
	},
	methods: {
		//切换tab
		switchTab(item) {
			if(this.userLoginStatus.isLogin){
				this.currentChoose = item.index;
				//清空Lists
				this.noticeLists = [];
				this.pageNum = 1;
				this.status = 'loading';
				if (this.currentChoose === 0) {
					setTimeout(() => {
						this.getAllLostNoticeLists(this.pageNum, this.pageSize);
					}, 500);
				} else if (this.currentChoose === 1) {
					setTimeout(() => {
						this.getAllFoundnoticeLists(this.pageNum, this.pageSize);
					}, 500);
				}
			}else{
				this.$refs.uToast.show({
					title: '账户未登录',
					type: 'error',
					message: '账户未登录,请前往登录!'
				});
				setTimeout(() => {
					uni.switchTab({
						url: '/pages/person/person'
					});
				}, 1000);
			}
		},
		//前往启示详情界面
		toNoticeDetailPage(noticeId) {
			uni.navigateTo({
				url: '../detail/noticeDetail/noticeDetail' + '?id=' + noticeId
			});
		},
		// （懒加载）寻物启事列表
		async getAllLostNoticeLists() {
			await getAllLostNotice(this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.noticeLists = res.data.data.records;
				} else {
					this.noticeLists = [...this.noticeLists, ...res.data.data.records];
				}
				this.pageNum++;
			});
		},
		// （懒加载）拾物启示列表
		async getAllFoundnoticeLists() {
			await getAllFoundList(this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.noticeLists = res.data.data.records;
				} else {
					this.noticeLists = [...this.noticeLists, ...res.data.data.records];
				}
				this.pageNum++;
			});
		},
		//验证用户登录情况
		getLoginStatus() {
			virifyLoginStatus().then(res => {
				console.log(res);
				if (res.data.code === 200) {
					this.userLoginStatus.isLogin = true;
					this.getAllLostNoticeLists();
				} else {
					this.$refs.uToast.show({
						title: '账户未登录',
						type: 'error',
						message: '账户未登录,请前往登录!'
					});
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/person/person'
						});
					}, 1000);
				}
			});
		}
	},
	// 加载更多
	onReachBottom() {
		if (this.currentChoose === 0) {
			if (this.status == 'nomore') {
				return;
			}
			setTimeout(() => {
				this.getAllLostNoticeLists(this.pageNum, this.pageSize);
			}, 500);
		} else if (this.currentChoose === 1) {
			if (this.status == 'nomore') {
				return;
			}
			setTimeout(() => {
				this.getAllFoundnoticeListss(this.pageNum, this.pageSize);
			}, 500);
		}
	},
	onReady() {
		//访问此界面首先验证登陆
		this.getLoginStatus();
	},

	onPullDownRefresh() {
		uni.redirectTo({
			url: 'lost'
		});
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 1000);
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}
//排左边的
.position-left {
	margin-left: 20rpx;
	margin-right: 20rpx;
	margin-top: 30rpx;
}
.position-right {
	margin-top: 30rpx;
}
</style>
