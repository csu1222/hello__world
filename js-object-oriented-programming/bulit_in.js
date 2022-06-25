console.group('Math Mathod');
console.log("Math.PI", Math.PI);
console.log("MAth.random()", Math.random());
console.log("Math.floor(3.9)", Math.floor(3.9));
console.groupEnd('Math Mathod');


var myMath = {
    PI:Math.PI,
    random:function(){
        return Math.random();
    },
    floor:function(val){
        return Math.floor(val);
    }
}
console.group('myMath Mathod');
console.log("myMath.PI", myMath.PI);
console.log("myMAth.random()", myMath.random());
console.log("myMath.floor(3.9)", myMath.floor(3.9));
console.groupEnd('myMath Mathod');