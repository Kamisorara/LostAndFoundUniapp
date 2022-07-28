import request from "@/utils/http.js"

const urlHead = '/sys/user-common'

//登录接口
export function login(data) {
	return request.post(urlHead + '/login', data);
}

//获取验证码接口
export function getLoginverifyCode() {
	return request.get(urlHead + '/loginVerifyCode');
}
