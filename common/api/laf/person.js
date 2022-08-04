import request from "@/utils/http.js"

const urlHead = '/laf/person'

//根据用户id 获取用户主页详情（包括用户，头像，昵称，帮助他人次数,用户个人主页背景图片等（根据Token的id）
export function getUserDetailInfo() {
	return request.get(urlHead + '/get-person-detail');
}

//根据token用户id 获取用户启示相关徽标值
export function getUserNoticeBadgeValue() {
	return request.get(urlHead + "/get-userNotice-badge");
}

//获取用户待处理列表(从token中获取)
export function getUserWaitingNoticeLists() {
	return request.get(urlHead + '/user-waiting');
}

//根据启示id删除自己发布的启示
export function deleteUserPersonalNotice(noticeId) {
	return request.post(urlHead + '/delete-personal-notice' + "?id=" + noticeId);
}


//根据用户id 分页获取该用户帮助的所有启示
export function getUerReleasedNoticePage(userId, pageNum, pageSize) {
	return request.get(urlHead + '/get-userReleased-page' + '?id=' + userId + "&pageNum=" + pageNum + '&pageSize=' +
		pageSize);
}

//根据用户 id 分页获取该用户帮助过的所有notice
export function getUserHelpedNoticePage(userId, pageNum, pageSize) {
	return request.get(urlHead + '/get-userHelped-page' + '?id=' + userId + "&pageNum=" + pageNum + '&pageSize=' +
		pageSize);
}

// 根据用户id 查询用户发布的启示的个数,帮助他人的启示的个数和浏览次数
export function getUserBasicNum(userId) {
	return request.get(urlHead + '/get-user-basic-num' + "?id=" + userId);
}

//用户编辑资料界面根据Token获取所有该用户基本信息
export function getUserEditInfo() {
	return request.get(urlHead + '/user-editInfo');
}


//根据用户token id 更改用户名
export function updateUserName(userName) {
	return request.post(urlHead + '/update-userName' + "?userName=" + userName);
}

//根据token id 修改联系方式
export function updatePhoneNum(phoneNum) {
	return request.post(urlHead + '/update-phoneNum' + "?phoneNum=" + phoneNum);
}
