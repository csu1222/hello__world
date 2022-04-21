var members = ['seonguk', 'jeonguk', 'changuk'];
console.log('array : ', members[1]); // jeonguk
var i = 0;
while(i < members.length){
    console.log(members[i]);
    i ++
}


var roles = {
    'first': 'jeonguk',
    'second': 'seonguk',
    'third': 'changuk'
}

console.log('object : ', roles['second']); //seonguk

for(var n in roles){
    console.log('object : ', n, '=>', roles[n]);
}
// for statement 에서 객체를 object.variable 
//로 호출하면 variable 부분이 문자열 상태이기 때문에 
//object[variable] 형식으로 호출 해야 되는거 같습니다.