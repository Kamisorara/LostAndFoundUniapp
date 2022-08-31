<template>
	<view class="informDetailPage">
		<view class="informDetail_top">
			<view class="inform_top" style="width: 95%;height: 200rpx;background-color:#FFFFFF;margin: 30rpx auto 0 auto;border-radius: 20rpx;">
				<view style="display: flex;"><text style="font-weight: 600;margin: 30rpx;font-size: 40rpx;">系统通知</text></view>
				<view>
					<text style="font-size: 30rpx;margin-left: 30rpx;">通知日期:</text>
					<text style="font-size: 25rpx;color: #747474;">{{ info.createTime }}</text>
				</view>
			</view>
			<u-divider text="通知下文"></u-divider>
			<view class="inform_main" style="margin: 40rpx 30rpx 0 30rpx;"><u-tooltip :text="info.messageInfo" bgColor="#e3e4e6"></u-tooltip></view>
		</view>
	</view>
</template>

<script>
import { getInfoDetail } from '@/common/api/sys/info/info.js';
export default {
	name: 'informDetailPage',
	data() {
		return {
			infoId: '',
			//info 详情信息
			info: {}
		};
	},
	methods: {
		//获取消息详情
		infoDetail() {
			getInfoDetail(this.infoId).then(res => {
				console.log(res);
				this.info = res.data.data;
			});
		}
	},
	//获取info id
	onLoad(data) {
		this.infoId = data.id;
	},
	onReady() {
		//获取info
		this.infoDetail();
	}
};
</script>

<style scoped lang="scss"></style>
