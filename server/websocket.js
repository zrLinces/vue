module.exports = function(app, conn) {

	var server = require('http').createServer(app);
	var io = require('socket.io')(server);
	io.on('connection', function(socket) {
		socket.on("getid", function(data) { //获取用户id并更新数据库
			console.log("当前用户id为" + data.id);
			let sql = "update user set socketid='" + socket.id + "' where id='" + data.id + "';"
			conn.query(sql, (err, rs) => {
				if(err) console.log(err.message);
				else {
					console.log("已更新id为" + data.id + "的socketid为" + socket.id);
				}
			})
		})
		socket.on("getTid", function(data) {
			console.log("当前要发送的目标好友id为" + data.tid);
			socket.on("sendMsg", function(msg) {
				console.log(msg);
				let sql = "select socketid from user where id='" + data.tid + "';"
				conn.query(sql, (err, rs) => {
					if(err) console.log(err.message);
					else {
						console.log("目标的socketid为" + rs[0].socketid);
						if(rs[0].socketid) {
							console.log(rs[0].socketid)
							io.sockets.sockets[rs[0].socketid].emit("receiveMsg", {
								msg: msg.msg
							});
						}else{
							console.log("匹配失败");
						}

					}
				})
			})

		})
	});
	server.listen(7878);
}