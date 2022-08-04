<template>
	<view class="personalPage" :style="{ backgroundImage: 'url(' + backGroundImg + ')' }" style="height:300rpx">
		<!-- 背景图片有bug暂时只能这么解决 -->
		<view class="person-title" style="height: 1rpx;"></view>
		<view
			class="person-main"
			style="margin: 260rpx 10rpx 0 10rpx;height: 300rpx;border-radius: 20rpx;backdrop-filter: blur(5px);
		color: #fff;
		box-shadow: 0 0 30px 10px rgba(189, 189, 189, 0.4);
		background: rgba(255, 255, 255, 0.5);
		 "
		>
			<view class="person-head" style="display: flex;">
				<!-- 左侧 -->
				<view style="width: 40%;">
					<view class="userAvatar" style="margin: 50rpx ;"><u-avatar size="60" :src="currentPageUserInfo.avatarUrl"></u-avatar></view>
					<view style="margin: 10rpx 0 0 25rpx;width: 300rpx;">
						<text style="color: #000000;font-weight: 600;font-size: 35rpx;">{{ currentPageUserInfo.userName }}</text>
					</view>
				</view>
				<!-- 右侧 -->
				<view>
					<view class="num-title" style="margin: 30rpx 0 0 10rpx;width: 450rpx;display: flex;">
						<view class="publish" style="margin: 30rpx 10rpx 0 40rpx;width: 80rpx;">
							<view style="display: flex;margin-right: 30rpx;">
								<view style="margin: 0 auto 0 auto;">
									<text class="person-head-font">{{ userBasicNum[0] }}</text>
								</view>
							</view>
							<view><text class="person-head-font">发布</text></view>
						</view>
						<view class="helped" style="margin: 30rpx 10rpx 0 60rpx;width: 80rpx;">
							<view style="display: flex;margin-right: 30rpx;">
								<view style="margin: 0 auto 0 auto;">
									<text class="person-head-font">{{ userBasicNum[1] }}</text>
								</view>
							</view>
							<view><text class="person-head-font">帮助</text></view>
						</view>
						<view class="liked" style="margin: 30rpx 10rpx 0 60rpx;width: 80rpx;">
							<view style="display: flex;margin-right: 30rpx;">
								<view style="margin: 0 auto 0 auto;">
									<text class="person-head-font">{{ userBasicNum[2] }}</text>
								</view>
							</view>
							<view><text class="person-head-font">浏览</text></view>
						</view>
					</view>
					<view @click="toEditUserInfoPage()" v-if="visitedUserInfo.id === currentPageUserInfo.id" class="edit">
						<view style="margin: auto;"><text style="font-size: 25rpx;color:#ff5039;">编辑资料</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- tab切换 -->
		<view class="switch"><u-tabs :scrollable="false" :list="list1" @click="switchTab"></u-tabs></view>
		<u-divider text="分割线" :dot="true"></u-divider>
		<!-- 切换显示内容部分(发布) -->
		<view v-if="currentChoose === 0" class="publish-part">
			<view
				@click="toNoticeDetailPage(notice.id)"
				v-for="(notice, index) in noticeLists"
				:key="index"
				class="outer_frame"
				style="height: 470rpx;margin: 30rpx 20rpx 50rpx 20rpx;background-color: #FFFFFF;border-radius: 15rpx;"
			>
				<view class="describe_part" style="display:flex;">
					<view style="margin: 20rpx;width: 150rpx;font-weight: 600;color: #888888;"><text>简介:</text></view>
					<view style="margin: 20rpx 20rpx 0 0 ;height: 120rpx;" class="u-line-3">
						<text style="font-size: 27rpx;">{{ notice.message }}</text>
					</view>
				</view>
				<view class="notice-img" style="display: flex;">
					<view style="margin:10rpx auto 0 auto;"><u--image :showLoading="true" :src="notice.lafPhotoUrl" radius="10" width="230px" height="120px"></u--image></view>
				</view>
				<view class="notice-buttom" style="display: flex;margin-top: 20rpx;">
					<view style="width: 55%;"></view>
					<!-- <view v-if="notice.type === '0'" class="lost-urgency"><u-tag text="紧急寻物" type="error" plain></u-tag></view> -->
					<view v-if="notice.type === '0'" class="lost"><u-tag text="寻物启事" type="warning" plain></u-tag></view>
					<view v-if="notice.type === '1'" class="lost"><u-tag text="拾物启示" type="primary" plain></u-tag></view>
					<view v-if="notice.done === '0'" class="done" style="margin-left: 30rpx;"><u-tag text="已完成" type="success"></u-tag></view>
				</view>
			</view>
			<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		</view>
		<!-- 切换显示内容部分(帮助) -->
		<view v-if="currentChoose === 1">
			<view @click="toNoticeDetailPage(notice.id)" class="person-helped" v-for="(notice, index) in noticeLists" :key="index">
				<view class="describe_part" style="display:flex;">
					<view style="margin: 20rpx;width: 150rpx;font-weight: 600;color: #888888;"><text>简介:</text></view>
					<view style="margin: 20rpx 20rpx 0 0 ;height: 120rpx;" class="u-line-3">
						<text style="font-size: 27rpx;">{{ notice.message }}</text>
					</view>
				</view>
				<view class="notice-img" style="display: flex;">
					<view style="margin:10rpx auto 0 auto;"><u--image :showLoading="true" :src="notice.lafPhotoUrl" radius="10" width="230px" height="120px"></u--image></view>
				</view>
				<view class="notice-buttom-userInfo" style="display: flex;">
					<view style="width: 60%;"></view>
					<view class="user-avatar" style="margin: 15rpx;"><u-avatar size="30" :src="notice.avatarUrl"></u-avatar></view>
					<view class="user-name" style="font-weight: 600;font-size: 25rpx;display: flex;">
						<text style="margin: auto 0 auto 0;">{{ notice.userName }}</text>
					</view>
				</view>
			</view>
			<u-loadmore :status="status" :loading-text="loadMore.loadingText" :loadmore-text="loadMore.loadmoreText" :nomore-text="loadMore.nomoreText" icon />
		</view>
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>
</template>
<script>
import { getUerReleasedNoticePage, getUserHelpedNoticePage, getUserBasicNum } from '@/common/api/laf/person.js';
import { virifyLoginStatus, getOtherUserBasicInfo } from '@/common/api/sys/userInfo.js';
export default {
	name: 'personalPage',
	data() {
		return {
			//返回顶部
			scrollTop: 0,
			//当前页面的用户信息
			currentPageUserInfo: {},
			//访问者的信息
			visitedUserInfo: {},
			//page
			pageSize: 3, //每页加载的个数
			pageNum: 1, //当前的页数
			totalPages: 0, //总页数
			status: 'loading',
			//加载更多状态
			loadMore: {
				loadingText: '正在拼命加载中...',
				loadmoreText: '上滑加载...',
				nomoreText: '---------鄙人不才，实在没有了T_T---------'
			},
			//当前选择（0 发布，1 帮助）
			currentChoose: 0, //默认为发布
			backGroundImg: 'https://img1.baidu.com/it/u=2476734823,214005944&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659546000&t=76d1058a08492d7294ab59c424778e64',
			list1: [
				{
					name: '发布'
				},
				{
					name: '帮助'
				}
			],
			userBasicNum: [0, 0, 0],
			noticeLists: []
		};
	},
	methods: {
		//前往notice详情界面
		toNoticeDetailPage(id) {
			uni.navigateTo({
				url: '/pages/detail/noticeDetail/noticeDetail' + '?id=' + id
			});
		},
		//前往编辑资料界面
		toEditUserInfoPage() {
			uni.navigateTo({
				url: 'personalData/personalData'
			});
		},
		//验证当前用户登录状态
		currentUserLoginInfo() {
			virifyLoginStatus().then(res => {
				console.log(res);
				this.visitedUserInfo = res.data.data;
			});
		},
		//获取当前页面用户信息
		getCurrentUserInfo(id) {
			getOtherUserBasicInfo(id).then(res => {
				console.log(res);
				this.currentPageUserInfo = res.data.data;

				//在获取当前页面用户信息后，进行请求
				setTimeout(() => {
					this.getReleasedNoticeLists(this.currentPageUserInfo.id, this.pageNum, this.pageSize);
				}, 500);
			});
		},
		//获取用户的发布，帮助，浏览次数
		getUserBasicNumList(id) {
			getUserBasicNum(id).then(res => {
				console.log(res);
				this.userBasicNum = res.data.data;
			});
		},
		//切换发布和帮助
		switchTab(item) {
			this.currentChoose = item.index;
			//清空Lists
			this.noticeLists = [];
			this.pageNum = 1;
			this.status = 'loading';
			if (this.currentChoose === 0) {
				setTimeout(() => {
					this.getReleasedNoticeLists(this.currentPageUserInfo.id, this.pageNum, this.pageSize);
				}, 500);
			} else if (this.currentChoose === 1) {
				setTimeout(() => {
					this.getHelpedNoticeLists(this.currentPageUserInfo.id, this.pageNum, this.pageSize);
				}, 500);
			}
		},
		// （懒加载）用户发布notice列表
		async getReleasedNoticeLists() {
			await getUerReleasedNoticePage(this.currentPageUserInfo.id, this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.noticeLists = res.data.data.records;
				} else {
					this.noticeLists = [...this.noticeLists, ...res.data.data.records];
				}
				this.pageNum++;
			});
		},
		//懒加载 用户帮助notice
		async getHelpedNoticeLists() {
			await getUserHelpedNoticePage(this.currentPageUserInfo.id, this.pageNum, this.pageSize).then(async res => {
				console.log(res);
				if (res.data.data.pages <= this.pageNum) {
					this.status = 'nomore';
				} else {
					this.status = 'loading';
				}
				if (this.pageNum === 1) {
					this.noticeLists = res.data.data.records;
				} else {
					this.noticeLists = [...this.noticeLists, ...res.data.data.records];
				}
				this.pageNum++;
			});
		}
	},
	// 加载更多
	onReachBottom() {
		if (this.currentChoose === 0) {
			if (this.status == 'nomore') {
				return;
			}
			setTimeout(() => {
				this.getReleasedNoticeLists(this.currentPageUserInfo.id, this.pageNum, this.pageSize);
			}, 500);
		} else if (this.currentChoose === 1) {
			if (this.status == 'nomore') {
				return;
			}
			setTimeout(() => {
				this.getHelpedNoticeLists(this.currentPageUserInfo.id, this.pageNum, this.pageSize);
			}, 500);
		}
	},
	onReady() {
		this.currentUserLoginInfo();
	},
	//返回顶部
	onPageScroll(e) {
		this.scrollTop = e.scrollTop;
	},
	//获取url参数
	onLoad(data) {
		this.getCurrentUserInfo(data.id);
		this.getUserBasicNumList(data.id);
	},
	//下拉刷新
	onPullDownRefresh() {
		this.getCurrentUserInfo(this.currentPageUserInfo.id);
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 500);
	}
};
</script>

<style lang="scss" scoped>
.personal-main {
	background-color: #ffffff;
	height: 200rpx;
}
.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
.person-head-font {
	color: #414141;
	font-size: 30rpx;
}
.edit {
	margin: 60rpx 0 0 42rpx;
	width: 360rpx;
	height: 50rpx;
	border: 1px solid #ff5039;
	display: flex;
	border-radius: 10rpx;
}
.switch {
	margin-top: 50rpx;
	height: 80rpx;
	width: 100%;
	background-color: #ffffff;
}
.person-helped {
	height: 470rpx;
	margin: 30rpx 20rpx 50rpx 20rpx;
	background-color: #ffffff;
	border-radius: 15rpx;
}
</style>
