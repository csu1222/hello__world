// array, object 데이터를 정리하는 도구

var f = function (){   // function 은 값이 될 수 있다.
console.log(1+1);
console.log(1+2);
}

var a = [f];

a[0]();

var o = {
    func: f
}

o.func();

// var i = if(true){console.log(1)}  if statement 는 값이 될 수 없다.
// var w = while(true){console.log(1)} while statement 도 값이 될 수 없다.



