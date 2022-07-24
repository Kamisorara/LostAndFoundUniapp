import request from "@/utils/http.js"

const urlHead = '/laf/lost'

// 分页获取所有寻物启事
export function getAllLostNotice(pageNum, pageSize) {
	return request.get(urlHead + '/get-all-lost' + '?pageNum=' + pageNum + '&pageSize=' + pageSize);
}

//创建寻物启事
export function createLostNotice(data) {
	return request.post(urlHead + "/create-lost-notice", data);
}

// 根据启示id获取启示详情
export function getLostNoticeDetail(id) {
	return request.get(urlHead + '/get-foundpost-detail' + '?id=' + id);
}
