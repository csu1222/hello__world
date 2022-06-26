class Person{
    constructor(name, first, second){
        this.name = name,
        this.first = first,
        this.second = second
    }
    sum() {
        return "prototype : " + (this.first + this.second);
    }
}
// 클래스 에서도 기존 constructor prototype 처럼 쓸 수 있습니다.
// Person.prototype.sum = function(){
//     return "prototype : " + (this.first + this.second);
// }


//상속 

class PersonPlus extends Person {
    constructor(name, first, second, third){
        super(name, first, second);
        this.third = third;
    }
    sum(){
        return super.sum() + this.third;
    }
    avr() {
        return (this.first + this.second + this.third) / 3;
    }
}


var kim = new Person("kim", 10, 20);
console.log("person:"+kim.sum());

var kimPlus = new PersonPlus("kim", 20, 40, 60);
console.log("person plus:"+kimPlus.avr());


// super 부모클래스 호출 
// 2가지 용법
// super() = 부모클래스의 생성자 호출 , super.메소드 = 부모클래스 를 호출하는것
function Man(name, gender){
    this.name = this.name,
    this.gender = gender
};

var me = new Man("seong", "male")