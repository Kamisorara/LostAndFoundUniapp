<template>
	<view class="myWaiting">
		<view class="waiting_head"><u-subsection mode="subsection" :list="list" :current="curNow" @change="sectionChange"></u-subsection></view>
		<view class="waiting_upload">
			<view
				v-for="(item, index) in noticeWaitingLists"
				:key="index"
				class="upload_component"
				:class="{ 'upload_component-lost': item.type === '0', 'upload_component-found': item.type === '1' }"
			>
				<view class="upload_component_message">
					<view style="padding-top: 10rpx;" class="u-line-3">
						<text style="font-size:30rpx">{{ item.message }}</text>
					</view>
				</view>
				<view class="waiting-upload-button">
					<view style="width: 40%;"></view>
					<view @click="cancelDoWith(item.id)" class="cancel" style="height: 40rpx;width: 160rpx;border-radius: 30rpx;border: 1px dashed #3d3d3d;display: flex;">
						<text style="color:#6d6d6d;font-size: 30rpx;margin: auto;">取消处理</text>
					</view>
					<view
						@click="toNoticeDetailPage(item.id)"
						class="cancel"
						style="height: 40rpx;width: 160rpx;border-radius: 30rpx;border: 1px dashed #ff4231;display: flex;margin-left: 40rpx;"
					>
						<text style="color:#fc4929;font-size: 30rpx;margin: auto;">立即处理</text>
					</view>
				</view>
				<!-- 弹出确认框 -->
				<u-modal
					:show="show"
					showCancelButton
					cancelText="不了不了~"
					confirmText="删了!"
					@cancel="close"
					@confirm="confirm(currentChooseNotice)"
					:title="title"
					:content="content"
				></u-modal>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserWaitingNoticeLists, deleteUserPersonalNotice } from '@/common/api/laf/person.js';
export default {
	name: 'myWaiting',
	data() {
		return {
			//弹出确认框
			show: false,
			title: '请确认喔',
			content: '你确定要删除此条内容嘛 ≖‿≖',
			list: ['待上传', '待完成'],
			curNow: 0,
			noticeWaitingLists: [],
			//当前选择的notice
			currentChooseNotice: ''
		};
	},
	methods: {
		//切换
		sectionChange(index) {
			this.curNow = index;
		},
		//点击取消处理
		cancelDoWith(noticeId) {
			this.show = true;
			this.currentChooseNotice = noticeId;
		},
		//弹出确认框
		close() {
			this.show = false;
		},
		confirm(noticeId) {
			this.deletePersonalNotice(noticeId);
			this.show = false;
		},
		//前往启示界面
		toNoticeDetailPage(noticeId) {
			uni.navigateTo({
				url: '../noticeDetail/noticeDetail' + '?id=' + noticeId
			});
		},
		//获取用户待处理列表
		getUserWaitingNoticeList() {
			getUserWaitingNoticeLists().then(res => {
				console.log(res);
				this.noticeWaitingLists = res.data.data;
			});
		},
		//删除用户启示
		deletePersonalNotice(noticeId) {
			deleteUserPersonalNotice(noticeId).then(res => {
				console.log(res);
				if (res.data.code === 200) {
					this.getUserWaitingNoticeList();
				}
			});
		},
		
	},
	onReady() {
		this.getUserWaitingNoticeList();
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
	height: 100%;
}
.waiting_head {
	height: 100rpx;
	margin: 10rpx 20rpx 0 20rpx;
}
.upload_component {
	height: 200rpx;
	background-color: #ffffff;
	margin: 30rpx 20rpx 50rpx 20rpx;
	border-radius: 20rpx;
}
.upload_component-lost {
	background-color: #ffe4dd;
}
.upload_component-found {
	background-color: #e1edff;
}
.upload_component_message {
	margin: 0 20rpx 0 20rpx;
	height: 50rpx;
}
.waiting-upload-button {
	margin-top: 95rpx;
	display: flex;
}
</style>
