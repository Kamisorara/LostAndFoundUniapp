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
			<view class="info_mian">
				
			</view>
		</view>
	</view>
</template>

<script>
import { getUserInfoPage } from '@/common/api/sys/info/info.js';
export default {
	name: '',
	data() {
		return {
			backgroundUrl:
				'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg1.juimg.com%2F180719%2F330841-1PGZ1323654.jpg&refer=http%3A%2F%2Fimg1.juimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1663314970&t=27a9dd043c03ab0c2cc659ae33f5a4d0'
		};
	},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: #f4f4f4;
}
.info_mian {
	height: 140rpx;
	background-color: #ffffff;
	width: 97%;
	margin: 50rpx auto 0 auto;
	border-radius: 15rpx;
}
</style>
