import request from "@/utils/http.js"

const urlHead = '/sys/user-info'
//根据token验证登录
export function virifyLoginStatus() {
	return request.get(urlHead + '/get-status-login')
}
