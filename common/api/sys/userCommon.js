import request from "@/utils/http.js"

const urlHead = '/sys/user-common'

//登录接口
export function login(data) {
	return request.post(urlHead + '/login', data);
}

//注册接口
export function register(data) {
	return request.post(urlHead + '/register', data);
}

//获取邮箱验证码
export function verifyCode(emailAddr) {
	return request.post(urlHead + '/verify-code' + '?email=' + emailAddr);
}

//获取验证码接口
export function getLoginverifyCode() {
	return request.get(urlHead + '/loginVerifyCode');
}

//根据用户id 查询用户注册的email是否相撞
export function judgeEmailOnlyOne(emailAddr) {
	return request.post(urlHead + '/judge-email-only' + '?email=' + emailAddr);;
}

//根据用户名userName 判断用户名是否唯一
export function judgeUserNameOnlyOne(userName) {
	return request.post(urlHead + '/judge-userName-only' + "?userName=" + userName);
}
