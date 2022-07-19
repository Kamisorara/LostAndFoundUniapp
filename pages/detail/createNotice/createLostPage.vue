<template>
	<view>
		<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
		<u--form labelPosition="left" :model="model1" :rules="rules" ref="createLostNoticeForm">
			<u-form-item label="简介" prop="noticeInfo.message" borderBottom ref="item1">
				<u--input v-model="model1.noticeInfo.message" maxlength="50" placeholder="请输入相关内容(不多于50字)" border="none"></u--input>
			</u-form-item>
			<u-form-item label="紧急" prop="noticeInfo.urgency" borderBottom @click="showUrgency = true" ref="item1">
				<u--input v-model="model1.noticeInfo.urgency" disabled disabledColor="#ffffff" placeholder="请选择此启示是否为紧急" border="none"></u--input>
				<u-icon slot="right" name="arrow-right"></u-icon>
			</u-form-item>
		</u--form>
		<u-action-sheet
			:show="showUrgency"
			:actions="actions"
			title="请选择是否为紧急"
			description="请慎重选择"
			@close="showUrgency = false"
			@select="urgencySelect"
		></u-action-sheet>
		<view class="text" style="margin-top: 20rpx;;"><u--text type="info" size="10" text="请在输入相关简介,确认无误并点击创建后前往启示界面添加图片!"></u--text></view>
		<view class="submit" style="width: 300rpx;margin: auto;margin-top: 100rpx;"><u-button type="primary" @click="submit()" size="normal" text="立即创建"></u-button></view>
	</view>
</template>

<script>
import { createLostNotice } from '@/common/api/laf/lost.js';
export default {
	name: 'createLostPage',
	data() {
		return {
			showUrgency: false,
			model1: {
				noticeInfo: {
					message: '',
					urgency: '非紧急'
				}
			},
			actions: [
				{
					name: '紧急'
				},
				{
					name: '非紧急'
				}
			],
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
		urgencySelect(e) {
			this.model1.noticeInfo.urgency = e.name;
		},
		//提交表单
		submit() {
			this.$refs.createLostNoticeForm.validate().then(res => {
				console.log('校验成功');
				this.createNewLostNotice();
			});
		},
		//创建寻物启事
		createNewLostNotice() {
			createLostNotice(this.model1.noticeInfo).then(res => {
				console.log(res);
			});
		}
	},
	onReady() {
		this.$refs.createLostNoticeForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
	}
};
</script>

<style lang="scss" scoped></style>
