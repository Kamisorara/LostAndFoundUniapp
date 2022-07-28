<template>
	<view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="createFoundNoticeForm">
			<u-form-item label="简介" prop="noticeInfo.message" borderBottom ref="item1">
				<u--input v-model="model1.noticeInfo.message" maxlength="50" placeholder="请输入相关内容(不多于50字)" border="none"></u--input>
			</u-form-item>
		</u--form>
		<view class="text" style="margin-top: 20rpx;;"><u--text type="info" size="10" text="请在输入相关简介,确认无误并点击创建后前往启示界面添加图片!"></u--text></view>
		<view class="submit" style="width: 300rpx;margin: auto;margin-top: 100rpx;"><u-button type="primary" @click="submit()" size="normal" text="立即创建"></u-button></view>
	</view>
</template>

<script>
import { createFoundNotice } from '@/common/api/laf/found.js';
export default {
	name: 'createFoundPage',
	data() {
		return {
			showUrgency: false,
			model1: {
				noticeInfo: {
					message: ''
				}
			},
			rules: {
				'noticeInfo.message': {
					type: 'string',
					required: true,
					message: '请填写相关简介',
					trigger: ['blur', 'change']
				}
			},
			radio: '',
			switchVal: false
		};
	},
	methods: {
		//提交表单
		submit() {
			this.$refs.createFoundNoticeForm.validate().then(res => {
				console.log('校验成功');
				this.createNewFoundNotice();
			});
		},
		//创建拾物启示
		createNewFoundNotice() {
			createFoundNotice(this.model1.noticeInfo).then(res => {
				console.log(res);
				if (res.data.code === 200) {
					this.toNoticeDetailPage();
				}
			});
		},
		//跳转至待处理界面
		toNoticeDetailPage() {
			uni.switchTab({
				url: '../../person/person'
			});
		}
	},
	onReady() {
		this.$refs.createFoundNoticeForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
	}
};
</script>

<style lang="scss" scoped></style>
