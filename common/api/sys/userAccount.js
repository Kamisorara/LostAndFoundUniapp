import request from "@/utils/http.js"

const urlHead = '/sys/user-account'

//退出
export function logout() {
	return request.get(urlHead + '/logout');
}
