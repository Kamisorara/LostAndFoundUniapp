<template>
	<view class="changeBackgroundPage">
		<view style="display:flex;">
			<view class="upload">
				<u-upload :previewImage="false" :fileList="fileList1" @afterRead="afterRead" name="1" multiple :maxCount="1">
					<image
						src="https://img0.baidu.com/it/u=2578096408,3698868768&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
						mode="widthFix"
						style="width: 250px;height: 150px;"
					></image>
					<view style="display: flex;">
						<view style="margin: auto;"><text style="font-size: 40rpx;color:gray;">点击上传</text></view>
					</view>
				</u-upload>
			</view>
		</view>

		<view style="margin: 100rpx;" v-if="showLoading" class="loading"><u-loading-icon mode="circle" text="正在上传中,请稍等!"></u-loading-icon></view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
import ipAddr from '@/utils/config.js';
import { getToken } from '@/utils/token.js';
export default {
	data() {
		return {
			//文件List
			fileList1: [],
			//显示加载
			showLoading: false
		};
	},
	methods: {
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
		},
		// 新增图片
		async afterRead(event) {
			this.showLoading = true;
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
					url: ipAddr.baseurl + '/laf/person/update-background', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					formData: {
						user: 'test'
					},
					//请求头带上token
					header: {
						token: getToken('token')
					},
					success: res => {
						this.showLoading = false;
						setTimeout(() => {
							let resp = JSON.parse(res.data);
							if (resp.code === 200) {
								this.backPage();
							} else {
								this.$refs.uToast.show({
									title: '图片上传失败',
									type: 'error',
									message: resp.msg
								});
							}
							resolve(res.data.data);
						}, 1000);
					}
				});
			});
		},
		//上传成功后操作
		backPage() {
			this.$refs.uToast.show({
				title: '图片上传成功',
				type: 'success',
				message: '个性背景上传成功'
			});
			setTimeout(() => {
				uni.reLaunch({
					url: '/pages/person/person'
				});
			}, 1000);
		}
	}
};
</script>

<style lang="scss" scoped>
.upload {
	margin: auto;
}
</style>
