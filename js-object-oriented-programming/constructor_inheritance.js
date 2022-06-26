function Person (name, first, second) {
    this.name = name,
    this.first = first,
    this.second = second
}

Person.prototype.sum = function(){
    return this.first + this.second;
}

function PersonPlus(name, first, second, third){
    Person.call(this, name, first, second);  // call 메소드를 extend 의 super와 같은 역할로 사용했습니다.
    this.third = third
}

// PersonPlus.prototype.__proto__ = Person.prototype;
PersonPlus.prototype = Object.create(Person.prototype); // 이 Object.create()를 사용한 방식은 기존 PersonPlus.prototype을 덮어쓰기 떄문에
PersonPlus.prototype.constructor = PersonPlus;          // constructor를 다시 설정해줘야 합니다.
PersonPlus.prototype.avg = function(){
    return (this.first + this.second + this.third) / 3;
}


var kim = new PersonPlus('kim', 10, 20, 30);
console.log('kim.sum()', kim.sum());
console.log('kim.avg()', kim.avg());
console.log(kim.constructor)