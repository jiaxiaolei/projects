

var EventEmitter = require('events').EventEmitter;

var life = new EventEmitter();



// 添加最大 触发。。。。 
life.setMaxListeners(100); 



function water (who){
    console.log("给 "+who+ "倒水");

}


// 添加事件。 方法， 回调函数

// 注册一个 具名 函数... 
life.on('求安慰', water)


life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水1");

})

life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水2");

})

life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水3");

})

life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水4");

})

life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水5");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水6");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水7");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水8");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水9");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水10");

})
life.on('求安慰', function(who){
    console.log("给 "+who+ "倒水11");

})
life.on('求溺爱', function(who){
    console.log("给 "+who+ "买衣服");

})
life.on('求溺爱', function(who){
    console.log("给 "+who+ "买包包");

})


// 移除事件。 
// 匿名函数， 具名函数...
life.removeListener('求安慰', water);


life.removeAllListeners('求安慰');


// 移除所有监听...  移除 emiter(life)
// life.removeAllListeners();



// 事件名
// 获取事件监听的数量... 
console.log(life.listeners('求安慰').length);

console.log(life.listeners('求溺爱').length);


console.log(EventEmitter.listenerCount(life, '求安慰'));

// 调用方法， 参数列表
// 触发....
var hasconfort = life.emit('求安慰', '汉子');
var hasloved = life.emit('求溺爱', '妹子');
var hasplayed = life.emit('求玩坏', '汉子和妹子');


// 查看是否被调用... 
console.log(hasconfort);
console.log(hasloved);
console.log(hasplayed);



/**

 node events.js
(node) warning: possible EventEmitter memory leak detected. 11 求安慰 listeners added. Use emitter.setMaxListeners() to increase limit.
Trace
    at EventEmitter.addListener (events.js:179:15)
    at Object.<anonymous> (/Users/jiaxiaolei/Documents/git_project/projects/nodejs/events/events.js:53:6)
    at Module._compile (module.js:460:26)
    at Object.Module._extensions..js (module.js:478:10)
    at Module.load (module.js:355:32)
    at Function.Module._load (module.js:310:12)
    at Function.Module.runMain (module.js:501:10)
    at startup (node.js:129:16)
    at node.js:814:3
给 汉子倒水



*/
