import request from "@/utils/http.js"

const urlHead = '/laf/lost'

// 分页获取所有寻物启事
export function getAllLostNotice(pageNum, pageSize) {
	return request.get(urlHead + '/get-all-lost' + '?pageNum=' + pageNum + '&pageSize=' + pageSize);
}
