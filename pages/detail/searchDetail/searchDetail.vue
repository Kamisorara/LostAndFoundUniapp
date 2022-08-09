<template>
	<view class="search_detail">
		<view class="search_main">
			<!-- 用户发布 -->
			<view v-for="(item, MesssageIndex) in noticeList" :key="MesssageIndex" class="post-message">
				<!-- 紧急 -->
				<view class="tabs" style="margin-left: 20rpx;width: 110rpx;">
					<u-tag
						v-if="item.urgency === '0' && item.type === '0'"
						text="紧急"
						plain
						type="error"
						size="mini"
						icon="https://img1.baidu.com/it/u=345396241,529780618&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
					></u-tag>
				</view>
				<!-- 拾物 -->
				<view v-if="item.type === '0' && item.urgency === '1'" class="lost" style="width: 20%;margin-left: 20rpx;">
					<u-tag text="寻物启事" type="warning" plain></u-tag>
				</view>
				<!-- 寻物 -->
				<view v-if="item.type === '1'" class="lost" style="width: 20%;margin-left: 20rpx;"><u-tag text="拾物启示" type="primary" plain></u-tag></view>
				<!-- 发布用户信息 -->
				<view class="post_userMaessage" style="display: flex;">
					<view class="title-avatar" style="margin-left:30rpx;margin-top: 10rpx;"><u-avatar :src="item.avatarUrl" size="40"></u-avatar></view>
					<view class="post-message-userName" style="font-size: 40rpx;margin-top: 20rpx;margin-left: 40rpx;width: 400rpx;">
						<text>{{ item.userName }}</text>
					</view>
					<!-- 浏览次数 -->
					<view class="views" style="display: flex;margin-top: 30rpx;width: 300rpx;">
						<view style="font-weight: 600;color: #818181;"><text>浏览:</text></view>
						<view style="font-weight: 600;"><text>0</text></view>
					</view>
				</view>
				<view @click="toNoticeDetailPage(item.id)">
					<view class="post-message-message" style="height: 100rpx;background-color:#FFFFFF;margin-left: 140rpx;margin-right: 30rpx;display: inline-block;">
						<text>{{ item.message }}</text>
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
	</view>
</template>

<script>
import { getSearchResp } from '@/common/api/laf/index.js';
export default {
	name: 'searchDerail',
	data() {
		return {
			keyWords: '',
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
		toNoticeDetailPage(id) {
			uni.navigateTo({
				url: '/pages/detail/noticeDetail/noticeDetail' + '?id=' + id
			});
		},
		async getSearchRespLists() {
			await getSearchResp(this.keyWords, this.pageNum, this.pageSize).then(async res => {
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
	//获取关键字
	onLoad(data) {
		this.keyWords = data.keyWords;
	},
	onReachBottom() {
		if (this.status == 'nomore') {
			return;
		}
		setTimeout(() => {
			this.getSearchRespLists(this.keyWords, this.pageNum, this.pageSize);
		}, 200);
	},
	onReady() {
		this.getSearchRespLists(this.keyWords, this.pageNum, this.pageSize);
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	height: 200vh;
}
.post-message {
	height: 630rpx;
	background-color: #ffffff;
	margin: 30rpx 20rpx 0rpx 20rpx;
	border-radius: 20rpx;
}
</style>
