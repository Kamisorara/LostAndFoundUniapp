import request from "@/utils/http.js";

const urlHead = '/sys/info';

//获取用户联系方式
export function getUserPhoneNum(id) {
	return request.get(urlHead + "/get-user-phone" + "?id=" + id);
}

//根据用户token id 分页获取该用户所有通知
export function getUserInfoPage(pageNum, pageSize) {
	return request.get(urlHead + '/get-user-info-page' + "?pageNum=" + pageNum + "&pageSize=" + pageSize);
}
