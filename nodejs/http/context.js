
// 对象： 
// this

// var pet = {
// 	words: 'jia',
// 	speak: function(){
// 		console.log(this.words);
// 		console.log(this == pet);
// 	}
// }

// pet.speak()



// function pet(words){
// 	this.words = words;
// 	console.log(this.words);
// 	console.log(this);

// 	// 比较  this 和 顶层 global 对象... 
//     console.log(this == global);

// }

// pet('jiaxiaolei')


function pet(words){
	// this 指向的就是当前对象... 
	this.words = words;
	this.speak = function(){
		console.log(this.words);
		console.log(this);
	}
}

var cat = new pet('Miao')
cat.speak()


/*
this 函数内部：

取决于被调用的方式....

够着函数：

上下文是可以改变的.... 

*/


/*
this: js 中 Window

nodejs： global. 



*/