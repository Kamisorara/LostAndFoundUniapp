<template>
	<view class="index_recent">
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
			<view class="post-message-message" style="height: 100rpx;background-color:#FFFFFF;margin-left: 140rpx;margin-right: 30rpx;display: inline-block;">
				<text>在{{ item.message }}</text>
			</view>
			<view class="post-message-img" style="height: 360rpx;background-color:#FFFFFF;margin-top: 20rpx;margin-left: 30rpx;margin-right: 30rpx;display: flex;flex-wrap: wrap;">
				<view v-for="(photo, photoIndex) in item.lafPhotoUrls" :key="photoIndex" class="post-img" style="margin-left: 65rpx;margin-top: 20rpx;">
					<u--image
						radius="10rpx"
						:showLoading="true"
						src="https://img1.baidu.com/it/u=3569420573,2690721824&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=550933ea35463883a98741e144cf95c7"
						width="120px"
						height="80px"
					></u--image>
				</view>
			</view>
		</view>
		<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
	</view>
</template>

<script>
import { getRecentNotice } from '@/common/api/laf/index.js';
export default {
	name: 'index_recent',
	data() {
		return {
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
					userName: 'Kamisora',
					type: '',
					message: '丢失一个airpods pro 有没有人看到',
					avatarUrl: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/29/3a22a87c-a150-4165-a453-5d69566a3094.png',
					lafPhotoUrls: [
						'https://img1.baidu.com/it/u=358105290,730157327&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=7849921314e7abf94a336061c0f659c8',
						'https://img1.baidu.com/it/u=358105290,730157327&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=7849921314e7abf94a336061c0f659c8'
					]
				}
			]
		};
	},
	methods: {
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
		}
	},
	// 加载更多
	onReachBottom() {
		if (this.status == 'nomore') {
			return;
		}
		setTimeout(() => {
			this.getPageCommodities(this.pageNum, this.pageSize);
		}, 500);
	},
	created() {
		this.getRecentNoticeLists();
	}
};
</script>

<style lang="scss" scoped>
.post-message {
	height: 630rpx;
	background-color: #ffffff;
	margin-top: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
	border-radius: 20rpx;
}
</style>
