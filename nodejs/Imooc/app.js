var express = require('express');


// 命令行的参数。 
// $ PORT=4000 node app.js
var port = process.env.PORT || 3000;

var app = express();

app.set("views", './views');
app.set("view engine", "jade");
// app.set("port", 3000);

app.listen(port);

console.log("imooc start on port " + port );

// 编写路由
app.get("/", function (req, res) {
	res.render('index', {title:"imooc"});
})


// GET method route
app.get('/test', function (req, res) {
  res.send('GET request to the homepage');
});

// POST method route
// TODO：这里为什么不行???  
app.post('/test', function (req, res) {
  res.send('POST request to the homepage');
});


// app.get('/', function (req, res) {
// 	res.render('index', {
// 		title: 'imooc 首页'
// 	})
// })


// 详情页
app.get('/detail', function (req, res) {
	// body...
	res.render('detail', {
		title: 'imooc 详情'
	})
})

// 详情页
app.get('/movie/:id', function (req, res) {
	// body...
	res.render('detail', {
		title: 'imooc 详情'
	})
})

// 后台录入页
app.get('/admin/movie', function (req, res) {
	// body...
	res.render('admin', {
		title: 'imooc 后台录入页'
	})
})


// 列表页
app.get('/', function (req, res) {
	// body...
	res.render('index', {
		title: 'imooc列表页'
	})
})

