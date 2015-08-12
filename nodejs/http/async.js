// <script src='a.js'></script>
// <script src='b.js'></script>
// <script src='c.js'></script>


// var i=0;
// while(true){
// 	i++;
// }


var c = 0;
function printIt () {
	// body...
	console.log(c);
}

// 正确... 
// function plus () {
// 	// body...

// 	c +=1;
// }


// 没生效
// function plus () {
// 	// body...
// 	setTimeout(function(){
// 		c +=1;
// 	}, 1000)
// }


function plus (callback) {
	// body...
	setTimeout(function(){
		c +=1;
		callback()
	}, 1000)
}

plus(printIt)
// printIt()