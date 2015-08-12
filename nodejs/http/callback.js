
function learn(something) {
	// body...
	console.log(something);
}

function we(callback, something) {
	// body...
	something += ' is coll'
	callback(something)
}

// 具名函数... 
we(learn, 'NodeJs')


we(function(something){
	console.log(something);
}, 'Jia Xiaolei')