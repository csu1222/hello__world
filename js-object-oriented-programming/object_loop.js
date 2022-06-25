var brotherArray = ['jung', 'seong', 'chang'];
console.group('loop Array');
var i = 0;
while(i < brotherArray.length){
    console.log(i, brotherArray[i]);
    i += 1;
}
console.groupEnd('loop Array');
var brotherObject = {
    First:'jung',
    second:'seong',
    third:'chang'
};

console.group('Object loop');
for (var key in brotherObject){
    console.log(key, ":", brotherObject[key]);
}
console.groupEnd('Object loop');