<template>
	<view class="personalData">
		<view class="personnalData_head">
			<u-cell-group>
				<u-cell title="头像" isLink>
					<view slot="value" class="u-slot-value">
						<u-upload :previewImage="false" :fileList="fileList1" @afterRead="afterRead" name="1" :maxCount="1">
							<u-avatar size="65" :src="userBasicInfo.avatarUrl"></u-avatar>
						</u-upload>
					</view>
				</u-cell>
				<u-cell @click="toEditNamePage()" title="昵称" isLink>
					<text slot="value" style="color: #888888;" class="u-slot-value">{{ userBasicInfo.userName }}</text>
				</u-cell>
				<u-cell @click="toEditPhoneNumPage()" title="联系方式" isLink>
					<text slot="value" style="color: #888888;" class="u-slot-value">{{ userBasicInfo.phoneNumber }}</text>
				</u-cell>
				<u-cell title="电子邮件" :border="false">
					<view slot="value" class="u-slot-value"><u-tooltip color="#888888" :text="userBasicInfo.email" overlay></u-tooltip></view>
				</u-cell>
			</u-cell-group>
		</view>
		<view class="personnalData_mid">
			<u-cell-group>
				<u-cell title="ID">
					<view slot="value" class="u-slot-value"><u-tooltip color="#888888" :text="userBasicInfo.id" overlay></u-tooltip></view>
				</u-cell>
				<u-cell title="创建日期">
					<text slot="value" style="color: #888888;" class="u-slot-value">{{ userBasicInfo.createTime }}</text>
				</u-cell>
				<u-cell @click="toEditBackGroundPage()" title="个性背景" isLink :border="false">
					<view slot="value" class="u-slot-value"><u-icon size="30" name="photo-fill"></u-icon></view>
				</u-cell>
			</u-cell-group>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import { getUserEditInfo } from '@/common/api/laf/person.js';
import ipAddr from '@/utils/config.js';
import { getToken } from '@/utils/token.js';
export default {
	name: '',
	data() {
		return {
			//用户基本信息
			userBasicInfo: {},
			//文件上传列表
			fileList1: []
		};
	},
	methods: {
		//从token中获取用户详情
		UserEditInfo() {
			getUserEditInfo().then(res => {
				console.log(res);
				this.userBasicInfo = res.data.data;
			});
		},
		//重载该页面
		redirectPage() {
			uni.redirectTo({
				url: 'personalData'
			});
		},
		//前往修改昵称界面
		toEditNamePage() {
			uni.navigateTo({
				url: 'edit/editUserName'
			});
		},
		//前往修改联系方式界面
		toEditPhoneNumPage() {
			uni.navigateTo({
				url: 'edit/editPhoneNum'
			});
		},
		//前往修改背景界面
		toEditBackGroundPage() {
			uni.navigateTo({
				url: 'edit/editBackground'
			});
		},
		// 新增图片
		async afterRead(event) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file);
			let fileListLen = this[`fileList${event.name}`].length;
			lists.map(item => {
				this[`fileList${event.name}`].push({
					...item,
					status: 'uploading',
					message: '上传中'
				});
			});
			for (let i = 0; i < lists.length; i++) {
				const result = await this.uploadFilePromise(lists[i].url);
				let item = this[`fileList${event.name}`][fileListLen];
				this[`fileList${event.name}`].splice(
					fileListLen,
					1,
					Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					})
				);
				fileListLen++;
			}
		},
		uploadFilePromise(url) {
			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: ipAddr.baseurl + '/laf/person/update-user-avatar', //后端api接口
					filePath: url,
					name: 'file',
					formData: {
						user: 'test'
					},
					header: {
						token: getToken('token')
					},
					success: res => {
						setTimeout(() => {
							let resp = JSON.parse(res.data);
							if (resp.code === 200) {
								this.redirectPage();
							} else if (resp.code === 400) {
								this.$refs.uToast.show({
									title: '登录失败',
									type: 'error',
									message: resp.msg
								});
								setTimeout(() => {
									this.redirectPage();
								}, 1000);
							}
							resolve(res.data.data);
						}, 1000);
					}
				});
			});
		}
	},
	onReady() {
		this.UserEditInfo();
	},
	onShow() {
		this.UserEditInfo();
	}
};
</script>

<style lang="scss" scoped>
/* App.vue */
.cell-hover-class {
	background-color: rgb(252, 254, 255);
}
/* 或者单是设置透明度 */
.cell-hover-class {
	opacity: 0.5;
}
.personnalData_head {
	margin-top: 30rpx;
	height: 420rpx;
	background-color: #ffffff;
}
.personnalData_mid {
	margin-top: 30rpx;
	height: 270rpx;
	background-color: #ffffff;
}
</style>
