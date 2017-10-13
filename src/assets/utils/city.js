import {
	isPlainObject
} from './index'
const formatCity = (data, ip = false) => {
	let location
	if (data && isPlainObject(data)) {
		if (data.city) {
			if (data.province && data.province != data.city) {
				location = `${data.province} · ${data.city}`
			} else {
				location = data.city
			}
		} else {
			location = data.province ? `${data.country} · ${data.province}` : data.country
		}
		if (ip && data.ip) {
			location += `(${data.ip})`
		}
		return location
	}
	return '未知地址'
}

export default formatCity