import request from "@/utils/http.js"

const urlHead = '/laf/person'

//根据用户id 获取用户主页详情（包括用户，头像，昵称，帮助他人次数,用户个人主页背景图片等（根据Token的id）
export function getUserDetailInfo() {
	return request.get(urlHead + '/get-person-detail');
}
