<template>
	<view class="noticeDetailPage">
		<!-- 有照片 -->
		<view class="u-demo-block" v-if="noticePhotoList.length">
			<view class="u-demo-block__content">
				<view class="album" style="margin-top: 30rpx;">
					<view class="album__content"><u-album multipleSize="230rpx" :urls="noticePhotoList"></u-album></view>
				</view>
			</view>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<!-- 无图片并且是自己发布的 -->
		<view class="none-photo" v-if="!noticePhotoList.length && noticeCreatedInfo.id === noticeVisitInfo.id">
			<view style="margin-left: 50rpx;"><u--text type="info" size="20" text="请点击下方图标上传图片"></u--text></view>
			<view style="margin-left: 50rpx;margin-top: 20rpx;">
				<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10"></u-upload>
			</view>
			<!-- 测试按钮 -->
			<view><button @click="submitPhoto()">上传</button></view>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<!-- 启示简介 -->
		<view class="notice-message">
			<view class="message" style="margin-left: 20rpx;height: 160rpx;"><u--text text="丢失一个airpods pro 有没有人看到"></u--text></view>
			<view class="notice-message-buttom" style="height: 40rpx;">
				<view style="margin-left: 540rpx;display: flex;">
					<u--text type="info" text="浏览:"></u--text>
					<u--text type="info" bold :text="noticeDetail.view"></u--text>
				</view>
			</view>
		</view>
		<!-- 启示用户信息 -->
		<view class="userInfoMessage">
			<view style="display: flex;">
				<view style="margin: 30rpx 0 0 20rpx;"><u-avatar :src="noticeCreatedInfo.avatarUrl" size="45"></u-avatar></view>
				<view style="margin: 30rpx 0 0 20rpx;"><u--text size="20" bold :text="noticeCreatedInfo.userName"></u--text></view>
			</view>
			<view style="display: flex;width: 180rpx;background-color: #dddddd;border-radius: 30rpx;margin: 50rpx 0 0 120rpx;">
				<u-icon size="25" name="chat"></u-icon>
				<u--text size="15" text="发起会话"></u--text>
			</view>
		</view>
		<!-- 底部(未帮助) -->
		<view class="helped-end" v-if="noticeDetail.done === '1'">
			<view style="width: 70%;"><u--text type="info" size="10" text="(如已完成请点击按钮)"></u--text></view>
			<view style="width: 30%;background-color: red;height: 100%;">
				<view @click="show = true" style="text-align:center;margin-top:20rpx;color: #FFFFFF;font-weight: 600;">未帮助</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<view>
			<u-popup mode="center" round="20" :show="show" @close="close" @open="open"><view style="height: 650rpx;width: 700rpx;"></view></u-popup>
		</view>
		<!-- 底部(已帮助) -->
		<view class="helped-end" v-if="noticeDetail.done === '0'">
			<view style="width: 70%;display: flex;">
				<view style="margin: 8rpx 0 0 20rpx;"><u--text type="info" text="帮助人:"></u--text></view>
				<view style="margin-left: 20rpx;"><u-avatar :src="noticeCreatedInfo.avatarUrl" size="30"></u-avatar></view>
				<view style="margin: 8rpx 0 0 10rpx;"><u--text bold :text="noticeCreatedInfo.userName"></u--text></view>
			</view>
			<view style="background-color: #cecece;width: 30%;height: 100%;"><view style="text-align:center;margin-top:20rpx;color: #a0a0a0;font-weight: 600;">已帮助</view></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'noticeDetailPage',
	data() {
		return {
			//弹出层
			show: false,
			//上传图片列表
			fileList1: [],
			//启示发布者信息
			noticeCreatedInfo: {
				id: '1231284718394712',
				userName: 'Kamisora',
				avatarUrl: '',
				phoneNumber: '15906877873',
				avatarUrl: 'https://kamisora-bucker-1.oss-cn-hangzhou.aliyuncs.com/2022/06/29/3a22a87c-a150-4165-a453-5d69566a3094.png'
			},
			//启示访问者信息
			noticeVisitInfo: {
				id: '1231284718394712',
				userName: ''
			},
			//启示信息
			noticeDetail: {
				id: '',
				createdUserId: '',
				type: '', //启示类型0(寻物),1(拾物)
				urgency: '',
				done: '1',
				helpedId: '123123123123123',
				view: 0
			},
			//图片展示
			albumWidth: 0,
			noticePhotoList: [
				// 'https://img1.baidu.com/it/u=1220287642,842319143&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658509200&t=adde4a935c0bd44ecb034b8178c633c6',
				// 'https://img2.baidu.com/it/u=2463669505,2607971509&fm=253&app=138&size=w931&n=0&f=JPG&fmt=auto?sec=1658509200&t=6b1ad74c54a650d930ee62a9ae2dfa44',
				// 'https://img2.baidu.com/it/u=3749748237,4013353562&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1658509200&t=a528c92efd3f208ddbfea4489b227a31',
				// 'https://img0.baidu.com/it/u=157194238,17403950&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658509200&t=6256a87886eafe4b00d07fa7f3d3175d',
				// 'https://img1.baidu.com/it/u=890526170,3591067541&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1658509200&t=2f153c2a5d22ae62aa2ccfb7da51b1cd'
			]
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
				console.log(this.fileList1);
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
							resolve(res.data.data);
						}, 1000);
					}
				});
			});
		},
		//弹出层操作
		open() {
			// console.log('open');
		},
		close() {
			this.show = false;
			// console.log('close');
		}
	},
	//获取url参数
	onLoad(data) {
		this.noticeDetail.id = data.id;
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #ffffff;
	height: 100%;
}
.album {
	@include flex;
	align-items: flex-start;

	&__avatar {
		background-color: $u-bg-color;
		padding: 5px;
		border-radius: 3px;
	}

	&__content {
		margin-left: 10px;
		flex: 1;
	}
}
.notice-message {
	height: 200rpx;
	background-color: #fff2fa;
	border-radius: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.userInfoMessage {
	height: 250rpx;
	background-color: #f2f4ff;
	border-radius: 20rpx;
	margin: 40rpx 20rpx 0 20rpx;
}
.helped-end {
	width: 100%;
	height: 90rpx;
	background-color: #f2f5ff;
	position: fixed;
	/* #ifndef H5 */
	bottom: 0rpx;
	/* #endif */
	/* #ifdef H5 */
	bottom: 0rpx;
	/* #endif */
	left: 0;
	display: flex;
	align-items: center;
}
</style>
