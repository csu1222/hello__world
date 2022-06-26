var kim = {name : "kim", first : 10, second : 20}
var lee = {name : "lee", first : 10, second : 10}

function sum(prefix) { 
    return prefix + (this.first + this.second);
}

// sum() 와 sum.call()은 비슷한 작용
// 하지만 sum.call(객체) 이렇게 매개변수가 오면 sum이라는 함수는 매개변수로 온 객체의 메소드가 된다
// call의 첫번째 매개변수는 메소드가 될 객체가 오고 두번째 인자부터 함수의 원래 매개변수가 됩니다.
console.log("sum.call(kim)", sum.call(kim, "=>"));
console.log("sum.call(lee)", sum.call(lee, " : "));

// bind()  bind는 call 처럼 호출할때마다 this를 변경하는 것이 아니라 내부적으로 고정시켜줍니다.
//bind는 호출받은 함수를 변경하는것이 아니라 인자로 받은 조건을 만족하는 새로운 함수를 리턴해줍니다.

var kimSum = sum.bind(kim, '->');

console.log("kimSum()", kimSum());