import request from "@/utils/http.js"

const urlHead = '/sys/user-info'
//根据token验证登录
export function virifyLoginStatus() {
	return request.get(urlHead + '/get-status-login')
}

//根据他人id获取用户详情包括昵称头像
export function getOtherUserBasicInfo(userId) {
	return request.get(urlHead + '/get-user-info' + '?id=' + userId);
}
