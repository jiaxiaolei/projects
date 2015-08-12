function Pet(words){

	this.words = words;
	this.speak = function(){
		console.log(this.words);
	}
}


/**

实现继承的东西：
*/

function Dog(words){
    
    Pet.call(this, words);
    // Pet.apply(this, arg);

}



var dog = new Dog("wang");

dog.speak()