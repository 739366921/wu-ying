const request = (url = '', date = {}, type = 'POST', header = {}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			method: type,
			url: url,
			data: date,
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			// responseType: 'arraybuffer',
			dataType: 'json',
		}).then((response) => {
			setTimeout(function() {
				uni.hideLoading();
			}, 200);
			let [error, res] = response;
			resolve(res.data);
		}).catch(error => {
			let [err, res] = error;
			reject(err)
		})
	});
}
export default request
