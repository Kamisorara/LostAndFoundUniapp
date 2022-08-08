<template>
	<view class="search">
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar :autoBack="false" bgColor="#ece8e5">
			<view class="u-nav-slot" slot="left" style="display: flex;">
				<u-icon @click="backIndexPage()" name="arrow-left" size="20"></u-icon>
				<view style="margin-left: 40rpx;display: flex;width: 450rpx;">
					<u-search placeholder="搜索你要的" @search="addToHistory(keyword)" :focus="true" v-model="keyword" :show-action="false"></u-search>
				</view>
				<view class="button" style="position: absolute;left: 430rpx;top: 15rpx;">
					<u-button @click="addToHistory(keyword)" size="small" shape="circle" type="error" text="搜索"></u-button>
				</view>
			</view>
		</u-navbar>
		<view class="none-search" style="margin-top: 200rpx;margin-left: 250rpx;" v-if="!historySearch.length"><u--text type="info" size="20" text="暂无历史搜索"></u--text></view>
		<!-- 历史搜索 -->
		<view class="search-touch" v-if="historySearch.length" style="margin-top: 100rpx;margin-left: 30rpx;">
			<view class="hot-search">
				<view class="hot-tit" style="display: flex;">
					<u--text size="19" text="历史搜索"></u--text>
					<view @click="show = true" style="margin-right: 20rpx;"><u-icon size="25" name="trash-fill"></u-icon></view>
				</view>
				<view class="hot-con clearfix" style="display: flex;flex-wrap: wrap;margin-top: 30rpx;">
					<view class="item" style="margin-left: 20rpx;margin-top: 40rpx;" v-for="(item, index) in historySearch" :key="index">
						<u-tag @click="toSearchDetailPage(item)" plain :text="item"></u-tag>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹出确认框 -->
		<u-modal :show="show" showCancelButton cancelText="不了不了~" confirmText="删了!" @cancel="close" @confirm="confirm()" :title="title" :content="content"></u-modal>
	</view>
</template>
<script>
export default {
	data() {
		return {
			//模态框显示
			show: false,
			//模态框标题
			title: '确认',
			content: '确定要删除历史搜索吗?',
			// 用户输入的关键词
			keyword: '',
			//历史搜索
			historySearch: []
		};
	},
	methods: {
		//模态框关闭methods
		close() {
			this.show = false;
		},
		//模态框确认事件
		confirm() {
			this.clearHistory();
			this.show = false;
		},
		//返回主页
		backIndexPage() {
			uni.navigateBack({
				delta: 1
			});
		},
		//前往搜索详情界面
		toSearchDetailPage(keyWords) {
			uni.navigateTo({
				url: '/pages/detail/searchDetail/searchDetail' + '?keyWords=' + keyWords
			});
		},
		//获取历史搜索
		getHistory() {
			let that = this;
			let words = '';
			if (uni.getStorageSync('historySearch')) {
				//判断缓存中存没存搜索词
				words = JSON.parse(uni.getStorageSync('historySearch'));
			}
			if (!words) {
				return [];
			}
			for (let i = 0; i < words.length; i++) {
				if (words[i] == '' || typeof words[i] == 'undefined' || words[i] == '') {
					words.splice(i, 1);
					i = i - 1;
				}
			}
			return words;
		},
		//添加历史搜索
		addToHistory(keyword) {
			let that = this;
			let words = that.getHistory();
			let has = words.includes(keyword);
			if (!has) {
				// 数组末尾 删除 ， keyword 数组第一位
				let length = words.length;
				if (length >= 10) {
					words.pop();
				}
				words.unshift(keyword);
				uni.setStorageSync('historySearch', JSON.stringify(words));
			}
			//前往搜索详情界面
			this.toSearchDetailPage(keyword);
		},
		//清除历史搜索（清空缓存）
		clearHistory() {
			uni.removeStorageSync('historySearch');
			this.historySearch = [];
		}
	},
	onShow() {
		//获取历史搜索
		this.historySearch = this.getHistory();
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
	height: 100%;
}
</style>
