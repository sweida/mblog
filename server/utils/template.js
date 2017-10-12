const Domain = require('../config')['domain']

const commentsTpl = (content, buttonUrl, buttonText) => {
	return `
		<style>
			* {
				font-family: Helvetica, 'Microsoft Yahei', verdana;
			}
	    a, td a, div a{
	        color: #6bc30d;
	        text-decoration: none;
	    }
		</style>
		<center>
			<div style="max-width:640px;margin:32px 16px;background-color:#fff;box-shadow: 0 0 10px #555;">
				<figure style="padding:32px 0; margin:0 32px;border-bottom: 1px dotted #ddd;"><img src="https://img.smohan.net/app/logo-black.svg" style="width:162px;height:40px;margin:0 auto;display:block;"></figure>
				<div style="padding: 32px; text-align: left;">${content}</div>
				<footer style="background: #eee; border-top: 1px solid #ddd; text-align: center;padding:32px;">
					<a href="${buttonUrl}" style="padding: 8px 18px; background: #6bc30d; color: #fff; text-decoration: none; text-decoration: nonel;">${buttonText}</a>
				</footer>
			</div>
		</center>
	`
}


exports.messageReply = (user, reply) => {
	const content = `
		${user} 您好，<a href="${Domain}">Smohan</a>回复了您的留言：
		<div style="margin:16px 0 0 0">${reply}</div>
	`
	return commentsTpl(content, '${Domain}/message', '查看回复 ➔')
}

/**
 * 用户回复评论
 * @param  {Object} body 
 * {
 * 		user, 接收者昵称
 * 		replyEmail, 回复者邮箱
 * 		replyNick, 回复者昵称
 * 		linkUrl, 关联链接
 * 		linkText, 关联标题
 * 		context 回复内容
 * }
 * @return {String}
 */
exports.commentReply = (body = {}) => {
	const content = `
		${body.user} 您好，<a href="mailto:${body.replyEmail}">${body.replyNick}</a>回复了您的评论：
		<div style="border-left: 5px solid #DDD; padding: 0 0 0 24px; color: #777; margin-top:16px;">
	    <a style="font-weight: bold;" href="${body.linkUrl}">${body.linkText}</a>
	    <br>
	    ${body.context}
		</div>
	`
	return commentsTpl(content, body.linkUrl, '查看评论 ➔')
}


exports.sendNotice = (user, contents) => {
	const content = `
		Smohan 您好，${user}发布了评论：
		<div style="border-left: 5px solid #DDD; padding: 0 0 0 24px; color: #777; margin-top:16px;">
	    ${contents}
		</div>
	`
	return commentsTpl(content, Domain, '查看评论 ➔')
}