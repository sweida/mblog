const isObjectId = objectId => objectId && /^[0-9a-fA-F]{24}$/.test(objectId)

const isShortId = shortId => shortId && /^[a-zA-Z0-9]{4,6}$/.test(shortId)

const isEmail = email => email && /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email.trim())

const isNick = nick => nick && /^[\u4E00-\u9FA5\uF900-\uFA2DA-Za-z0-9\-\_]{2,40}$/.test(nick.trim())

const isUrl = url => url && /^(http(?:|s)\:)*\/\/([^\/]+)/.test(url.trim())

export {
	isObjectId,
	isShortId,
	isEmail,
	isNick,
	isUrl
}