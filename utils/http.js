const baseUrl = 'http://192.168.31.174:8081'

const request = (options = {}) => {
	let token = "";
	if (uni.getStorageSync('token') == null) {
		token = "";
	} else {
		token = uni.getStorageSync('token');
	}
	options.header = (options.method == 'GET' ? {
		'X-Requested-With': 'XMLHttpRequest',
		"Accept": "application/json",
		"Content-Type": "application/json; charset=UTF-8",
		'token': token
	} : {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		'token': token,
	});
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl + options.url || '',
			method: options.type || 'GET',
			data: options.data || {},
			header: options.header || {}
		}).then(data => {
			let [err, res] = data;
			resolve(res);
		}).catch(error => {
			reject(error)
		})
	});
}

const get = (url, data, options = {}) => {

	options.type = 'GET';
	options.data = data;
	options.url = url;
	return request(options)
}

const post = (url, data, options = {}) => {
	options.type = 'POST';
	options.data = data;
	options.url = url;
	return request(options)
}


export default {
	request,
	get,
	post
}
