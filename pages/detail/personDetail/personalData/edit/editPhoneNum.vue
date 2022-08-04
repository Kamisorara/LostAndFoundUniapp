<template>
	<view class="editphoneNum">
		<view class="u-page__item">
			<u-navbar :autoBack="true" title="联系方式" :fixed="false" left-text="返回" @rightClick="rightClick()" rightText="保存"></u-navbar>
			<view class="u-nav-slot" slot="left"></view>
		</view>
		<view class="editPlace" style="display: flex;">
			<view style="margin: auto 0 auto 10rpx;width: 100%;">
				<view>
					<u--form :model="model1" ref="phoneNumForm">
						<u-form-item prop="userInfo.phoneNum" ref="phoneNum">
							<u--input @confirm="rightClick()" clearable border="none" v-model="model1.userInfo.phoneNum"></u--input>
						</u-form-item>
					</u--form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { updatePhoneNum } from '@/common/api/laf/person.js';
export default {
	name: '',
	data() {
		return {
			model1: {
				userInfo: {
					phoneNum: ''
				}
			},
			rules: {
				'userInfo.phoneNum': {
					type: 'string',
					min: 11,
					max: 11,
					required: true,
					message: '请输入正确的手机号格式',
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		//点击确定修改
		rightClick() {
			this.$refs.phoneNumForm.validate().then(res => {
				console.log('初步校验完成校验成功');
				this.updatePhoneNumByTokenId(this.model1.userInfo.phoneNum);
			});
		},
		leftClick() {
			console.log('leftClick');
		},
		//更新用户名
		updatePhoneNumByTokenId(phoneNum) {
			updatePhoneNum(phoneNum).then(res => {
				console.log(res);
				if (res.data.code === 200) {
					uni.navigateBack({
						delta: 1
					});
				}
			});
		}
	},
	onReady() {
		this.$refs.phoneNumForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
	}
};
</script>

<style lang="scss" scoped>
.editPlace {
	height: 80rpx;
	background-color: #ffffff;
	margin-top: 30rpx;
}
</style>
