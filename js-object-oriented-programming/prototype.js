
function Person(name, a, b, c){
    this.name = name;
    this.a = a;
    this.b = b; 
    this.c = c;
    this.sum_ab = function(){
        return this.a + this.b + this.c;
    }
}
var kim = new Person("kim", 10, 20, 30)
var lee = new Person("lee", 10, 10, 10)

console.log("kim.sum", kim.sum_ab());
console.log("lee.sum", lee.sum_ab());
