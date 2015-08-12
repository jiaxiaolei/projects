
var globalVar = 'this is global varibale';

function globalFunction () {
	// body...
	var localVar = 'this is local variable'
	console.log('visit global/local variable')

	console.log(globalVar);
	console.log(localVar);

	globalVar = 'this is changed global varibale';
    console.log(globalVar);

    function localFun () {
    	// body...
    	var innerLocalVar = 'this is inner local val';

    		console.log('visit global/local/inner variable')

			console.log(globalVar);
			console.log(localVar);
			console.log(innerLocalVar);

    }

    localFun()
}

globalFunction()



