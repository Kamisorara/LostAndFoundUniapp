<template>
	<view class="editNamePage">
		<view class="u-page__item">
			<u-navbar :autoBack="true" title="昵称" :fixed="false" left-text="返回" @rightClick="rightClick()" rightText="保存"></u-navbar>
			<view class="u-nav-slot" slot="left"></view>
		</view>
		<view class="editPlace" style="display: flex;">
			<view style="margin: auto 0 auto 10rpx;width: 100%;">
				<view>
					<u--form :model="model1" ref="userNameForm">
						<u-form-item prop="userInfo.userName" ref="userName">
							<u--input
								@confirm="rightClick()"
								@focus="inputFocusStatus.userNameInputFocus = true"
								@blur="inputFocusStatus.userNameInputFocus = false"
								clearable
								border="none"
								v-model="model1.userInfo.userName"
							></u--input>
						</u-form-item>
					</u--form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
import { judgeUserNameOnlyOne } from '@/common/api/sys/userCommon.js'; //判断用户名是否唯一
import { updateUserName } from '@/common/api/laf/person.js';
export default {
	name: '',
	data() {
		return {
			model1: {
				userInfo: {
					userName: ''
				}
			},
			//用户名和邮箱输入框聚焦
			inputFocusStatus: {
				userNameInputFocus: false
			},
			couldSubmit: {
				sendModify: false
			},
			rules: {
				'userInfo.userName': {
					type: 'string',
					min: 2,
					max: 10,
					required: true,
					asyncValidator: (rule, value, callback) => {
						if (this.model1.userInfo.userName == '') {
							callback(new Error('请输入大于2位小于10位的用户名'));
						} else if (this.inputFocusStatus.userNameInputFocus === false) {
							judgeUserNameOnlyOne(this.model1.userInfo.userName).then(res => {
								console.log(res);
								if (res.data.code === 200) {
									// 如果校验通过，也要执行callback()回调
									callback();
									//再加一重验证
									this.couldSubmit.sendModify = true;
								} else if (res.data.code === 400) {
									this.couldSubmit.sendModify = false;
									callback(new Error('已存在该用户名,请更换用户名'));
								}
							});
						}
					},
					trigger: ['blur', 'change']
				}
			}
		};
	},
	methods: {
		//点击确定修改
		rightClick() {
			this.$refs.userNameForm.validate().then(res => {
				console.log('初步校验完成校验成功');
				//再加一重验证
				if (this.couldSubmit.sendModify) {
					this.updateUserNameByTokenId(this.model1.userInfo.userName);
				}
			});
		},
		leftClick() {
			console.log('leftClick');
		},
		//从token获取用户名
		getUserNameFromToken() {
			virifyLoginStatus().then(res => {
				console.log(res);
				this.model1.userInfo.userName = res.data.data.userName;
			});
		},
		//更新用户名
		updateUserNameByTokenId(userName) {
			updateUserName(userName).then(res => {
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
		this.$refs.userNameForm.setRules(this.rules); //为了兼容微信微信小程序在onReady上使用setRules方法
		this.getUserNameFromToken();
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
