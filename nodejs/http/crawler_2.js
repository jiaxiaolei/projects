var http = require('http');
var cheerio = require('cheerio');

// 课程列表
var url = 'http://www.imooc.com/learn/348'


function printcourseInfo(courseData) {
    courseData.forEach(function(item) {

		var chapterTitle = item.chapterTitle
		console.log(chapterTitle + '\n')
		item.videos.forEach(function(video){
			console.log(' 【' + video.id + '】' + video.title +'\n')
		})


    })

}

// npm install cheerio, 像 jquery 一样操作对象

function filterChapters(html) {
    // 解析所有的html 代码
    var $ = cheerio.load(html);

    var chapters = $('.learnchapter');

    var courseData = [];

    chapters.each(function(item) {
        var chapter = $(this);
        var chapterTitle = chapter.find('strong').text();
        var videos = chapter.find('.video').children('li');
        var chapterData = {

            chapterTitle: chapterTitle,
            videos: []
        }

        videos.each(function(item) {
            var video = $(this).find('.studyvideo');
            var videoTitle = video.text();
            var id = video.attr('href').split('video/')[1];

            chapterData.videos.push({
                    title: videoTitle,
                    id: id

                }

            )

        })

        courseData.push(chapterData);

    })
    return courseData;
}



http.get(url, function(res) {

    var html = '';

    // 事件监听...  event.emmit, 监听，发射
    // 
    // 最大监听 10 件事情 ...
    // 
    res.on('data', function(data) {
        // body...
        html += data;

    });

    res.on('end', function() {
        // console.log(html);
        var courseData = filterChapters(html);
        printcourseInfo(courseData);
    })

}).on('error', function() {
    console.log("Get course list faild.");
})

// <a>test</a><p>testp</p><script type="text/javascript" src="http://c.csdnimg.cn/pubfooter/js/tracking.js" charset="utf-8"></script>