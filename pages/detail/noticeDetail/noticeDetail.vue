<template>
	<view class="noticeDetailPage">
		<!-- 有照片 -->
		<view class="u-demo-block" v-if="noticePhotoList.length">
			<view class="u-demo-block__content">
				<view class="album" style="margin-top: 30rpx">
					<view class="album__content"><u-album multipleSize="230rpx" :urls="noticePhotoList"></u-album></view>
				</view>
			</view>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<!-- 无图片并且是自己发布的 -->
		<view class="none-photo" v-if="!noticePhotoList.length && noticeCreatedInfo.id === noticeVisitInfo.id">
			<view style="margin-left: 50rpx"><u--text type="info" size="20" text="请点击下方图标上传图片"></u--text></view>
			<view style="margin-left: 50rpx; margin-top: 20rpx"><u-upload :fileList="fileList1" @afterRead="afterRead" name="1" multiple :maxCount="10"></u-upload></view>
			<view v-if="ifBackToIndexPage"><button @click="backToIndexPage()">已有图片上传成功点击返回即可</button></view>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<!-- 无图并且不是自己发布的 -->
		<view class="none-photo-notMine" v-if="noticeCreatedInfo.id != noticeVisitInfo.id && !noticePhotoList.length">
			<u-empty text="该用户没有上传图片喔" icon="https://img0.baidu.com/it/u=590748739,1789824504&fm=253&fmt=auto&app=138&f=PNG?w=500&h=417"></u-empty>
			<u-divider text="分割线" :dot="true"></u-divider>
		</view>
		<!-- 启示简介 -->
		<view class="notice-message">
			<view class="message" style="margin-left: 20rpx; height: 160rpx">
				<view class="noticeDetail_message" style="font-size: 30rpx;color: #535353;display: flex;">
					<text style="margin: 10rpx 10rpx 0 10rpx;">{{ noticeDetail.message }}</text>
				</view>
			</view>
			<view class="notice-message-buttom" style="height: 40rpx">
				<view style="margin-left: 540rpx; display: flex">
					<u--text type="info" text="浏览:"></u--text>
					<u--text type="info" bold :text="noticeDetail.view"></u--text>
				</view>
			</view>
		</view>
		<!-- 启示用户信息 -->
		<view class="userInfoMessage">
			<view style="display: flex">
				<view style="margin: 30rpx 0 0 20rpx"><u-avatar :src="noticeCreatedInfo.avatarUrl" size="45"></u-avatar></view>
				<view style="margin: 30rpx 0 0 20rpx"><u--text size="20" bold :text="noticeCreatedInfo.userName"></u--text></view>
			</view>
			<view
				style="
          display: flex;
          width: 180rpx;
          background-color: #dddddd;
          border-radius: 30rpx;
          margin: 50rpx 0 0 120rpx;
        "
			>
				<u-icon size="25" name="chat"></u-icon>
				<u--text size="15" text="发起会话"></u--text>
			</view>
		</view>
		<!-- 底部(未帮助)并且是自己自己发布的 -->
		<view class="helped-end" v-if="noticeDetail.done === '1' && noticeDetail.userId === noticeVisitInfo.id">
			<view style="width: 70%;margin-left: 50rpx;"><u--text type="info" size="10" text="(如已完成请点击按钮)"></u--text></view>
			<view style="width: 30%; background-color: red; height: 100%">
				<view
					@click="show = true"
					style="
            text-align: center;
            margin-top: 20rpx;
            color: #ffffff;
            font-weight: 600;
          "
				>
					未帮助
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<view>
			<u-popup mode="center" round="20" :show="show" @close="close" @open="open">
				<view style="height: 650rpx; width: 700rpx">
					<view class="search_user_top" style="display: flex;">
						<view style="margin: 40rpx 0 0 50rpx;"><text style="font-size: 50rpx;font-weight: 600;">搜索用户</text></view>
					</view>
					<view class="search_user" style="width: 80%;margin: 40rpx 0 0 45rpx;">
						<view class="u-demo-block__content">
							<view class="u-page__tag-item">
								<u-search
									v-model="keyWords"
									:show-action="false"
									@search="searchUserByUserName(keyWords)"
									@blur="searchUserByUserName(keyWords)"
									borderColor="rgb(230, 230, 230)"
									bgColor="#fff"
								></u-search>
							</view>
						</view>
					</view>
					<view class="search_user_main" style="width: 80%;height: 30%;margin: 50rpx auto 0 auto;">
						<view style="display: flex" v-if="showSearchUser">
							<view style="margin: 30rpx 0 0 20rpx"><u-avatar :src="searchUserInfo.avatarUrl" size="45"></u-avatar></view>
							<view style="margin: 40rpx 0 0 20rpx;width: 60%;"><u--text size="20" bold :text="searchUserInfo.userName"></u--text></view>
							<view class="choose_user" style="margin-top: 30rpx;"><u-button type="primary" plain text="就是你!"></u-button></view>
						</view>
						<view v-if="!showSearchUser" style="margin: 100rpx 0 0 auto;">
							<text style="color: #7e7e7e;font-size: 30rpx;margin: 70rpx;">当前未找到用户( ╯-_-)╯┴—┴</text>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 底部(已帮助)大家都可以看到 -->
		<view class="helped-end" v-if="noticeDetail.done === '0'">
			<view style="width: 70%; display: flex">
				<view style="margin: 8rpx 0 0 20rpx"><u--text type="info" text="帮助人:"></u--text></view>
				<view style="margin-left: 20rpx"><u-avatar :src="noticeCreatedInfo.avatarUrl" size="30"></u-avatar></view>
				<view style="margin: 8rpx 0 0 10rpx"><u--text bold :text="noticeCreatedInfo.userName"></u--text></view>
			</view>
			<view style="background-color: #cecece; width: 30%; height: 100%">
				<view
					style="
            text-align: center;
            margin-top: 20rpx;
            color: #a0a0a0;
            font-weight: 600;
          "
				>
					已帮助
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getNoticeFoundNoticeDetail } from '@/common/api/laf/found.js';
import { getLostNoticeDetail } from '@/common/api/laf/lost.js';
import { virifyLoginStatus } from '@/common/api/sys/userInfo.js';
import { getToken } from '@/utils/token.js';
import { getOtherUserBasicInfo, getUserByUserName } from '@/common/api/sys/userInfo.js';
export default {
	name: 'noticeDetailPage',
	data() {
		return {
			//是否显示搜索用户
			showSearchUser: false,
			keyWords: '',
			//是否可以返回
			ifBackToIndexPage: false,
			//弹出层
			show: false,
			//上传图片列表
			fileList1: [],
			//启示发布者信息
			noticeCreatedInfo: {
				id: '3',
				userName: '',
				phoneNumber: '',
				avatarUrl: ''
			},
			//启示访问者信息
			noticeVisitInfo: {
				id: '1',
				userName: ''
			},
			//启示信息
			noticeDetail: {
				id: '',
				userId: '2',
				message: '',
				type: '', //启示类型0(寻物),1(拾物)
				urgency: '',
				done: '',
				helpedId: '',
				view: '0'
			},
			//搜索用户return信息
			searchUserInfo: {
				id: '',
				userName: '',
				avatarUrl: ''
			},
			//图片展示
			albumWidth: 0,
			//图片列表
			noticePhotoList: []
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
				console.log(result);
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
					url: 'http://192.168.31.174:8081/laf/person/fastdfs-upload', // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					formData: {
						id: this.noticeDetail.id
					},
					header: {
						token: getToken('token')
					},
					success: res => {
						setTimeout(() => {
							console.log(res);
							this.ifBackToIndexPage = true;
							resolve(res.data.data);
						}, 200);
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
		},
		//返回index界面
		backToIndexPage() {
			uni.reLaunch({
				url: '../../index/index'
			});
		},
		//验证用户登录状态并且获取当前访问者的基本信息包括id,userName,avatarUrl
		getVisitUserInfo() {
			virifyLoginStatus().then(res => {
				console.log(res);
				this.noticeVisitInfo = res.data.data;
			});
		},
		//根据启示id 获取当前启示的基本信息
		getNoticeInfo() {
			getNoticeFoundNoticeDetail(this.noticeDetail.id).then(res => {
				console.log(res);
				this.noticeDetail = res.data.data[0];
				this.noticePhotoList = res.data.data[1];
				if (res.data.code === 200) {
					this.getNoticeCreatedUserBasicInfo();
				}
			});
		},
		//获取启示创建者的基本信息
		getNoticeCreatedUserBasicInfo() {
			getOtherUserBasicInfo(this.noticeDetail.userId).then(res => {
				console.log(res);
				this.noticeCreatedInfo = res.data.data;
			});
		},
		//根据用户id 获取用户名
		searchUserByUserName(userName) {
			getUserByUserName(userName).then(res => {
				console.log(res);
				if (res.data.code === 200) {
					this.searchUserInfo = res.data.data;
					this.showSearchUser = true;
				} else if (res.data.code === 400) {
					this.showSearchUser = false;
				}
			});
		}
	},
	//获取url参数
	onLoad(data) {
		this.noticeDetail.id = data.id;
	},
	onReady() {
		this.getNoticeInfo();
		this.getVisitUserInfo();
	}
};
</script>

<style lang="scss" scoped>
page {
	background-color: #f4f4f4;
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
	background-color: #ffe5ee;
	border-radius: 20rpx;
	margin-left: 20rpx;
	margin-right: 20rpx;
}
.userInfoMessage {
	height: 250rpx;
	background-color: #ffffff;
	border-radius: 20rpx;
	margin: 40rpx 20rpx 0 20rpx;
}
.helped-end {
	width: 100%;
	height: 90rpx;
	background-color: #ffffff;
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
