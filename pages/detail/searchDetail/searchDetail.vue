<template>
	<view class="search_derail">
		<text>{{ keyWords }}</text>
	</view>
</template>

<script>
import { getSearchResp } from '@/common/api/laf/index.js';
export default {
	name: 'searchDerail',
	data() {
		return {
			keyWords: ''
		};
	},
	methods: {},
	//获取关键字
	onLoad(data) {
		this.keyWords = data.keyWords;
	}
};
</script>

<style lang="scss" scoped>

	
</style>
