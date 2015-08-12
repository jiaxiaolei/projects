var http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
    'content': '老师太逗了。。。',
    'mid': 8837,
})

var options = {
    'hostname': 'www.imooc.com',
    'port': 80,
    'path': '/course/docomment',
    'method': 'POST',
    'headers': {

        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding': 'gzip, deflate',
        'Accept-Language': 'zh-CN,zh;q=0.8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Content-Length': postData.length, //89, // 服务器端可能会校验
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': 'PHPSESSID=ol7e9l6odetn79d259bp49a2s2; imooc_uuid=be0dab6b-daf2-47d6-8dfc-26c209cb53c9; loginstate=1; apsid=dkMjY5ZjM5MmI4YWFmYzAxZjhiYWNlZTlhNWRmZTEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMTE4MDYwMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyODEzMDQwNTFAcXEuY29tAAAAAAAAAAAAAAAAAAAAADk4MmRjMmE0OTkyNmVkODJjZTdhNDYyODNiZjAzZTEy09GzVNPRs1Q%3DMT; cvde=55c8718041a45-24; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1439199617; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1439273636',
        'Host': 'www.imooc.com',
        'Origin': 'http://www.imooc.com',
        'Pragma': 'no-cache',
        'Referer': 'http://www.imooc.com/video/8837',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',

    }
}

var req = http.request(options, function(res) {
    console.log('status：' + res.statusCode);

    // 看一下原始的 headers。。 一个对象。
    console.log('status：' + res.headers);


    // 字符串显示
    console.log('headers: ' + JSON.stringify(res.headers));

    res.on('data', function(chunk) {
        // body...
        console.log(Buffer.isBuffer(chunk));
        console.log(typeof chunk)
    })

    res.on('end', function(chunk) {
        // body...
        console.log('评论完毕');

    })



})

// 添加监听，后续会被触发
req.on('error', function(e) {
    // body...
    console.log('error: ' + e.message);

})

req.write(postData);
req.end();




/**

定义对象： 

var jia = {a=1,b=3}

get  对 request 进行封装... 


*/