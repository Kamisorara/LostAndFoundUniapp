<template>
	<view class="inform" :style="{ backgroundImage: 'url(' + backgroundUrl + ')' }" style="height:200rpx">
		<view
			class="imform_top"
			style="height: 200rpx;backdrop-filter: blur(5px);color: #fff;box-shadow: 0 0 30px 10px rgba(189, 189, 189, 0.4);background: rgba(255, 255, 255, 0.5);"
		>
			<view style="font-weight: 600;color: #000000;font-size: 60rpx;display: flex;">
				<view style="margin: 90rpx 0 0 50rpx;"><text>消息通知</text></view>
			</view>

			<!-- 主体部分-->
			<view @click="ToinformDetailPage()" class="info_mian" v-for="(item, index) in infoLists" :key="index">
				<view class="info_top" style="display: flex;">
					<view style="color: #949494;margin: 20rpx 0 0 20rpx;"><text>系统信息</text></view>
					<view style="width: 72%;"></view>
					<view v-if="item.read === '1'" style="width:30rpx;height:30rpx;border-radius:50%;background-color:red;margin-top: 25rpx;"></view>
				</view>
				<view class="info_main" style="height: 80rpx;">
					<view style="color: #414141;margin: 20rpx 30rpx 0 30rpx;font-size: 30rpx;" class="u-line-2">
						<text>{{ item.messageInfo }}</text>
					</view>
				</view>
				<view class="info_bottom" style="display: flex;color: #949494;margin-top: 25rpx;">
					<view style="width:54%"></view>
					<view class="info_time">{{ item.createTime }}</view>
				</view>
			</view>
			<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		</view>
		<!-- toast弹窗 -->
		<view><u-toast ref="uToast"></u-toast></view>
	</view>
</template>

<script>
import { getUserInfoPage } from '@/common/api/sys/info/info.js';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
export default {
	name: 'infoPage',
	data() {
		return {
			//用户登录状态
			userLoginStatus: {
				isLogin: false
			},
			//page
			pageSize: 6, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			status: 'loading',
			//加载更多状态
			loadMore: {
				loadingText: '正在拼命加载中...',
				loadmoreText: '上滑加载...',
				nomoreText: '---------目前就那么多通知了~~---------'
			},
			backgroundUrl:
				'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.juimg.com%2F180719%2F330841-1PGZ1323654.jpg&refer=http%3A%2F%2Fimg1.juimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663314970&t=27a9dd043c03ab0c2cc659ae33f5a4d0',
			infoLists: []
		};
	},
	methods: {
		// （懒加载）列表
		async getUserSysInfo() {
			await getUserInfoPage(this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.infoLists = res.data.data.records;
				} else {
					this.infoLists = [...this.infoLists, ...res.data.data.records];
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
					this.getUserSysInfo();
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
		},
		//通知详情界面
		ToinformDetailPage() {
			uni.navigateTo({
				url: '/pages/inform/informDetail/informDetail'
			});
		}
	},
	// 加载更多
	onReachBottom() {
		if (this.status == 'nomore') {
			return;
		}
		setTimeout(() => {
			this.getUserSysInfo(this.pageNum, this.pageSize);
		}, 200);
	},
	onReady() {
		//访问此界面首先验证登陆
		this.getLoginStatus();
	}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}
.info_mian {
	height: 240rpx;
	background-color: #ffffff;
	width: 97%;
	margin: 50rpx auto 0 auto;
	border-radius: 15rpx;
}
</style>
