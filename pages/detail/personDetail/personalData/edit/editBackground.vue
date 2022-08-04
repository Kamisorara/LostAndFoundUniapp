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
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
export default {
	data() {
		return {
			fileList1: []
		};
	},
	methods: {
		// 删除图片
		deletePic(event) {
			this[`fileList${event.name}`].splice(event.index, 1);
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
					url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					formData: {
						user: 'test'
					},
					success: res => {
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
				uni.navigateBack({
					delta: 1
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
