import request from "@/utils/http.js"

const urlHead = '/laf/index'
//首页获取公告
export function getBoardList() {
	return request.get(urlHead + '/get-board-info');
}

//获取帮助次数最多的前三名用户
export function getTop3UserList() {
	return request.get(urlHead + '/get-top3-list');
}

//获取最多四条普通寻物启事信息
export function getSimpleLostInfo() {
	return request.get(urlHead + '/get-lost-simple-info');
}


//获取最多四条普通拾物启事信息
export function getSimpleFoundList() {
	return request.get(urlHead + '/get-found-simple-info');
}

//首页获取四条紧急寻物启事
export function getSimpleUrgencyLostList() {
	return request.get(urlHead + '/get-urgency-lost-info');
}

//首页分页获取最近发布其实列表
export function getRecentNotice(pageNum, pageSize) {
	return request.get(urlHead + '/get-recent-notice' + '?pageNum=' + pageNum + '&pageSize=' + pageSize);
}


//分页获取根据KeyWords搜索到的内容
export function getSearchResp(keyWords, pageNum, pageSize) {
	return request.post(urlHead + '/search' + '?keyWords=' + keyWords + '&pageNum=' + pageNum + '&pageSize=' +
	pageSize);
}
