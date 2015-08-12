
var http = require('http');

/* 链式使用.... 


*/
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
// console.log('Server running at http://127.0.0.1:1337/');




var server = http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('jiaxiaolei, Hello World\n');
})
server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');



