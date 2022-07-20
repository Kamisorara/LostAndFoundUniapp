<template>
	<view class="noticeDetailPage">
		<!-- 有照片 -->
		<view v-if="photoUrlList.length" class="have-photo" style="display: flex;flex-wrap: wrap;">
			<view class="NoticeImage" v-for="(item, index) in photoUrlList" :key="index"><u--image :showLoading="true" :src="item"></u--image></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'noticeDetailPage',
	data() {
		return {
			//启示信息
			noticeDetail: {
				id: '',
				createdUserId: '',
				type: '', //启示类型0(寻物),1(拾物)
				urgency: ''
			},
			photoUrlList: [
				'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				'https://cdn.uviewui.com/uview/swiper/swiper1.png'
			]
		};
	},
	methods: {},
	//获取url参数
	onLoad(data) {
		this.noticeDetail.id = data.id;
	}
};
</script>

<style lang="scss" scoped></style>
