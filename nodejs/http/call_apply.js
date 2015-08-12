
var pet = {

	words: 'jiaxiaolei',
	speak: function(say){
        console.log(say + ' '+ this.words);

	}
}

pet.speak('Speak')


var dog = {
    words: 'wangwang';

}


// 改变上下文为 dog. 

// call: 参数列表
// apply: 
pet.speak.call(dog, 'Speak')