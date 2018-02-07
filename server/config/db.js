var mysql = require('mysql');

var conn = mysql.createConnection({
	host: "10.40.153.190",
	user: "wr",
	password: "121314",
	database: "wechat"
	
})

conn.connect();

module.exports = conn;
