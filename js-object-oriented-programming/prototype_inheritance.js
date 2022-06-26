var superObj = {superVal : 'super'}
// var subObj = {subVal : 'sub'}
// subObj.__proto__ = superObj;    // __proto__ 라는 프로퍼티를 superObj로 지정하니까 상속받았습니다.

var subObj = Object.create(superObj);
subObj.subVal = 'sub';              // __proto__ 와 같은 작용을 하는 object.creare() 입니다.


console.log('subObj.subVal =>' , subObj.subVal);
console.log('subObj.superVal =>' , subObj.superVal);

subObj.superVal = 'sub';        // 자식 객체의 프로퍼티를 바꿔도 super 객체의 프로퍼티가 바뀌지는 않는다

console.log('superObj.superVal =>', superObj.superVal);


console.log("__proto__를 이용한 객체상속")// __proto__ 를 이용한 객체 상속
kim = {
    name : 'kim',
    first : 10 , second : 20,
    sum : function(){
        return this.first + this.second;
    }
};
lee = {
    name : 'lee',
    first : 10, second : 10,
    avg : function(){
        return (this.first + this.second)/2;
    }
}
lee.__proto__ = kim;
console.log("kim.sum : ", kim.sum());
console.log("lee.sum : ", lee.sum());
console.log("lee.avg : ", lee.avg());

console.log("Object.create() 를 이용한 객체 상속") // Object.create()

park = {
    name : "park",
    first : 30 , second : 30,
    sum : function(){
        return this.first + this.second
    }
}

var choi = Object.create(park);
choi.name = 'choi';
choi.first = 20;
choi.second = 30;
choi.avg = function(){
    return this.sum()/2;
}

console.log("park.sum", park.sum());
console.log('choi.sum', choi.sum());
console.log("choi.avg", choi.avg());
