<template>
	<view class="found">
		<view class="found-title" style="font-weight: 600;font-size: 60rpx;color: darkorange;"><text style="margin-left:50rpx">帮帮大家</text></view>
		<view class="found-main" style="margin-top: 30rpx;display: flex;flex-wrap: wrap;">
			<view
				v-for="(item, index) in foundList"
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
		<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
	</view>
</template>

<script>
import { getAllFoundList } from '@/common/api/laf/found.js';
export default {
	name: '',
	data() {
		return {
			//拾物启事列表
			foundList: [
				{
					id: 1,
					userName: 'Kamisora',
					message: '丢失一个airpods pro 有没有人看到',
					lafPhotoUrl: 'https://img1.baidu.com/it/u=358105290,730157327&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1656781200&t=7849921314e7abf94a336061c0f659c8',
					avatarUrl: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/29/3a22a87c-a150-4165-a453-5d69566a3094.png'
				}
			],
			//page
			pageSize: 6, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			status: 'loading',
			//加载更多状态
			loadMore: {
				loadingText: '正在拼命加载中...',
				loadmoreText: '上滑加载...',
				nomoreText: '---------鄙人不才，实在没有了T_T---------'
			}
		};
	},
	methods: {
		//前往启示详情界面
		toNoticeDetailPage(noticeId) {
			uni.navigateTo({
				url: '../detail/noticeDetail/noticeDetail' + '?id=' + noticeId
			});
		},
		// （懒加载）列表
		async getAllFoundLists() {
			await getAllFoundList(this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.foundList = res.data.data.records;
				} else {
					this.foundList = [...this.foundList, ...res.data.data.records];
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
			this.getAllFoundLists(this.pageNum, this.pageSize);
		}, 200);
	},
	onReady() {
		this.getAllFoundLists();
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
