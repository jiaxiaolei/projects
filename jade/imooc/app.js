var express = require('express');

// 全局变量： 

// PORT=4000 node app.js
var port = process.env.PORT || 3000;

var app = express();


// 访问同级目录，   ./views  而不是   view


// 设置模板引擎：
app.set('views', './views');
app.set('view engine', 'jade');

applisten(port);

console.log("imooc started on port: "+port);


// GET method route
app.get('/test', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
// TODO：这里为什么不行???  
app.post('/test', function (req, res) {
  res.send('POST request to the homepage');
});


app.get('/', function (req, res) {
	// body...
	res.render('index', {
		title: 'imooc 首页'，
	});
})；


app.get('/detail', function (req, res) {
	// body...
	res.render('detail', {
		title: 'imooc 详情'，
	});
})；


app.get('/admin', function (req, res) {
	// body...
	res.render('admin', {
		title: 'imooc 管理'，
	});
})；



app.get('/', function (req, res) {
	// body...
	res.render('index', {
		title: 'imooc 首页'，
	});
})；

