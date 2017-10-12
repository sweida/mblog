const marked = require('marked')

marked.setOptions({
	gfm: true,
	pedantic: false,
	sanitize: false,
	tables: true,
	smartLists: true,
	breaks: true,
	langPrefix: 'hljs ',
	highlight : code => require('highlight.js').highlightAuto(code).value
})

module.exports = markdown => marked(markdown)
