module.exports = function(main) {
	return {
		msg: require(main + '/common/msg.js'),
		render: require(main + '/common/render.js')
	}
}