export function setToken(tokenKey, token) {
	return uni.setStorageSync(tokenKey, token);
};

export function getToken(tokenKey) {
	return uni.getStorageSync(tokenKey);
};

export function removeToken(tokenKey) {
	return uni.removeStorageSync(tokenKey);
}
