import request from "@/utils/http.js"


const urlHead = '/laf/found'

// 分页获取所有寻物启事
export function getAllFoundList(pageNum, pageSize) {
	return request.get(urlHead + '/get-all-found' + '?pageNum=' + pageNum + '&pageSize=' + pageSize);
}


//创建拾物启事
export function createFoundNotice(data) {
	return request.post(urlHead + "/create-found-notice", data);
}

// 根据启示id获取启示详情
export function getNoticeFoundNoticeDetail(id) {
	return request.get(urlHead + '/get-foundpost-detail' + '?id=' + id);
}
