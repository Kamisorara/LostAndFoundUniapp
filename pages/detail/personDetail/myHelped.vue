<template>
	<view class="myHelped">
		<view class="title" style="font-size: 60rpx;font-weight: 600;margin: 50rpx;"><text>帮助</text></view>
		<view class="publish-part">
			<view
				@click="toNoticeDetailPage(notice.id)"
				v-for="(notice, index) in noticeLists"
				:key="index"
				class="outer_frame"
				style="height: 470rpx;margin: 30rpx 20rpx 50rpx 20rpx;background-color: #FFFFFF;border-radius: 15rpx;"
			>
				<view class="describe_part" style="display:flex;">
					<view style="margin: 20rpx;width: 150rpx;font-weight: 600;color: #888888;"><text>简介:</text></view>
					<view style="margin: 20rpx 20rpx 0 0 ;height: 120rpx;" class="u-line-3">
						<text style="font-size: 27rpx;">{{ notice.message }}</text>
					</view>
				</view>
				<view class="notice-img" style="display: flex;">
					<view style="margin:10rpx auto 0 auto;"><u--image :showLoading="true" :src="notice.lafPhotoUrl" radius="10" width="230px" height="120px"></u--image></view>
				</view>
				<view class="notice-buttom" style="display: flex;margin-top: 20rpx;">
					<view style="width: 55%;"></view>
					<view v-if="notice.type === '0' && notice.urgency === '0'" class="lost-urgency"><u-tag text="紧急寻物" type="error" plain></u-tag></view>
					<view v-if="notice.type === '0' && notice.urgency === '1'" class="lost"><u-tag text="寻物启事" type="warning" plain></u-tag></view>
					<view v-if="notice.type === '1'" class="lost"><u-tag text="拾物启示" type="primary" plain></u-tag></view>
					<view v-if="notice.done === '0'" class="done" style="margin-left: 30rpx;"><u-tag text="已完成" type="success"></u-tag></view>
				</view>
			</view>
			<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		</view>
	</view>
</template>

<script>
import { getUserHelpedNoticePage } from '@/common/api/laf/person.js';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
export default {
	name: 'myHelped',
	data() {
		return {
			//notice 列表
			noticeLists: [],
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
			//当前用户的信息
			userInfo: {}
		};
	},
	methods: {
		//前往notice详情界面
		toNoticeDetailPage(id) {
			uni.navigateTo({
				url: '/pages/detail/noticeDetail/noticeDetail' + '?id=' + id
			});
		},
		//验证当前用户登录状态
		currentUserLoginInfo() {
			virifyLoginStatus().then(res => {
				console.log(res);
				this.userInfo = res.data.data;
				if (res.data.code === 200) {
					this.getReleasedNoticeLists();
				}
			});
		},
		// （懒加载）用户发布notice列表
		async getReleasedNoticeLists() {
			await getUserHelpedNoticePage(this.userInfo.id, this.pageNum, this.pageSize).then(async res => {
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
		}
	},
	// 加载更多
	onReachBottom() {
		if (this.status == 'nomore') {
			return;
		}
		setTimeout(() => {
			this.getReleasedNoticeLists(this.userInfo.id, this.pageNum, this.pageSize);
		}, 500);
	},
	onReady() {
		this.currentUserLoginInfo();
	}
};
</script>

<style lang="scss" scoped></style>
