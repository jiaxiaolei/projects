var http = require('http');

// 课程列表
var url = 'http://www.imooc.com/learn/348'

http.get(url, function(res){

	var html = '';
	res.on('data', function(data) {
		// body...
		html += data;

	});

	res.on('end', function(){
       console.log(html);
	})

}).on('error', function(){
	console.log("Get course list faild.");
})