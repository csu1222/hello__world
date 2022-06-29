var fs = require('fs');

//readfileSync

console.log('readFileSync test')
console.log('A');
var result = fs.readFileSync('example/syncSample.txt', 'utf-8');
console.log(result);
console.log('C');

//readFile


console.log('readFile test')
console.log('A');
fs.readFile('example/syncSample.txt', 'utf-8', function(err, data){
    console.log(data);
});
console.log('C');