/*

require('./xxx')

和 

require('xxx')

的区别？ 





*/

var http = require('http');

var server = http.createServer(function (req, res) {
	// body...
	res.writeHead(200, {'Content-Type':'text/plain'});
	res.write('Hello NodeJs');
	res.end();
})

server.listen(2015)

